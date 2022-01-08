import { useScroll, useResizeObserver } from '@vueuse/core'
import { defineComponent, ExtractPropTypes, PropType, ref, Transition, onMounted } from 'vue'

import { ChevronBack, ChevronForward } from '@vicons/ionicons5'
import Icon from '../icon'

export interface XScrollInst {
    scrollTo: HTMLElement['scrollTo']
}

export const xScrollProps = {
    disabled: Boolean,
    onScroll: Function as PropType<(e: Event) => void>,
    showScrollbar: Boolean,
    lockScrollIn: {
        type: Boolean,
        default: true
    },
    showButton: {
        type: Boolean,
        default: true
    },
    delta: {
        type: Number,
        default: 200
    }
}

export type XScrollProps = ExtractPropTypes<typeof xScrollProps>

export default defineComponent({
    name: 'OXScroll',
    props: xScrollProps,
    setup(props) {
        const scrollElement = ref<HTMLElement | null>(null)
        /**
         * get Scroll status
         */
        const { x, isScrolling, arrivedState } = useScroll(scrollElement)
        const touchRight = ref(true)
        const getTouchRight = (element: HTMLElement) => {
            touchRight.value = Math.abs(element.scrollLeft - (element.scrollWidth - element.offsetWidth)) < 5
        }
        /**
         * deltaScroll
         */
        const deltaScroll = (target?: HTMLElement | null, delta = 0, smooth = true) => {
            if (!target) return
            target.scrollTo({
                behavior: smooth ? 'smooth' : undefined,
                left: target.scrollLeft + delta
            })
        }
        function handleWheel(e: WheelEvent): void {
            const preventYWheel =
                (e.currentTarget as HTMLElement).offsetWidth <
                (e.currentTarget as HTMLElement).scrollWidth
            if (!preventYWheel || e.deltaY === 0) return
            const delta = e.deltaY + e.deltaX
            if (!props.lockScrollIn) {
                if (x.value === 0 && delta < 0) return
                if (touchRight.value && delta > 0) return
            }
            deltaScroll((e.currentTarget as HTMLElement), delta, false)
            e.preventDefault()
        }

        const exposedMethods: XScrollInst = {
            scrollTo(...args: any[]) {
                scrollElement.value?.scrollTo(...args)
            }
        }
        /**
         * Listen Resize to change scroll
         */
        onMounted(() => scrollElement.value && getTouchRight(scrollElement.value))
        useResizeObserver(scrollElement, () => scrollElement.value && getTouchRight(scrollElement.value))

        return {
            x,
            isScrolling,
            arrivedState,
            scrollElement,
            touchRight,
            handleWheel,
            getTouchRight,
            deltaScroll,
            ...exposedMethods
        }
    },
    render() {
        return (
            <div class={{
                'o-x-scroll': true,
                'o-x-scroll__hide': !this.showScrollbar
            }}>
                <Transition name="o-x-scroll-fade">
                    {
                        this.showButton && !this.arrivedState.left ? (
                            this.$slots.leftArrow?.({
                                click: () => this.deltaScroll(this.scrollElement, -this.delta)
                            }) || (
                                <div class="o-x-scroll-arrow" onClick={() => this.deltaScroll(this.scrollElement, -this.delta)}>
                                    <Icon>
                                        <ChevronBack />
                                    </Icon>
                                </div>
                            )
                        ) : null
                    }
                </Transition>
                <div
                    ref="scrollElement"
                    onScroll={e => {
                        this.getTouchRight((e.currentTarget as HTMLElement))
                        this.onScroll?.(e)
                    }}
                    onWheel={this.disabled ? undefined : this.handleWheel} class="o-x-scroll-wrapper">
                    { this.$slots.default?.() }
                </div>
                <Transition name="o-x-scroll-fade">
                    {
                        this.showButton && !this.touchRight ? (
                            this.$slots.rightArrow?.({
                                click: () => this.deltaScroll(this.scrollElement, this.delta)
                            }) || (
                                <div class="o-x-scroll-arrow o-x-scroll-arrow__right" onClick={() => this.deltaScroll(this.scrollElement, this.delta)}>
                                    <Icon>
                                        <ChevronForward />
                                    </Icon>
                                </div>
                            )
                        ) : null
                    }
                </Transition>
            </div>
        )
    }
})