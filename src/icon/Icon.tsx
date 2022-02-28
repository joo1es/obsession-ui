import { addUnit } from '../utils'
import { defineComponent, ExtractPropTypes, h } from 'vue'

export const iconProps = {
    size: [String, Number],
    color: String,
    tag: {
        type: String,
        default: 'span',
    },
    name: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export default defineComponent({
    name: 'OIcon',
    props: iconProps,
    setup(props, { slots }) {
        return () => (
            h(
                props.tag,
                {
                    style: {
                        fontSize: addUnit(props.size),
                        color: props.color
                    },
                    class: 'o-icon'
                },
                h('svg', null, {
                    default: slots.default || (() => h('i', { class: props.name }))
                })
            )
        )
    },
})
