import { defineComponent, computed, PropType, ExtractPropTypes, Component, h, VNode, ref } from 'vue'
import Modal, { modalProps } from '../modal'
import Button from '../button'
import Icon from '../icon'
import { useAutoControl } from '../utils'

export interface ActionSheetRecord {
    index?: string | number | symbol,
    title?: VNode | string,
    description?: VNode | string,
    click?: (record: ActionSheetRecord, done: () => void) => void,
    icon?: Component,
    disabled?: boolean
}

export const actionSheetProps = {
    ...modalProps,
    list: {
        type: Array as PropType<ActionSheetRecord[]>,
        default: () => []
    },
    showCancel: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: [String, Object] as PropType<string | VNode>,
        default: '取消'
    },
    description: {
        type: [String, Object] as PropType<string | VNode>
    },
    type: {
        type: String as PropType<'dialog' | 'drawer'>,
        default: 'drawer'
    },
    showClose: {
        type: Boolean,
        default: false
    },
    width: {
        type: [String, Number],
        default: 400
    },
    handler: {
        type: Boolean,
        default: true
    }
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>

export default defineComponent({
    name: 'OActionSheet',
    inheritAttrs: false,
    props: actionSheetProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean',
        'click': (record: ActionSheetRecord, done: () => void) => {
            void record
            void done
            return true
        }
    },
    setup(props, { attrs, emit, slots }) {
        const showRef = ref(false)
        const show = useAutoControl(showRef, props, 'modelValue', emit)
        const modalPropsMap = computed(() => {
            const propsBackup: Partial<ActionSheetProps> = { ...props }
            delete propsBackup.list
            delete propsBackup.showCancel
            delete propsBackup.cancelText
            delete propsBackup.description
            return propsBackup
        })
        // const deltaY = ref(0)
        // const transitionDuration = ref('')
        const actionSheetRef = ref<null | HTMLDivElement>(null)
        const handlerRender = (isTop = true) => (
            <div
                class="o-action-sheet--hander"
                style={{
                    marginTop: isTop ? '' : '-10px',
                    marginBottom: isTop ? '-10px' : ''
                }}
            />
        )
        // transform: ( props.from === 'bottom' ? deltaY.value < 0 : deltaY.value > 0 ) ? `translateY(${deltaY.value}px)` : '',
        return () => (
            <Modal class="o-modal-action-sheet" { ...modalPropsMap.value } v-model={show.value}>
                <div class="o-action-sheet" ref={actionSheetRef} { ...attrs }>
                    {
                        modalPropsMap.value.from === 'bottom' && props.handler && handlerRender()
                    }
                    {
                        slots.description || props.description ? (
                            <div class="o-action-sheet__cell o-action-sheet--description">
                                { slots.description?.() || props.description }
                            </div>
                        ) : null
                    }
                    {
                        slots.default?.()
                    }
                    {
                        props.list.map(item => (
                            <div class={{
                                'o-action-sheet__cell': true,
                                'o-action-sheet__cell--disabled': item.disabled
                            }} onClick={() => {
                                if (item.disabled) return
                                const done = () => {
                                    show.value = false
                                }
                                if (!item.click?.(item, done)) {
                                    emit('click', item, done)
                                }
                            }}>
                                {
                                    slots.item?.(item) || (
                                        <div class="o-action-sheet--content">
                                            <div class="o-action-sheet--icon">
                                                <Icon>{ item.icon && h(item.icon) }</Icon>
                                            </div>
                                            <div class="o-action-sheet--text">
                                                <div class="o-action-sheet--title">
                                                    { item.title }
                                                </div>
                                                {
                                                    item.description ? (
                                                        <div class="o-action-sheet--description">
                                                            { item.description }
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                    {
                        slots.cancel || props.showCancel ? (
                            <div class="o-action-sheet__cell o-action-sheet--cancel">
                                {
                                    slots.cancel?.() || (
                                        <Button size="large" block round onClick={() => {
                                            show.value = false
                                        }} hover={false}>{ props.cancelText }</Button>
                                    )
                                }
                            </div>
                        ) : null
                    }
                    {
                        modalPropsMap.value.from === 'top' && props.handler && handlerRender(false)
                    }
                </div>
            </Modal>
        )
    }
})