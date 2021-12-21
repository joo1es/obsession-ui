import { defineComponent, ExtractPropTypes, PropType, computed, ref, Transition, watch, nextTick } from 'vue'

import Overlay, { OverlayProps } from '../overlay'
import Icon from '../icon'
import { CloseOutlined } from '@vicons/antd'

import { closeAll } from './utils'

export const modalProps = {
    overlay: {
        type: Object as PropType<Partial<OverlayProps>>,
        default: () => ({})
    },
    modelValue: {
        type: Boolean,
        default: undefined
    },
    transitionName: {
        type: String,
        default: 'o-modal-fade'
    },
    width: {
        type: [String, Number] as PropType<string | number>
    },
    showClose: {
        type: Boolean,
        default: true
    },
    title: {
        type: String
    },
    border: {
        type: Boolean,
        default: true
    }
}

export type ModalProps = ExtractPropTypes<typeof modalProps>

export default defineComponent({
    name: 'OModal',
    inheritAttrs: false,
    props: modalProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean'
    },
    setup(props, { emit, attrs, slots }) {
        const showRef = ref(false)
        const show = computed<boolean>({
            get: () => {
                if (typeof props.modelValue === 'undefined') {
                    return showRef.value
                } 
                return props.modelValue
            },
            set: (value) => {
                if (typeof props.modelValue === 'undefined') {
                    showRef.value = value
                } else {
                    emit('update:modelValue', value)
                }
            }
        })
        const showOverlay = ref(false)
        const showBox = ref(false)
        watch(show, () => {
            if (show.value) {
                showOverlay.value = show.value
                nextTick(() => {
                    showBox.value = show.value
                })
            } else {
                showBox.value = show.value
                nextTick(() => {
                    showOverlay.value = show.value
                })
            }
        }, {
            immediate: true
        })
        watch(closeAll, () => {
            if (closeAll.value) {
                show.value = false
            }
        })
        return () => (
            <Overlay {...props.overlay} modelValue={showOverlay.value} onUpdate:modelValue={(value) => { show.value = value }} class="o-modal__overlay">
                <Transition name={props.transitionName}>
                    {
                        showBox.value ? (
                            <div class={{
                                'o-modal': true,
                                'o-modal__no-border': !props.border
                            }} style={{
                                display: !showBox.value ? 'none' : '',
                                width: typeof props.width === 'string' ? props.width : `${props.width}px`
                            }} onClick={e => e.stopPropagation()} {...attrs}>
                                {
                                    slots.title || props.title || props.showClose ? (
                                        <div class="o-modal__header">
                                            <div class="o-modal__header-text">
                                                { slots.title?.() || props.title }
                                            </div>
                                            {
                                                props.showClose ? <span class="o-modal__icon" onClick={() => {
                                                    show.value = false
                                                }}><Icon><CloseOutlined/></Icon></span> : null
                                            }
                                        </div>
                                    ) : null
                                }
                                {
                                    slots.default ? (
                                        <div class="o-modal__content">
                                            { slots.default?.() }
                                        </div>
                                    ) : null
                                }
                                {
                                    slots.footer ? (
                                        <div class="o-modal__footer">
                                            { slots.footer?.() }
                                        </div>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }
                </Transition>
            </Overlay>
        )
    }
})
