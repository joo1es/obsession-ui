import { flatten } from '../utils'
import { computed, defineComponent, ExtractPropTypes } from 'vue'
import Space, { spaceProps } from '../space'
import OmitItem from '../omit-item'

import Icon from '../icon'
import { EllipsisHorizontalOutline } from '@vicons/ionicons5'

export const omitProps = {
    ...spaceProps,
    disabled: Boolean,
    size: {
        type: spaceProps.size.type,
        default: 0
    },
    vertical: {
        type: spaceProps.vertical,
        default: true
    },
    ellipsis: {
        type: Boolean,
        default: true
    }
}

export type OmitProps = ExtractPropTypes<typeof omitProps>

export default defineComponent({
    name: 'OOmit',
    props: omitProps,
    emits: {
        ellipsisClick: (e: Event) => typeof e === 'object'
    },
    setup(props) {
        const spacePropsFilter = computed(() => {
            const newProps: Partial<OmitProps> = { ...props }
            delete newProps.disabled
            delete newProps.ellipsis
            return newProps
        })
        return {
            spacePropsFilter
        }
    },
    render() {
        const getSlots = () => {
            const flattenSlots = flatten(this.$slots.default?.() || [])
            if (this.disabled) return flattenSlots
            const renderSlots = []
            let preIsEllipsis = false
            for (const vNode of flattenSlots) {
                if (
                    vNode.type !== OmitItem ||
                    !vNode.props ||
                    (vNode.props && vNode.props.omit === false)
                ) {
                    preIsEllipsis = false
                    renderSlots.push(vNode)
                } else if (this.ellipsis) {
                    if (!preIsEllipsis) {
                        renderSlots.push(
                            <div class="o-omit-ellipsis" onClick={e => this.$emit('ellipsisClick', e)}>
                                { this.$slots.ellipsis?.() || <Icon><EllipsisHorizontalOutline /></Icon> }
                            </div>
                        )
                    }
                    preIsEllipsis = true
                }
            }
            return renderSlots
        }
        return (
            <Space class="o-omit" { ...this.spacePropsFilter }>
                { getSlots() }
            </Space>
        )
    }
})