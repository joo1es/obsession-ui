import { defineComponent, ExtractPropTypes, PropType, ref, watch, onBeforeUnmount } from 'vue'

import Icon from '../icon'
import { ChevronForward, ChevronBack } from '@vicons/ionicons5'
import { flatten, useAutoControl } from '../utils'

export const carouselProps = {
    vertical: Boolean,
    modelValue: Number,
    autoPlay: Boolean,
    duration: {
        type: Number,
        default: 3000
    },
    trigger: {
        type: String as PropType<'click' | 'hover'>,
        default: 'hover'
    },
    indicator: {
        type: String as PropType<'none' | 'inside'>,
        default: 'inside'
    },
    arrow: {
        type: String as PropType<'none' | 'always' | 'hover'>,
        default: 'hover'
    },
    hoverToStop: {
        type: Boolean,
        default: true
    }
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>

export default defineComponent({
    name: 'OCarousel',
    props: carouselProps,
    emits: {
        'update:modelValue': (value: number) => ((void value, true))
    },
    setup(props, { emit }) {
        const indexRef = ref(0)
        const index = useAutoControl(indexRef, props, 'modelValue', emit)

        const timer = ref<ReturnType<typeof setInterval>>()
        const max = ref(0)

        const next = () => {
            if ((index.value || 0) < max.value - 1) {
                if (typeof index.value === 'undefined') {
                    index.value = 0
                } else {
                    index.value += 1
                }
            } else {
                index.value = 0
            }
        }

        const prev = () => {
            if ((index.value || 0) <= 0) {
                index.value = max.value - 1
            } else {
                index.value = (index.value || 0) - 1
            }
        }

        const setPlay = (play: boolean) => {
            if (timer.value) clearInterval(timer.value)
            if (play) {
                timer.value = setInterval(() => {
                    next()
                }, props.duration)
            }
        }

        watch(() => props.autoPlay, (play) => {
            setPlay(play)
        }, {
            immediate: true
        })

        /**
         * 解决 chrome 浏览器返回页面时动画加速的问题
         */
        const stopWhileHidden = () => {
            if (!props.autoPlay) return
            if (document.visibilityState === 'visible') {
                setPlay(props.autoPlay)
            } else {
                setPlay(false)
            }
        }

        window.addEventListener('visibilitychange', stopWhileHidden)
        onBeforeUnmount(() => {
            setPlay(false)
            window.removeEventListener('visibilitychange', stopWhileHidden)
        })

        return {
            index,
            max,
            setPlay,
            next,
            prev,
            timer
        }
    },
    render() {
        const carousels = flatten(this.$slots.default?.() || [])
        this.max = carousels.length
        return (
            <div class={[
                'o-carousel',
                {
                    'o-carousel-vertical': this.vertical
                }
            ]} onMouseenter={() => {
                if (!this.hoverToStop || !this.autoPlay) return
                this.setPlay(false)
            }} onMouseleave={() => {
                if (!this.hoverToStop || !this.autoPlay) return
                this.setPlay(this.autoPlay)
            }}>
                <div class="o-carousel--wrapper" style={{
                    transform: this.vertical ? `translateY(-${(this.index || 0) * 100}%)` : `translateX(-${(this.index || 0) * 100}%)`
                }}>
                    {
                        carousels.map((carousel, index) => (
                            <div class="o-carousel--cell" key={index}>
                                { carousel }
                            </div>
                        ))
                    }
                </div>
                {
                    this.indicator === 'inside' && (
                        this.$slots.indicators?.({
                            length: carousels.length,
                            switch: (index: number) => {
                                if (this.trigger !== 'click') return
                                this.index = index
                                this.setPlay(this.autoPlay)
                            },
                            index: this.index
                        }) ?? (
                            <div class="o-carousel--indicators">
                                {
                                    carousels.map((carousel, index) => (
                                        <div
                                            onClick={() => {
                                                if (this.trigger !== 'click') return
                                                this.index = index
                                                this.setPlay(this.autoPlay)
                                            }}
                                            onMouseenter={() => {
                                                if (this.trigger !== 'hover') return
                                                this.index = index
                                                this.setPlay(this.autoPlay)
                                            }}
                                            class={[
                                                'o-carousel--indicator',
                                                {
                                                    'o-carousel--indicator--active': index === this.index
                                                }
                                            ]}
                                        />
                                    ))
                                }
                            </div>
                        )
                    )
                }
                {this.$slots.cover?.() }
                {
                    carousels.length > 1 && this.arrow !== 'none' && !this.vertical && (
                        <div
                            class={['o-carousel--arrow', 'o-carousel--arrow-left', {
                                'o-carouel--arrow-hover': this.arrow === 'hover'
                            }]}
                            onClick={() => {
                                this.prev()
                                this.setPlay(this.autoPlay)
                            }}
                        >
                            <Icon><ChevronBack /></Icon>
                        </div>
                    )
                }
                {
                    carousels.length > 1 && this.arrow !== 'none' && !this.vertical && (
                        <div
                            class={['o-carousel--arrow', 'o-carousel--arrow-right', {
                                'o-carouel--arrow-hover': this.arrow === 'hover'
                            }]}
                            onClick={() => {
                                this.next()
                                this.setPlay(this.autoPlay)
                            }}
                        >
                            <Icon><ChevronForward /></Icon>
                        </div>
                    )
                }
            </div>
        )
    }
})
