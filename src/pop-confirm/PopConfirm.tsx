import { defineComponent, ExtractPropTypes, ref, PropType } from 'vue'

import Popover, { PopoverProps } from '../popover'
import Button, { ButtonProps } from '../button'
import Space, { SpaceProps } from '../space'

import { useAutoControl } from '../utils'

export const popConfirmProps = {
    modelValue: {
        type: Boolean,
        default: undefined
    },
    popover: {
        type: Object as PropType<Partial<PopoverProps> & Record<string, any>>,
        default: () => ({})
    },
    confirmText: {
        type: String,
        default: '确认'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmProps: {
        type: Object as PropType<Partial<ButtonProps> & Record<string, any>>,
        default: () => ({})
    },
    cancelProps: {
        type: Object as PropType<Partial<ButtonProps> & Record<string, any>>,
        default: () => ({})
    },
    spaceProps: {
        type: Object as PropType<Partial<SpaceProps> & Record<string, any>>,
        default: () => ({})
    },
    title: String,
    showFooter: {
        type: Boolean,
        default: true
    },
    showConfirm: {
        type: Boolean,
        default: true
    },
    showCancel: {
        type: Boolean,
        default: true
    }
}

export type PopConfirmProps = ExtractPropTypes<typeof popConfirmProps>

export default defineComponent({
    name: 'OPopConfirm',
    inheritAttrs: false,
    props: popConfirmProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean',
        'cancel': null,
        'confirm': null
    },
    setup(props, { slots, emit, attrs }) {
        const showRef = ref(false)
        const show = useAutoControl(showRef, props, 'modelValue', emit)
        return () => (
            <Popover
                v-model={show.value}
                placement="bottom"
                width={240}
                v-slots={{
                    target: () => slots.target?.(),
                    default: () => (
                        <div class="o-pop-confirm" { ...attrs }>
                            {
                                ( slots.title || props.title ) ? (
                                    <div class="o-pop-confirm__title">
                                        { slots.title?.() || props.title }
                                    </div>
                                ) : null
                            }
                            <div class="o-pop-confirm__content">
                                { slots.default?.() }
                            </div>
                            {
                                props.showFooter ? (
                                    slots.footer?.() || (
                                        <Space class="o-pop-confirm__footer" justify="end" { ...props.spaceProps }>
                                            {
                                                props.showCancel && (
                                                    <Button size="small" onClick={() => {
                                                        show.value = false
                                                        emit('cancel')
                                                    }} { ...props.cancelProps }>{ props.cancelText }</Button>
                                                )
                                            }
                                            {
                                                props.showConfirm && (
                                                    <Button size="small" onClick={() => {
                                                        show.value = false
                                                        emit('confirm')
                                                    }} type="primary" { ...props.confirmProps }>{ props.confirmText }</Button>
                                                )
                                            }
                                        </Space>
                                    )
                                ) : null
                            }
                        </div>
                    )
                }}
                { ...props.popover }
            />
        )
    }
})
