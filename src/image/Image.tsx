import { defineComponent, ExtractPropTypes, PropType, computed, ref, watch, onMounted, nextTick } from 'vue'

import { ImageOutline, Alert } from '@vicons/ionicons5'
import Icon from '../icon'

import { getFirstLetter } from '../utils'
import { useIntersectionObserver, type MaybeElementRef } from '@vueuse/core'

export const imageProps = {
    size: {
        type: [Number, String, Array] as PropType<number | string | [number | string, number | string]>
    },
    src: String,
    contain: {
        type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>
    },
    borderRadius: {
        type: String
    },
    background: {
        type: String,
        default: '#f5f5f5'
    },
    color: {
        type: String,
        default: ''
    },
    alt: String,
    title: String,
    lazy: Boolean,
    lazyOptions: Object as PropType<{
        root?: MaybeElementRef,
        rootMargin?: string,
        threshold?: number | number[]
    }>,
    onlyIntersectingVisible: Boolean
}

export type ImageProps = ExtractPropTypes<typeof imageProps>

export default defineComponent({
    name: 'OImage',
    props: imageProps,
    emits: {
        isIntersecting: (intersecting: boolean) => typeof intersecting === 'boolean',
        abort: (e: Event) => {
            void e
            return true
        },
        error: () => true,
        load: (e: Event) => {
            void e
            return true
        }
    },
    setup(props, { slots, emit }) {
        const size = computed((): [string, string] => {
            if (!props.size) return ['', '']
            if (typeof props.size === 'number' || !isNaN(Number(props.size))) {
                return [`${props.size}px`, `${props.size}px`]
            } if (typeof props.size === 'string') {
                return [props.size, props.size]
            } 
            return props.size.map(size => typeof size === 'number' || !isNaN(Number(size)) ? `${size}px` : size) as [string, string]
        })
        const loading = ref(true)
        const error = ref(false)

        const loadingFinish = ref('')
        const loadImage = () => {
            loading.value = true
            error.value = false
            if (!props.src) {
                loading.value = false
                error.value = false
                return
            }
            const img = new Image()
            img.src = props.src
            img.onabort = (ev: UIEvent) => {
                emit('abort', ev)
                error.value = true
                loading.value = false
                loadingFinish.value = props.src || ''
            }
            img.onerror = () => {
                emit('error')
                error.value = true
                loading.value = false
                loadingFinish.value = props.src || ''
            }
            img.onload = (ev: Event) => {
                emit('load', ev)
                error.value = false
                loading.value = false
                loadingFinish.value = props.src || ''
            }
        }
        const title = computed(() => getFirstLetter(props.title || ''))

        /**
         * lazyload
         */
        const imageRef = ref<HTMLImageElement | null>(null)

        const observer = ref<ReturnType<typeof useIntersectionObserver> | null>(null)
        const targetIsVisible = ref(false)

        const startObserver = () => {
            if (observer.value) {
                observer.value.stop()
                observer.value = null
            }
            if (props.lazyOptions && 'root' in props.lazyOptions) {
                if (!props.lazyOptions.root) return
            }
            nextTick(() => {
                if (props.lazy) {
                    observer.value = useIntersectionObserver(
                        imageRef,
                        ([{ isIntersecting }]) => {
                            emit('isIntersecting', isIntersecting)
                            if (isIntersecting && loadingFinish.value !== props.src) {
                                loadImage()
                            }
                            if (props.onlyIntersectingVisible) {
                                targetIsVisible.value = isIntersecting
                            } else if (!targetIsVisible.value && isIntersecting) {
                                targetIsVisible.value = true
                                observer.value?.stop()
                            }
                        },
                        props.lazyOptions
                    )
                } else {
                    targetIsVisible.value = true
                    loadImage()
                }
            })
        }

        watch(() => [props.src, props.lazy, props.lazyOptions, props.onlyIntersectingVisible], startObserver)

        onMounted(startObserver)
        
        return () => (
            <div
                class="o-image"
                ref={imageRef}
                style={{
                    width: size.value[0],
                    height: size.value[1],
                    fontSize: `calc(${size.value[1]} / 2)`,
                    borderRadius: props.borderRadius,
                    background: props.background,
                    color: props.color
                }}
            >
                {
                    loading.value ? (
                        slots.loading?.() || (
                            <Icon>
                                <ImageOutline />
                            </Icon>
                        )
                    ) : null
                }
                {
                    !loading.value && error.value ? (
                        slots.error?.() || (
                            title.value || (
                                <Icon>
                                    <Alert />
                                </Icon>
                            )
                        )
                    ) : null
                }
                {
                    !loading.value && !error.value ? (
                        props.src ? (
                            slots.default?.() || (
                                <img
                                    src={ targetIsVisible.value ? props.src : undefined }
                                    style={{
                                        objectFit: props.contain
                                    }}
                                    alt={ props.alt }
                                />
                            )
                        ) : (
                            slots.empty?.() || (
                                title.value || (
                                    <Icon>
                                        <ImageOutline />
                                    </Icon>
                                )
                            )
                        )
                    ) : null
                }
            </div>
        )
    }
})
