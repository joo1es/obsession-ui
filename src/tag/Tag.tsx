import { defineComponent, PropType, Component, h, CSSProperties } from 'vue'

import type { ExtractPropTypes } from 'vue'

import { Close } from '@vicons/ionicons5'

import Icon from '../icon'

export const tagProps = {
    label: String,
    icon: Object as PropType<Component>,
    closable: Boolean,
    color: {
        type: Array as PropType<string[]>,
    },
    size: {
        type: String as PropType<'small' | 'default' | 'medium' | 'large'>,
        default: 'default'
    }
}

export type TagProps = ExtractPropTypes<typeof tagProps>

export default defineComponent({
    name: 'OTag',
    props: tagProps,
    emits: {
        close: (e: Event) => typeof e === 'object'
    },
    setup(props, { slots, emit }) {
        return () => (
            <div class={{
                'o-tag': true,
                [`o-tag-${props.size}`]: true
            }} style={{
                '--o-tag-color': props.color?.[0] || '',
                '--o-tag-bg-color': props.color?.[1] || ''
            } as CSSProperties}>
                {
                    slots.icon || props.icon ? (
                        <div class="o-tag--icon">
                            <Icon>
                                { slots.icon?.() || h(props.icon as any) }
                            </Icon>
                        </div>
                    ) : null
                }
                <div class="o-tag--text">{ slots.default?.() || props.label }</div>
                {
                    props.closable ? (
                        <div class="o-tag--close" onClick={e => {
                            e.stopPropagation()
                            emit('close', e)
                        }}>
                            <Icon>
                                { slots.closeIcon?.() || <Close /> }
                            </Icon>
                        </div>
                    ) : null
                }
            </div>
        )
    }
})
