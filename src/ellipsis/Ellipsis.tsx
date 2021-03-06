import { defineComponent, ExtractPropTypes, PropType, ref, StyleValue } from 'vue'

import Tooltip, { TooltipProps } from '../tooltip'

export const ellipsisProps = {
    title: {
        type: String
    },
    noTooltip: {
        type: Boolean
    },
    tooltip: {
        type: Object as PropType<Partial<TooltipProps> & Record<string, any>>,
        default: () => ({})
    },
    line: {
        type: Number,
        default: 1
    }
}

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>

export default defineComponent({
    name: 'OEllipsis',
    inheritAttrs: false,
    props: ellipsisProps,
    setup(props, { slots, attrs }) {
        const ellipsisRef = ref<HTMLSpanElement | null>(null)
        const showTitle = ref(false)
        const handleMouseEnter = () => {
            if (!ellipsisRef.value) return
            /**
             * 判断是否溢出
             */
            const element = ellipsisRef.value
            const range = document.createRange()
            range.setStart(element, 0)
            range.setEnd(element, element.childNodes.length)
            const rangeWidth = range.getBoundingClientRect().width
            const rangeHeight = range.getBoundingClientRect().height
            const paddingRow = (
                parseInt(element.style.paddingLeft, 10) || 0) +
                (
                    parseInt(element.style.paddingRight, 10) || 0
                )
            const paddingCol = (
                parseInt(element.style.paddingTop, 10) || 0) +
                (
                    parseInt(element.style.paddingBottom, 10) || 0
                )
            if (props.line === 1) {
                if ((
                    Math.round(rangeWidth + paddingRow) > element.offsetWidth ||
                    element.scrollWidth > element.offsetWidth
                ) && props.tooltip) {
                    showTitle.value = true
                } else {
                    showTitle.value = false
                }
            } else {
                if ((
                    Math.round(rangeHeight + paddingCol) > element.offsetHeight ||
                    element.scrollHeight > element.offsetHeight
                ) && props.tooltip) {
                    showTitle.value = true
                } else {
                    showTitle.value = false
                }
            }
        }
        return () => {
            const Ellipsis = (
                <span
                    class={{
                        'o-ellipsis': true,
                        'o-ellipsis__line': props.line > 1
                    }}
                    style={{
                        WebkitLineClamp: props.line > 1 ? props.line : ''
                    } as StyleValue}
                    ref={ellipsisRef} {...attrs}
                    onMouseenter={handleMouseEnter}
                >
                    { slots.default?.() }
                </span>
            )
            const Title = slots.title?.() ?? props.title ?? slots.default?.()
            return (
                <>
                    {
                        showTitle.value && !props.noTooltip ? (
                            <Tooltip {...props.tooltip} v-slots={{
                                title: () => Title
                            }}>
                                { Ellipsis }
                            </Tooltip>
                        ) : Ellipsis
                    }
                </>
            )
        }
    }
})
