import { defineComponent, PropType, ref, CSSProperties, computed, Transition, watch } from 'vue'
import type { PreviewImage } from './interface'
import Badge from '../badge'
import { useSwipe } from '@vueuse/core'
import { getLoadedImageSize, preloadImage } from './preload'

export default defineComponent({
    props: {
        image: [String, Object] as PropType<PreviewImage>,
        getSrc: {
            type: Function as PropType<(image: PreviewImage, thumb?: boolean) => string | undefined>,
            required: true
        },
        setActive: {
            type: Function as PropType<(active: boolean) => void>,
            required: true
        },
        setTransform: {
            type: Function as PropType<(x: number, y: number) => void>,
            required: true
        },
        playing: Boolean,
        disabled: Boolean,
        init: Boolean,
        show: Boolean
    },
    expose: ['reset', 'canBeWheelPrev', 'canBeWheelNext', 'checkSwipe', 'isLongPicture'],
    emits: ['size'],
    setup(props, { emit }) {
        const imgEl = ref<HTMLImageElement | null>(null)
        const wrapper = ref<HTMLDivElement | null>(null)
        const box = ref<HTMLDivElement | null>(null)

        const transition = ref('')
        const scale = ref(1)

        const { isSwiping, lengthX, lengthY } = useSwipe(box, { threshold: 0 })

        const checkSwipe = () => {
            if (box.value && imgEl.value) {
                if (imgEl.value.offsetWidth === box.value.offsetWidth) return true
                // if (box.value.scrollLeft === 0) return true
                // if (box.value.scrollLeft >= imgEl.value.offsetWidth - box.value.offsetWidth) return true
                return false
            }
        }

        watch([isSwiping, lengthX, lengthY], () => {
            if (props.disabled) return
            const swipe = isSwiping.value
            props.setActive(swipe)
            if (swipe) {
                props.setTransform(lengthX.value, lengthY.value)
            }
        })

        const setDefaultScroll = () => {
            if (!box.value) return
            box.value.scrollLeft = 0
            box.value.scrollTop = 0
        }

        const handleDblClick = (e: MouseEvent) => {
            e.stopPropagation()
            transition.value = '.2s'
            if (scale.value !== 1) {
                scale.value = 1
            } else {
                scale.value += .5
            }
        }

        const showLive = ref(true)
        const muted = ref(true)
        const isLongPicture = ref(false)

        const showPoints = ref(true)
        const reset = () => {
            scale.value = 1
            muted.value = true
            isLongPicture.value = false
            showPoints.value = true
            setDefaultScroll()
        }

        const count = ref(0)
        const countTimer = ref<ReturnType<typeof setTimeout>>()
        const canBeWheelPrev = () => {
            if (!box.value || !imgEl.value) return
            if (
                Math.abs(imgEl.value.offsetHeight - box.value.offsetHeight) < 5 &&
                Math.abs(imgEl.value.offsetWidth - box.value.offsetWidth) < 5
            ) return true
            if (box.value.scrollTop === 0 && box.value.scrollLeft === 0) {
                if (countTimer.value) clearTimeout(countTimer.value)
                countTimer.value = setTimeout(() => {
                    count.value = 0
                }, 500)
                count.value += 1
                if (count.value >= 3) {
                    count.value = 0
                    return true
                }
            }
        }

        const canBeWheelNext = () => {
            if (!box.value || !imgEl.value) return
            if (
                Math.abs(imgEl.value.offsetHeight - box.value.offsetHeight) < 5 &&
                Math.abs(imgEl.value.offsetWidth - box.value.offsetWidth) < 5
            ) return true
            if (
                Math.abs(box.value.scrollTop - (imgEl.value.offsetHeight - box.value.offsetHeight)) < 5 &&
                Math.abs(box.value.scrollLeft - (imgEl.value.offsetWidth - box.value.offsetWidth)) < 5
            ) {
                if (countTimer.value) clearTimeout(countTimer.value)
                countTimer.value = setTimeout(() => {
                    count.value = 0
                }, 500)
                count.value += 1
                if (count.value >= 5) {
                    count.value = 0
                    return true
                }
            }
        }

        const src = computed(() => props.getSrc(props.image || ''))

        const live = computed(() => props.image && typeof props.image !== 'string' && props.image.live)

        watch(() => props.playing, () => {
            if (props.playing) {
                showLive.value = false
            }
        })

        const srcOf = (image: PreviewImage | undefined, thumb?: boolean) => props.getSrc(image || '', thumb)

        const currentSrc = ref<string>()
        const currentSize = ref([0, 0])
        /** 当前正在展示的图片，用来丢弃已经过期（已经翻页）的异步结果 */
        let showingImage: PreviewImage | undefined

        /**
         * 切换主图。
         *
         * 旧实现是靠 v-if 把 <img> 摘掉再挂回来「避免闪烁」的：那次摘除和复位虽然落在同一帧里、
         * 通常不会被真正画出来，但重新挂回去的 <img> 需要重新解码，只要解码或调度稍有偏差就会露出空帧。
         * 现在 <img> 常驻 DOM，换图 = 「后台把目标图解好 → 再换 src」，
         * 替换落在两次绘制之间，不依赖任何时序运气。
         */
        const showImage = async(image: PreviewImage | undefined) => {
            showingImage = image
            showLive.value = true
            const thumbSrc = srcOf(image, true)
            const fullSrc = srcOf(image)
            // 进入正式展示（init）之后才上原图，之前先用缩略图占位
            const fullFirst = !!props.init && !!fullSrc
            const primarySrc = fullFirst ? fullSrc : (thumbSrc || fullSrc)

            // 目标图已经预载好（相邻页预载会走到这里）→ 同步换上，一帧都不用等
            const readySize = getLoadedImageSize(primarySrc)
            if (readySize) {
                currentSrc.value = primarySrc
                currentSize.value = primarySrc === fullSrc ? readySize : [0, 0]
                return
            }

            // 还没准备好：先用缩略图顶上，别停在上一张
            if (currentSrc.value !== (thumbSrc || primarySrc)) {
                currentSrc.value = thumbSrc || primarySrc
                currentSize.value = [0, 0]
            }

            const loaded = await preloadImage(primarySrc)
            // 期间已经翻到别的图了，这次结果作废
            if (showingImage !== image || !loaded) return
            currentSrc.value = primarySrc
            // 只有原图才更新尺寸，避免用缩略图尺寸去算长图比例
            if (primarySrc === fullSrc) currentSize.value = loaded
        }

        watch(() => [props.image, props.init, props.show], () => {
            if (!props.show) return
            showImage(props.image)
        }, {
            immediate: true
        })

        watch(currentSize, () => {
            emit('size', currentSize.value)
        })

        const points = computed(() => typeof props.image === 'string' ? [] : (props.image?.points || []))

        return {
            box,
            wrapper,
            scale,
            imgEl,
            transition,
            handleDblClick,
            reset,
            canBeWheelPrev,
            canBeWheelNext,
            checkSwipe,
            live,
            src,
            showLive,
            muted,
            currentSrc,
            currentSize,
            isLongPicture,
            points,
            showPoints
        }
    },
    render() {
        return (
            <div class="o-image-preview--wrapper" ref="wrapper">
                <div
                    class={[
                        'o-image-preview--box',
                        {
                            'o-image-preview--longpicture-box': this.isLongPicture
                        }
                    ]}
                    ref="box"
                    onDblclick={this.handleDblClick}
                    onWheel={e => {
                        if (!this.imgEl || !this.box) return
                        if (this.imgEl.offsetHeight === this.box.offsetHeight) {
                            this.box.style.scrollBehavior = 'inherit'
                            this.box.scrollLeft += e.deltaY + e.deltaX
                            this.$nextTick(() => {
                                if (!this.box) return
                                this.box.style.scrollBehavior = ''
                            })
                        }
                    }}
                >
                    {
                        this.live && (
                            <div class={[
                                'o-image-preview--live__tool',
                                {
                                    'playing': this.showLive
                                }
                            ]} onClick={e => {
                                e.stopPropagation()
                                this.muted = false
                                if (this.showLive) {
                                    this.showLive = false
                                    return
                                }
                                this.showLive = true
                            }}
                            >
                                <Transition name="o-image-preview--fade">
                                    <b v-show={this.muted}>MUTED</b>
                                </Transition>
                                <Badge color="rgb(9, 197, 119)" />
                                LIVE
                            </div>
                        )
                    }
                    <Transition name="o-image-preview--fade">
                        {
                            this.live && this.showLive && (
                                <video
                                    class={[
                                        'o-image-preview--live'
                                    ]}
                                    src={this.live}
                                    muted={this.muted}
                                    autoplay
                                    onClick={e => {
                                        e.stopPropagation()
                                    }}
                                    onEnded={() => {
                                        this.showLive = false
                                        this.muted = false
                                    }}
                                    style={{
                                        '--o-image-preview--scale': this.scale,
                                        transition: this.transition
                                    } as CSSProperties}
                                    controls={false}
                                />
                            )
                        }
                    </Transition>
                    <img
                        class="o-image-preview--image"
                        src={this.currentSrc}
                        ref="imgEl"
                        style={{
                            '--o-image-preview--scale': this.scale,
                            transition: this.transition
                        } as CSSProperties}
                        onClick={e => {
                            e.stopPropagation()
                        }}
                    />
                    <Transition name="o-image-preview--fade">
                        <div class="o-image-preview--points" v-show={this.points.length > 0 && this.currentSize[0] && !this.playing}>
                            { this.showPoints && this.points.map((point, index) => (
                                point.size?.[0] ? (
                                    <div key={index} class="o-image-preview--point--box" style={{
                                        width: point.size?.[0] ? `${(point.size[0] / this.currentSize[0] * 100)}%` : 'auto',
                                        height: point.size?.[1] ? `${(point.size[1] / this.currentSize[1] * 100)}%` : 'auto',
                                        top: `${point.position[0] / this.currentSize[0] * 100}%`,
                                        left: `${point.position[1] / this.currentSize[1] * 100}%`
                                    }}>
                                        { this.$slots.description?.({ point }) || point.description }
                                    </div>
                                ) : (
                                    <div key={index} class={[
                                        'o-image-preview--point',
                                        {
                                            left: point.position[1] / this.currentSize[1] * 100 > 50
                                        }
                                    ]} style={{
                                        top: `${point.position[0] / this.currentSize[0] * 100}%`,
                                        left: `${point.position[1] / this.currentSize[1] * 100}%`
                                    }}>
                                        <div>
                                            { this.$slots.description?.({ point }) || point.description }
                                        </div>
                                    </div>
                                )
                            )) }
                            <div class="o-image-preview--point--box" style={{
                                left: '15px',
                                bottom: '15px',
                                pointerEvents: 'all',
                                cursor: 'default'
                            }} onClick={e => {
                                e.stopPropagation()
                                this.showPoints = !this.showPoints
                            }}>
                                {this.showPoints ? '隐藏标记' : '显示标记'}
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        )
    }
})