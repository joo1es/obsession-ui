import { reactive } from 'vue'

/**
 * 图片预载缓存。
 *
 * 只记「加载/解码完成」这件事和原始尺寸，不持有 Image 元素 ——
 * 解码后的位图交给浏览器自己的图片缓存去管理，这里不做二次占用。
 * 尺寸记录上限之外的部分会被丢弃，只影响「能否同步换上」，不影响正确性。
 */
const MAX_CACHE = 64

const loadedSizeMap = new Map<string, [number, number]>()
/** 响应式集合：渲染层据此判断「原图是否已经就绪」，就绪后才把缩略图换成原图 */
const loadedSrcSet = reactive(new Set<string>())
const loadingTasks = new Map<string, Promise<[number, number] | undefined>>()

/** 该地址是否已经加载并解码完成 */
export const isImageLoaded = (src?: string) => !!src && loadedSrcSet.has(src)

/** 取已加载图片的原始尺寸，顺序与 ImageWrapper 的 currentSize 一致：[height, width] */
export const getLoadedImageSize = (src?: string) => (src ? loadedSizeMap.get(src) : undefined)

/**
 * 预加载图片并把解码结果缓存下来，同一个地址只会真正加载一次。
 * 返回尺寸，加载失败返回 undefined。
 */
export const preloadImage = (src?: string) => {
    if (!src) return Promise.resolve<[number, number] | undefined>(undefined)

    const loadedSize = loadedSizeMap.get(src)
    if (loadedSize) return Promise.resolve(loadedSize)

    const loading = loadingTasks.get(src)
    if (loading) return loading

    const task = new Promise<[number, number] | undefined>(resolve => {
        const image = new Image()
        image.onload = async() => {
            // 等 decode 完成，之后换到展示用的 <img> 上才能立刻绘制，不会空一帧
            try {
                await image.decode()
            } catch {
                // decode 失败（浏览器不支持或图片异常）不阻塞流程，onload 拿到的尺寸照样能用
            }
            const size: [number, number] = [image.height, image.width]
            saveLoaded(src, size)
            loadingTasks.delete(src)
            resolve(size)
        }
        image.onerror = () => {
            loadingTasks.delete(src)
            resolve(undefined)
        }
        image.src = src
    })
    loadingTasks.set(src, task)
    return task
}

const saveLoaded = (src: string, size: [number, number]) => {
    if (loadedSizeMap.has(src)) return
    loadedSizeMap.set(src, size)
    loadedSrcSet.add(src)
    while (loadedSizeMap.size > MAX_CACHE) {
        const oldest = loadedSizeMap.keys().next().value
        if (oldest === undefined) break
        loadedSizeMap.delete(oldest)
        loadedSrcSet.delete(oldest)
    }
}
