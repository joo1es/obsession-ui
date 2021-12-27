import {
    defineComponent,
    ExtractPropTypes,
    h,
    Component,
    PropType,
    computed,
} from 'vue'
import OIcon from '../icon'

import { buttonTypes, buttonSize } from './Attrs'

export type ButtonTypes = keyof typeof buttonTypes;
export type ButtonSize = keyof typeof buttonSize;

export const buttonProps = {
    tag: {
        type: [String, Object] as PropType<string | Component>,
        default: 'button',
    },
    icon: {
        type: [String, Object] as PropType<string | Component>,
    },
    type: {
        type: [String, Object] as PropType<ButtonTypes | Record<string, string>>,
        default: 'default',
    },
    size: {
        type: [String, Object] as PropType<ButtonSize | Record<string, string>>,
        default: 'default',
    },
    disabled: Boolean,
    loading: Boolean,
    round: Boolean,
    ghost: Boolean,
    dashed: Boolean,
    block: Boolean,
    iconPosition: {
        type: String as PropType<'left' | 'right'>,
        default: 'left',
    },
    buttonType: String,
    hover: {
        type: Boolean,
        default: true
    }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
    name: 'OButton',
    props: buttonProps,
    emits: ['click', 'dblclick'],
    setup(props, { slots, emit }) {
        const disabled = computed(() => props.loading || props.disabled)
        return () => {
            const defaultSlot = slots.default?.()
            const iconSlot = slots.icon?.()
            const Icon = props.loading ? (
                <OIcon class="o-button__text-loading">
                    <div class="o-button__text-loading-block" />
                </OIcon>
            ) : iconSlot ? (
                <OIcon>{iconSlot}</OIcon>
            ) : props.icon ? (
                typeof props.icon === 'string' ? (
                    <OIcon name={props.icon} />
                ) : (
                    <OIcon>{h(props.icon)}</OIcon>
                )
            ) : null
            return h(
                props.tag as any,
                {
                    class: {
                        'o-button': true,
                        'o-button--onlyicon': !defaultSlot,
                        'o-button__disabled': disabled.value,
                        'o-button__ghost': props.ghost,
                        'o-button__round': props.round,
                        'o-button__dashed': props.dashed,
                        'o-button__block': props.block,
                        'o-button__hover': props.hover,
                        [`o-button__${props.type}`]: true,
                    },
                    style: {
                        ...(typeof props.type === 'string'
                            ? buttonTypes?.[props.type] || buttonTypes.default
                            : props.type),
                        ...(typeof props.size === 'string'
                            ? buttonSize?.[props.size] || buttonSize.default
                            : props.size),
                    },
                    onClick: () => !disabled.value && emit('click'),
                    onDblclick: () => !disabled.value && emit('dblclick'),
                    type: props.buttonType,
                },
                <div
                    class={{
                        'o-button__text': true,
                        'o-button__text--margin-left': props.iconPosition === 'right',
                        'o-button__text--no-margin': !defaultSlot,
                    }}
                >
                    <>
                        {props.iconPosition === 'left' ? Icon : null}
                        {defaultSlot}
                        {props.iconPosition === 'right' ? Icon : null}
                    </>
                </div>
            )
        }
    },
})
