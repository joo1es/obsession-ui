import { useNamespace } from '../utils'
import { computed, CSSProperties, defineComponent, ExtractPropTypes, onMounted, onUpdated, PropType, ref } from 'vue'
import { usePointerSwipe, useRafFn, useResizeObserver, useScroll, type PointerSwipeOptions } from '@vueuse/core'

export const scrollBarProps = {
    xSize: {
        type: Number,
        default: 6
    },
    ySize: {
        type: Number,
        default: 6
    },
    xShow: {
        type: Boolean,
        default: true
    },
    yShow: {
        type: Boolean,
        default: true
    },
    container: {
        type: Object as PropType<Window | HTMLElement | SVGElement>
    },
    smooth: {
        type: Boolean,
        default: true
    },
    leaveSize: {
        type: Number,
        default: 1
    },
    useRaf: Boolean
}

export type ScrollBarProps = ExtractPropTypes<typeof scrollBarProps>

export default defineComponent({
    name: 'OScrollBar',
    props: scrollBarProps,
    emits: {
        scroll: (e: Event) => ((void e, true))
    },
    setup(props, { emit }) {
        const { basic, of, is } = useNamespace('scroll-bar')

        const scrollRef = ref<HTMLDivElement>()
        const scrollInnerRef = computed(() => props.container ?? (scrollRef.value?.children[0] as HTMLDivElement | undefined))
        const scrollInnerRefExtra = computed(() => (scrollInnerRef.value === window ? document.body : scrollInnerRef.value) as HTMLElement | SVGElement)
        const xThumbRef = ref<HTMLDivElement>()
        const yThumbRef = ref<HTMLDivElement>()
        
        const { x, y } = useScroll(scrollInnerRef, {
            onScroll: e => emit('scroll', e)
        })

        if (props.useRaf) {
            useRafFn(update)
        } else {
            useResizeObserver(scrollRef, update)
            useResizeObserver(scrollInnerRefExtra, update)
            onUpdated(update)
            onMounted(update)
        }

        const height = ref(0)
        const width = ref(0)
        const scrollHeight = ref(0)
        const scrollWidth = ref(0)

        const yShow = computed(() => props.yShow && scrollHeight.value > Math.round(height.value))
        const xShow = computed(() => props.xShow && scrollWidth.value > Math.round(width.value))
        const xSize = computed(() => xShow.value ? props.xSize : 0)
        const ySize = computed(() => yShow.value ? props.ySize : 0)

        function update() {
            const clientRect = scrollRef.value?.getBoundingClientRect()
            height.value = clientRect?.height || 0
            width.value = clientRect?.width || 0
            scrollHeight.value = scrollInnerRefExtra.value?.scrollHeight || 0
            scrollWidth.value = scrollInnerRefExtra.value?.scrollWidth || 0
        }

        const scrollBarHeightNumber = computed(() => height.value / scrollHeight.value)
        const scrollBarWidthNumber = computed(() => width.value / scrollWidth.value)
        const scrollBarHeight = computed(() => `${scrollBarHeightNumber.value * 100}%`)
        const scrollBarWidth = computed(() => `${scrollBarWidthNumber.value * 100}%`)
        const scrollBarTop = computed(() => {
            const percent = y.value / scrollHeight.value
            if (scrollBarHeightNumber.value >= .05) return `${percent * 100}%`
            /**
             * origin Max 100% -> but we have set a min of 5%
             * so we need to calculate the percent of the extra
             * scrollBarHeightNumber is it should be
             */
            const extra = (.05 - scrollBarHeightNumber.value) * 100
            return `${percent * (100 - extra)}%`
        })
        const scrollBarLeft = computed(() => {
            const percent = x.value / scrollWidth.value
            if (scrollBarWidthNumber.value >= .05) return `${percent * 100}%`
            const extra = (.05 - scrollBarWidthNumber.value) * 100
            return `${percent * (100 - extra)}%`
        })

        const scrollToPercent = (percent: number, type: 'top' | 'left' = 'top', smooth?: boolean) => {
            if (percent > 1) percent = 1
            if (percent < 0) percent = 0
            scrollInnerRef.value?.scrollTo({
                [type]: (type === 'top' ? (scrollHeight.value - height.value) : (scrollWidth.value - width.value)) * percent,
                behavior: smooth ? 'smooth' : 'auto'
            })
        }

        const handleTrackClick = (e: MouseEvent, type: 'top' | 'left' = 'top') => {
            if (!scrollRef.value) return
            let position = 0
            const clientRect = scrollRef.value.getBoundingClientRect()
            if (type === 'top') {
                position = e.y - clientRect.y
            } else {
                position = e.x - clientRect.x
            }
            const size = type === 'top' ? height.value : width.value
            const extra = (type === 'top' ? props.xSize : props.ySize) / size
            scrollToPercent(position / size + extra, type, props.smooth)
        }

        let startX = 0
        let startY = 0
        const optionsGet = (type: 'top' | 'left' = 'top') => ({
            onSwipeStart: handleThumbStart,
            onSwipe: e => handleThumbMove(e, type),
            threshold: 0,
            pointerTypes: ['mouse', 'pen']
        } as PointerSwipeOptions)
        const { distanceY } = usePointerSwipe(yThumbRef, optionsGet())
        const { distanceX } = usePointerSwipe(xThumbRef, optionsGet('left'))

        function handleThumbStart() {
            startX = x.value
            startY = y.value
        }
        function handleThumbMove(e: PointerEvent, type: 'top' | 'left' = 'top') {
            const size = type === 'top' ? height.value : width.value
            const currentPercent = (type === 'top' ? startY : startX) / ((type === 'top' ? scrollHeight.value : scrollWidth.value) - size)
            const scrollBarSize = (type === 'top' ? scrollBarHeightNumber.value : scrollBarWidthNumber.value) * size
            const position = (type === 'top' ? - distanceY.value : - distanceX.value) / (size - scrollBarSize)
            const extra = (type === 'top' ? props.xSize : props.ySize) / size
            scrollToPercent(currentPercent + position + extra, type)
        }

        const scaleY = computed(() => props.leaveSize / ySize.value)
        const scaleX = computed(() => props.leaveSize / xSize.value)

        return {
            is,
            of,
            scaleY,
            scaleX,
            basic,
            scrollBarHeight,
            scrollBarWidth,
            scrollBarTop,
            scrollBarLeft,
            scrollRef,
            width,
            height,
            scrollWidth,
            scrollHeight,
            x,
            y,
            scrollToPercent,
            handleTrackClick,
            xThumbRef,
            yThumbRef,
            xSize,
            ySize,
            yShow,
            xShow
        }
    },
    render() {
        return (
            <div ref="scrollRef" class={this.basic} style={{ '--o-scroll-bar-scale-y': this.scaleY, '--o-scroll-bar-scale-x': this.scaleX } as CSSProperties}>
                {this.$slots.default?.()}
                {this.yShow && (
                    <div
                        class={[this.of('track'), this.is('y', this.of('track'))]}
                        style={{width: `${this.ySize}px`, height: `calc(100% - ${this.xSize}px)`}}
                        onClick={e => this.handleTrackClick(e)}
                    >
                        <div
                            ref="yThumbRef"
                            class={this.of('thumb')}
                            style={{ width: `${this.ySize}px`, height: this.scrollBarHeight, top: this.scrollBarTop }}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                )}
                {this.xShow && (
                    <div
                        class={[this.of('track'), this.is('x', this.of('track'))]}
                        style={{height: `${this.xSize}px`, width: `calc(100% - ${this.ySize}px)`}}
                        onClick={e => this.handleTrackClick(e, 'left')}
                    >
                        <div
                            ref="xThumbRef"
                            class={this.of('thumb')}
                            style={{ height: `${this.xSize}px`, width: this.scrollBarWidth, left: this.scrollBarLeft }}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        )
    }
})