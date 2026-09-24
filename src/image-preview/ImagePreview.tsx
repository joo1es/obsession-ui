import { computed, defineComponent, ExtractPropTypes, nextTick, onMounted, PropType, ref, Transition, watch } from 'vue'
import type { PreviewImage } from './interface'
import Overlay, { OverlayProps } from '../overlay'
import Space from '../space'
import Icon from '../icon'
import { ArrowForward, ArrowBack, CloseCircle, Play, Stop } from '@vicons/ionicons5'
import { useAutoControl } from '../utils'

import ImageWrapper from './ImageWrapper'
import Progress from '../progress'
import { isImageLoaded, preloadImage } from './preload'

export const imagePreviewProps = {
    images: {
        type: Array as PropType<PreviewImage[]>,
        default: () => []
    },
    show: {
        type: Boolean,
        default: undefined
    },
    index: Number,
    swipeDistance: {
        type: Number,
        default: 100
    },
    longPictureScale: {
        type: Number,
        default: 2.5
    },
    keyboardEvent: {
        type: Boolean,
        default: true
    },
    wheelEvent: {
        type: Boolean,
        default: true
    },
    overlay: {
        type: Object as PropType<(Partial<OverlayProps> & Record<string, any>)>,
        default: () => ({})
    },
    showIndex: {
        type: Boolean,
        default: true
    },
    showImageSize: {
        type: Boolean,
        default: true
    }
}
export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>

export default defineComponent({
    name: 'OImagePreview',
    inheritAttrs: false,
    props: imagePreviewProps,
    emits: {
        'update:show': (show: boolean) => typeof show === 'boolean',
        'update:index': (index: number) => typeof index === 'number'
    },
    expose: ['open'],
    setup(props, { emit }) {
        const showRef = ref(false)
        const showDefine = useAutoControl(showRef, props, 'show', emit)

        const indexRef = ref(0)
        const indexDefine = useAutoControl(indexRef, props, 'index', emit)

        const ImageWrapperRef = ref<InstanceType<typeof ImageWrapper> | null>(null)
        const core = ref<HTMLDivElement | null>(null)

        const showOverlay = ref(showDefine.value)
        const showCore = ref(showDefine.value)

        const imagesShowing = computed(() => {
            const showing: {
                prev?: PreviewImage,
                current?: PreviewImage,
                next?: PreviewImage
            } = {}
            if (props.images.length === 0) return showing
            const indexIs = indexDefine.value || 0
            showing.prev = props.images[indexIs - 1] || props.images[props.images.length - 1]
            showing.current = props.images[indexIs] || props.images[0]
            showing.next = props.images[indexIs + 1] || props.images[0]
            return showing
        })

        const transition = ref(true)
        const translateX = ref(0)
        const transform = ref('')
        const transformOrigin = ref('')
        const clearTransformOrigin = () => {
            transformOrigin.value = ''
        }
        const setTransformOrigin = () => {
            if (!imagesShowing.value.current || typeof imagesShowing.value.current === 'string') return clearTransformOrigin()

            const { element } = imagesShowing.value.current
            if (!element) return clearTransformOrigin()

            let $el: null | Element = null
            if (typeof element === 'string') {
                $el = document.querySelector(element)
            } else {
                $el = element
            }
            const rect = $el?.getBoundingClientRect()
            if (!rect) return clearTransformOrigin()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            transformOrigin.value = `${centerX}px ${centerY}px`
        }

        const draging = ref(false)
        const dragingDoing = ref(false)

        const willBeIndex = ref<undefined | number>()
        const goIndexRaw = (index: number) => {
            if (index < 0) {
                indexDefine.value = props.images.length - 1
                return
            }
            if (index > props.images.length - 1) {
                indexDefine.value = 0
                return
            }
            indexDefine.value = index
        }
        const goIndex = (index: number, animation = false) => {
            if (dragingDoing.value) return
            ImageWrapperRef.value?.reset()
            if (
                animation &&
                Math.abs(index - (indexDefine.value || 0)) === 1
            ) {
                dragingDoing.value = true
                transition.value = true
                transform.value = `translateX(${index - (indexDefine.value || 0) < 0 ? '' : '-'}100%)`
                willBeIndex.value = index
                return
            }
            goIndexRaw(index)
        }

        watch(draging, () => {
            if (!ImageWrapperRef.value?.checkSwipe?.()) return
            if (!draging.value) {
                if (translateX.value <= props.swipeDistance && translateX.value >= -props.swipeDistance) {
                    transition.value = true
                    transform.value = ''
                    return
                }
                dragingDoing.value = false
                goIndex(
                    translateX.value > props.swipeDistance ?
                    ((indexDefine.value || 0) - 1) :
                    ((indexDefine.value || 0) + 1),
                    true
                )
                translateX.value = 0
            } else {
                dragingDoing.value = true
                transition.value = false
            }
        })

        const next = () => {
            goIndex((indexDefine.value || 0) + 1, true)
        }
        const prev = () => {
            goIndex((indexDefine.value || 0) - 1, true)
        }

        const longPictureSet = ref(new Set<PreviewImage>())
        watch(() => props.images, () => {
            longPictureSet.value = new Set()
        })

        const playing = ref(false)
        const keyEvent = (e: KeyboardEvent) => {
            if (!props.keyboardEvent) return
            switch (e.code) {
                case 'ArrowRight':
                    if (props.images.length <= 1) return
                    return next()
                case 'ArrowLeft':
                    if (props.images.length <= 1) return
                    return prev()
                case 'ArrowUp':
                    if (
                        imagesShowing.value.current &&
                        ImageWrapperRef.value &&
                        longPictureSet.value.has(imagesShowing.value.current)
                    ) {
                        ImageWrapperRef.value.isLongPicture = !ImageWrapperRef.value.isLongPicture
                    }
                    return
                case 'Space':
                    e.preventDefault()
                    if (props.images.length <= 1) return
                    playing.value = !playing.value
                    return
                case 'Escape':
                    showDefine.value = false
            }
        }

        const init = ref(false)
        watch(showDefine, async(define) => {
            if (define) {
                setTransformOrigin()
                transform.value = ''
                init.value = false
                document.addEventListener('keydown', keyEvent)
                ImageWrapperRef.value?.reset()
                showOverlay.value = true
                await nextTick()
                showCore.value = true
            } else {
                setTransformOrigin()
                await nextTick()
                showCore.value = false
                document.removeEventListener('keydown', keyEvent)
                playing.value = false
                await nextTick()
                showOverlay.value = false
            }
        })

        onMounted(() => {
            if (showDefine.value) {
                document.addEventListener('keydown', keyEvent)
            }
        })

        const getSrc = (image: PreviewImage, thumb = false) => {
            if (typeof image === 'string') return image
            return thumb && image.thumb ? image.thumb : image.src
        }

        /**
         * 相邻页用哪张图：原图已经预载好就直接上原图，否则先用缩略图顶上 ——
         * 避免「滑进来是糊的，停下了才变清晰」的画质跳变。
         */
        const getRenderSrc = (image?: PreviewImage) => {
            if (!image) return undefined
            const fullSrc = getSrc(image)
            if (fullSrc && isImageLoaded(fullSrc)) return fullSrc
            return getSrc(image, true)
        }

        const previewRender = (position: 'prev' | 'next' = 'prev', show = true) => {
            const image = imagesShowing.value[ position]
            return (
                <div class={`o-image-preview--${position}`}>
                    <div class={'o-image-preview--box'}>
                        <img class="o-image-preview--image" src={image && getRenderSrc(image)} v-show={image && show} />
                    </div>
                </div>
            )
        }

        /**
         * 提前把当前页和相邻页的原图载好，翻页时目标图已经在解码缓存里，
         * 可以直接换上，不会再有「先糊后清晰」
         */
        const preloadNeighbors = () => {
            if (!showDefine.value) return
            const { prev, current, next } = imagesShowing.value
            const neighbors = [prev, current, next]
            neighbors.forEach(image => {
                if (image) preloadImage(getSrc(image))
            })
        }
        watch([imagesShowing, showDefine], preloadNeighbors, {
            immediate: true
        })

        // const hidePrevNext = ref(false)
        // const setHidePrevNextTrue = () => {
        //     hidePrevNext.value = true
        // }
        // const setHidePrevNextFalse = () => {
        //     hidePrevNext.value = false
        // }

        const open = (index?: number) => {
            indexDefine.value = index || 0
            showDefine.value = true
        }

        const size = ref([0, 0])
        watch(size, () => {
            if (size.value[0]) {
                if (size.value[0] / size.value[1] >= props.longPictureScale && imagesShowing.value.current && ImageWrapperRef.value) {
                    if (!longPictureSet.value.has(imagesShowing.value.current)) {
                        longPictureSet.value.add(imagesShowing.value.current)
                    }
                }
            }
        })

        const playingProgress = ref(0)
        const aniFrame = ref(0)
        const progressAdder = () => {
            playingProgress.value += .2
            if (playingProgress.value < 100) {
                aniFrame.value = requestAnimationFrame(progressAdder)
            } else {
                aniFrame.value = requestAnimationFrame(progressAdder)
                next()
            }
        }
        watch(playing, () => {
            if (playing.value) {
                aniFrame.value = requestAnimationFrame(progressAdder)
            } else {
                playingProgress.value = 0
                cancelAnimationFrame(aniFrame.value)
            }
        })

        watch(indexDefine, () => {
            playingProgress.value = 0
        })

        return {
            showOverlay,
            showDefine,
            showCore,
            indexDefine,
            imagesShowing,
            getSrc,
            transformOrigin,
            draging,
            dragingDoing,
            previewRender,
            translateX,
            transform,
            transition,
            ImageWrapperRef,
            goIndex,
            next,
            prev,
            // hidePrevNext,
            goIndexRaw,
            willBeIndex,
            // setHidePrevNextTrue,
            // setHidePrevNextFalse,
            open,
            size,
            longPictureSet,
            playing,
            playingProgress,
            core,
            init
        }
    },
    render() {
        return (
            <Overlay
                modelValue={this.showOverlay}
                onUpdate:modelValue={show => {
                    this.showDefine = show
                }}
                { ...this.overlay }
            >
                <Transition
                    name="o-image-preview--transition"
                    onEnter={() => {
                        // this.setHidePrevNextTrue()
                        this.core?.focus({ preventScroll: true })
                    }}
                    onAfterEnter={() => {
                        this.init = true
                    }}
                    // onAfterEnter={this.setHidePrevNextFalse}
                    // onEnterCancelled={this.setHidePrevNextTrue}
                    // onLeave={this.setHidePrevNextTrue}
                    // onLeaveCancelled={this.setHidePrevNextFalse}
                    // onAfterLeave={() => {
                    //     this.showOverlay = false
                    // }}
                >
                    {
                        (this.showCore || this.overlay.useVShow) && (
                            <div
                                class="o-image-preview"
                                { ...this.$attrs }
                                style={{
                                    transformOrigin: this.transformOrigin
                                }}
                                onWheel={e => {
                                    if (!this.ImageWrapperRef || !this.wheelEvent) return
                                    if (this.images.length <= 1) return
                                    if (!e.altKey && e.deltaY === 0) return
                                    if (e.deltaY < 0) {
                                        if (e.altKey || this.ImageWrapperRef.canBeWheelPrev()) this.prev()
                                    } else if (e.altKey || this.ImageWrapperRef.canBeWheelNext()) {
                                        this.next()
                                    }
                                }}
                                v-show={this.overlay.useVShow ? this.showCore : true}
                            >
                                <Transition name="o-image-preview--fade">
                                    {
                                        this.playing && (
                                            <div class="o-image-preview--playing">
                                                <img src={this.getSrc(this.images[(this.indexDefine || 0) + 1] || this.images[0])} />
                                                <Progress percentage={this.playingProgress} showText={false} size={'5px'} borderRadius={'0px'} />
                                            </div>
                                        )
                                    }
                                </Transition>
                                <div
                                    class="o-image-preview--cover"
                                    style={{
                                        opacity: this.showCore ? undefined : '0'
                                    }}
                                >
                                    { this.$slots.cover?.() }
                                    {
                                        this.images.length > 1 && (
                                            <>
                                                <div
                                                    class="o-image-preview--cover__prev"
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        this.prev()
                                                    }}
                                                ><Icon><ArrowBack /></Icon></div>
                                                <div
                                                    class="o-image-preview--cover__next"
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        this.next()
                                                    }}
                                                ><Icon><ArrowForward /></Icon></div>
                                            </>
                                        )
                                    }
                                    {
                                        this.showIndex && this.images.length > 1 && (
                                            <div
                                                class="o-image-preview--cover__index"
                                            >{ (this.indexDefine || 0) + 1 } / { this.images.length }</div>
                                        )
                                    }
                                    <Transition name="o-image-preview--fade">
                                        {
                                            this.showImageSize && this.size[0] > 0 && (
                                                <div
                                                    class="o-image-preview--cover__size"
                                                >{ this.size[0] }×{this.size[1]}</div>
                                            )
                                        }
                                    </Transition>
                                    <Space
                                        class="o-image-preview--cover__tool"
                                        align='center'
                                        size={5}
                                    >
                                        { this.$slots.tools?.() }
                                        {
                                            this.images.length > 1 && (
                                                <div class="o-image-preview--cover__play">
                                                    <Icon
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            this.playing = !this.playing
                                                        }}
                                                    >{ this.playing ? <Stop /> : <Play /> }</Icon>
                                                </div>
                                            )
                                        }
                                        <div class="o-image-preview--cover__close">
                                            <Icon
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    this.showDefine = false
                                                }}
                                            ><CloseCircle /></Icon>
                                        </div>
                                    </Space>
                                    <Transition name="o-image-preview--fade">
                                        {
                                            this.imagesShowing.current && this.longPictureSet.has(this.imagesShowing.current) && (
                                                <div
                                                    class="o-image-preview--cover__long-tool"
                                                >
                                                    <span onClick={e => {
                                                        e.stopPropagation()
                                                        if (!this.ImageWrapperRef) return
                                                        this.ImageWrapperRef.isLongPicture = !this.ImageWrapperRef.isLongPicture
                                                    }}>长图模式</span>
                                                </div>
                                            )
                                        }
                                    </Transition>
                                </div>
                                
                                    <div
                                        ref="core"
                                        onTransitionend={() => {
                                            if (this.dragingDoing) {
                                                this.dragingDoing = false
                                                this.transition = false
                                                this.transform = ''
                                                if (this.willBeIndex !== undefined) this.goIndexRaw(this.willBeIndex)
                                            }
                                        }}
                                        class={[
                                            'o-image-preview--core',
                                            {
                                                'o-image-preview--core__transition': this.transition
                                            }
                                        ]}
                                        style={{
                                            transform: this.transform
                                        }}
                                    >
                                        { this.previewRender('prev', true) }
                                        <ImageWrapper
                                            image={this.imagesShowing.current}
                                            playing={!this.draging && this.dragingDoing}
                                            getSrc={this.getSrc}
                                            init={this.init}
                                            show={this.showDefine}
                                            setActive={active => {
                                                if (!this.ImageWrapperRef?.checkSwipe?.()) return
                                                this.draging = active
                                            }}
                                            setTransform={x => {
                                                if (!this.ImageWrapperRef?.checkSwipe?.()) return
                                                this.translateX = -x
                                                this.transform = `translateX(${this.translateX}px)`
                                            }}
                                            onSize={size => {
                                                this.size = size
                                            }}
                                            disabled={this.images.length <= 1}
                                            ref="ImageWrapperRef"
                                            v-slots={this.$slots}
                                        />
                                        { this.previewRender('next', true) }
                                    </div>
                                { this.$slots.default?.() }
                            </div>
                        )
                    }
                </Transition>
            </Overlay>
        )
    }
})