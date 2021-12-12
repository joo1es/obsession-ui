import { defineComponent, ExtractPropTypes } from 'vue'
import { Icon } from '@vicons/utils'

export const iconProps = {
    size: [String, Number],
    color: String,
    tag: {
        type: String,
        default: 'span',
    },
    name: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>;

export default defineComponent({
    name: 'OIcon',
    props: iconProps,
    setup(props, { slots }) {
        return () => (
            <Icon
                size={props.size}
                color={props.color}
                tag={props.tag}
                class="o-icon"
            >
                {slots.default?.() || <i class={props.name} />}
            </Icon>
        )
    },
})
