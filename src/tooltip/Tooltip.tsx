import { defineComponent, PropType } from 'vue'
import Popover, {
    popoverProps,
    popoverEmits,
    PopoverTrigger,
} from '../popover'

import type { ExtractPropTypes } from 'vue'

const tooltipPropsOverride = {
    trigger: {
        type: String as PropType<PopoverTrigger>,
        default: 'hover',
    },
    dark: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: '',
    },
}

export const tooltipProps = {
    ...popoverProps,
    ...tooltipPropsOverride,
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;

export default defineComponent({
    name: 'OTooltip',
    props: tooltipProps,
    emits: popoverEmits,
    setup(props, { slots }) {
        return () => (
            <Popover
                {...props}
                v-slots={{
                    default: () => slots.title?.() || props.title,
                    target: () => slots.default?.(),
                }}
            />
        )
    },
})
