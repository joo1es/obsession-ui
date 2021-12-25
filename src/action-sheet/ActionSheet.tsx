import { defineComponent, computed, PropType, ExtractPropTypes, Component, h, VNode, ref, nextTick } from 'vue'
import Modal, { modalProps } from '../modal'
import Button from '../button'
import Icon from '../icon'

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
    from: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
        default: 'bottom'
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
        'click': (record?: ActionSheetRecord, done?: () => void) => {
            void record
            void done
            return true
        }
    },
    setup(props, { attrs, emit, slots }) {
        const showRef = ref(false)
        const show = computed<boolean>({
            get() {
                if (typeof props.modelValue === 'undefined') {
                    return showRef.value
                }
                return props.modelValue
            },
            set(value) {
                if (typeof props.modelValue === 'undefined') {
                    showRef.value = value
                    return
                }
                emit('update:modelValue', value)
            }
        })
        const modalPropsMap = computed(() => {
            const propsBackup: Partial<ActionSheetProps> = { ...props }
            delete propsBackup.list
            delete propsBackup.showCancel
            delete propsBackup.handler
            return propsBackup
        })
        const startY = ref(0)
        const deltaY = ref(0)
        const transitionDuration = ref('')
        const actionSheetRef = ref<null | HTMLDivElement>(null)
        const handleTouchStart = (e: TouchEvent) => {
            if (props.from !== 'bottom' && props.from !== 'top') return
            if (!e.touches) return
            transitionDuration.value = 'none'
            startY.value = e.touches[0].pageY
        }
        const handleTouchMove = (e: TouchEvent) => {
            if (props.from !== 'bottom' && props.from !== 'top') return
            if (!e.touches) return
            deltaY.value = e.touches[0].pageY - startY.value
            if (props.from === 'bottom') {
                if (deltaY.value < -40) deltaY.value = -40
            } else if (deltaY.value > 40) deltaY.value = 40
        }
        const handleTouchEnd = () => {
            if (props.from !== 'bottom' && props.from !== 'top') return
            transitionDuration.value = '.3s'
            if (actionSheetRef.value) {
                if (Math.abs(deltaY.value) > actionSheetRef.value?.clientHeight / 2) {
                    deltaY.value = 0
                    nextTick(() => {
                        show.value = false
                    })
                    return
                }
            }
            deltaY.value = 0
        }
        const handlerRender = (isTop = true) => (
            <div
                class="o-action-sheet--hander"
                style={{
                    marginTop: isTop ? '' : '-10px',
                    marginBottom: isTop ? '-10px' : ''
                }}
            />
        )
        return () => (
            <Modal class="o-modal-action-sheet" style={{
                transform: ( props.from === 'bottom' ? deltaY.value > 0 : deltaY.value < 0 ) ? `translateY(${deltaY.value}px)` : '',
                transition: transitionDuration.value
            }} { ...modalPropsMap.value } v-model={show.value}>
                <div class="o-action-sheet" ref={actionSheetRef} style={{
                    transform: ( props.from === 'bottom' ? deltaY.value < 0 : deltaY.value > 0 ) ? `translateY(${deltaY.value}px)` : '',
                    transition: transitionDuration.value
                }} { ...attrs } onTouchstart={handleTouchStart} onTouchmove={handleTouchMove} onTouchend={handleTouchEnd}>
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
                                        }} hover={false}>取消</Button>
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