import {
    defineComponent,
    ExtractPropTypes,
    h,
    Component,
    PropType,
    computed,
    ref
} from 'vue'
import OIcon from '../icon'

import { buttonTypes, buttonSize } from './Attrs'
import { useCssVar } from '@vueuse/core'
import { TinyColor } from '@ctrl/tinycolor'
import Spin from '../spin'
import CollapseTransition from '../collapse-transition'

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
        type: String as PropType<ButtonTypes>,
        default: 'default',
    },
    color: String,
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
    secondary: Boolean,
    text: Boolean,
    iconPosition: {
        type: String as PropType<'left' | 'right'>,
        default: 'left',
    },
    buttonType: String
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
    name: 'OButton',
    props: buttonProps,
    emits: ['click', 'dblclick'],
    setup(props, { slots, emit }) {
        const disabled = computed(() => props.loading || props.disabled)

        const el = ref<HTMLElement | null>(null)
        // const color = useCssVar('--o-button-main-color', el)
        const buttonStyleComputed = computed(() => {
            const final = {
                ...(buttonTypes?.[props.type] || buttonTypes.default),
                ...(typeof props.size === 'string' ?
                    buttonSize?.[props.size] || buttonSize.default :
                    props.size
                )
            }
            if (props.secondary && props.type === 'default') {
                final['--o-button-main-color'] = '#777'
            }
            if (props.color) final['--o-button-main-color'] = props.color
            const mainColor = final['--o-button-main-color']
            let color = ''
            if (mainColor.startsWith('var(')) {
                color = useCssVar(mainColor.replace('var(', '').replace(')', ''), el).value
            } else {
                color = mainColor
            }
            const colorMap = new TinyColor(color)
            return {
                ...final,
                '--o-button-color--light': colorMap.brighten(10).toHexString(),
                '--o-button-color--dark': colorMap.darken(10).toHexString(),
                '--o-button-color--lighting': colorMap.lighten(30).toHexString(),
                '--o-button-color--lighten': colorMap.lighten(40).toHexString()
            }
        })
        return () => {
            const defaultSlot = slots.default?.()
            const iconSlot = slots.icon?.()
            const Icon = (
                <CollapseTransition width>
                    {
                        props.loading ? (
                            <Spin color="currentcolor" class="o-icon" />
                        ) : iconSlot ? (
                            <OIcon>{iconSlot}</OIcon>
                        ) : props.icon ? (
                            typeof props.icon === 'string' ? (
                                <OIcon name={props.icon} />
                            ) : (
                                <OIcon>{h(props.icon)}</OIcon>
                            )
                        ) : null
                    }
                </CollapseTransition>
            )
            return h(
                props.tag as any,
                {
                    class: {
                        'o-button': true,
                        'o-button--onlyicon': !defaultSlot,
                        'o-button__disabled': disabled.value,
                        'o-button__ghost': props.ghost,
                        'o-button__secondary': props.secondary,
                        'o-button__text': props.text,
                        'o-button__round': props.round,
                        'o-button__dashed': props.dashed,
                        'o-button__block': props.block,
                        [`o-button__${props.type}`]: true
                    },
                    style: buttonStyleComputed.value,
                    onClick: () => !disabled.value && emit('click'),
                    onDblclick: () => !disabled.value && emit('dblclick'),
                    type: props.buttonType,
                    ref: el
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
