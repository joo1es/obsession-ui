import { defineComponent, ExtractPropTypes, PropType } from 'vue'

import { Glasses } from '@vicons/ionicons5'
import Icon from '../icon'

import { imageProps, Image as ImageElement } from '../image'

export const avatarProps = {
    ...imageProps,
    size: {
        type: [Number, String, Array] as PropType<number | string | [number | string, number | string]>,
        default: 64
    },
    contain: {
        type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
        default: 'cover'
    },
    borderRadius: {
        type: String,
        default: '50%'
    }
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export default defineComponent({
    name: 'OAvatar',
    props: avatarProps,
    setup(props, { slots }) {
        return () => (
            <ImageElement class="o-avatar" { ...props } v-slots={{
                default: slots.default?.(),
                loading: slots.loading?.() || <Icon><Glasses /></Icon>,
                error: slots.error?.(),
                empty: slots.loading?.() || <Icon><Glasses /></Icon>
            }} />
        )
    }
})
