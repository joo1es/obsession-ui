import { flatten, useNamespace } from '../utils'
import { defineComponent, ExtractPropTypes, PropType, provide } from 'vue'

export const timelineProps = {
    reverse: Boolean,
    relative: Boolean,
    mode: {
        type: String as PropType<'left' | 'right' | 'alternate'>
    },
    horizontal: Boolean
}

export type TimelineProps = ExtractPropTypes<typeof timelineProps>

export default defineComponent({
    name: 'OTimeline',
    props: timelineProps,
    setup(props) {
        const { basic, is } = useNamespace('timeline')
        provide('wpTimelineProps', props)
        return {
            basic,
            is
        }
    },
    render() {
        // Reverse
        const items = flatten(this.$slots.default?.() || [])
        if (this.reverse) items.reverse()

        return (
            <div class={[
                this.basic,
                    {
                        [this.is('horizontal')]: this.horizontal,
                    }
                ]}
            >
                { items }
            </div>
        )
    }
})
