import { defineComponent, ExtractPropTypes, PropType, computed } from 'vue'

import Avatar, { AvatarProps } from '../avatar'

export const popDialogProps = {
    content: String,
    showAvatar: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: Object as PropType<Partial<AvatarProps> & Record<string, any>>,
        default: () => ({})
    },
    right: Boolean,
    arrow: {
        type: Boolean,
        default: true
    },
    title: String,
    showTitle: {
        type: Boolean,
        default: true
    }
}

export type PopDialogProps = ExtractPropTypes<typeof popDialogProps>

export default defineComponent({
    name: 'OPopDialog',
    props: popDialogProps,
    emits: {
        click: (e: Event) => {
            void e
            return true
        },
        avatarClick: (e: Event) => {
            void e
            return true
        }
    },
    setup(props, { slots, emit }) {
        const size = computed((): [string, string] => {
            if (!props.avatar.size) return ['48px', '48px']
            if (typeof props.avatar.size === 'number' || !isNaN(Number(props.avatar.size))) {
                return [`${props.avatar.size}px`, `${props.avatar.size}px`]
            } if (typeof props.avatar.size === 'string') {
                return [props.avatar.size, props.avatar.size]
            } 
            return props.avatar.size.map(size => typeof size === 'number' || isNaN(Number(size)) ? `${size}px` : size) as [string, string]
        })
        return () => {
            const AvatarVNode = (show = true) => (
                props.showAvatar ? (
                    <div
                        class="o-pop-dialog-avatar"
                        style={{
                            width: size.value[0]
                        }}
                        onClick={e => {
                            if (show) emit('avatarClick', e)
                        }}
                    >
                        {
                            show ? (
                                slots.avatar?.(props.avatar) || <Avatar { ...props.avatar } size={size.value} />
                            ) : null
                        }
                    </div>
                ) : null
            )
            return (
                <div class="o-pop-dialog">
                    { AvatarVNode(!props.right) }
                    <div
                        class={{
                            'o-pop-dialog-content': true
                        }}
                        style={{
                            textAlign: props.right ? 'right' : 'left'
                        }}
                    >
                        {
                            props.showTitle && (props.title || slots.title) ? (
                                <div class="o-pop-dialog-content__title">
                                    { slots.title?.() || props.title }
                                </div>
                            ) : null
                        }
                        <div
                            class={{
                                'o-pop-dialog-content__in': true,
                                'o-pop-dialog-content__in-right': props.right,
                                'arrow': props.arrow,
                                [`arrow-${props.right ? 'right' : 'left'}`]: true
                            }}
                            onClick={e => {
                                emit('click', e)
                            }}
                        >
                            { slots.default?.() ?? props.content }
                        </div>
                    </div>
                    { AvatarVNode(props.right) }
                </div>
            )
        }
    }
})