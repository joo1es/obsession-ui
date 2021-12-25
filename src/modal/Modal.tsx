import { defineComponent, ExtractPropTypes, PropType, computed, ref, Transition, watch, nextTick, CSSProperties } from 'vue'

import Overlay, { OverlayProps } from '../overlay'
import Icon from '../icon'
import { CloseOutlined } from '@vicons/antd'
import { onClickOutside, useFocus } from '@vueuse/core'

import { closeAll } from './utils'

export const modalProps = {
    overlay: {
        type: Object as PropType<(Partial<OverlayProps> & Record<string, any>)>,
        default: () => ({})
    },
    noOverlay: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Boolean,
        default: undefined
    },
    transitionName: {
        type: String,
        default: undefined
    },
    width: {
        type: [String, Number] as PropType<string | number>
    },
    height: {
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
    },
    doNotCloseMe: {
        type: Boolean,
        default: false
    },
    borderRadius: {
        type: [Boolean, Number],
        default: true
    },
    type: {
        type: String as PropType<'dialog' | 'drawer'>,
        default: 'dialog'
    },
    from: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
        default: 'bottom'
    }
}

export type ModalProps = ExtractPropTypes<typeof modalProps>

export default defineComponent({
    name: 'OModal',
    inheritAttrs: false,
    props: modalProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean',
        open: null,
        close: null,
        afterClose: null,
        afterOpen: null
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
        let neverMeet = true
        watch(show, () => {
            if (show.value) {
                showOverlay.value = show.value
                nextTick(() => {
                    showBox.value = show.value
                    emit('open')
                    neverMeet = false
                })
            } else {
                showBox.value = show.value
                nextTick(() => {
                    showOverlay.value = show.value
                    if (!neverMeet) {
                        emit('close')
                    } else {
                        neverMeet = false
                    }
                })
            }
        }, {
            immediate: true
        })
        watch(closeAll, () => {
            if (closeAll.value && !props.doNotCloseMe) {
                show.value = false
            }
        })
        const modalRef = ref<HTMLDivElement | null>(null)
        onClickOutside(modalRef, () => {
            if (props.noOverlay) {
                show.value = false
            }
        })
        useFocus({
            target: modalRef,
            initialValue: true
        })
        return () => (
            <Overlay {...props.overlay} modelValue={showOverlay.value} onUpdate:modelValue={(value) => { show.value = value }} class={{
                'o-modal__overlay': true,
                [`o-modal__overlay-${props.from}`]: props.type === 'drawer',
                'o-modal__overlay-hidden': props.noOverlay
            }}>
                <Transition name={props.transitionName || (props.type === 'drawer' ? `o-modal-${props.from}` : 'o-modal-fade' )} onAfterLeave={() => emit('afterClose')} onAfterEnter={() => emit('afterOpen')}>
                    {
                        showBox.value ? (
                            <div
                                class={{
                                    'o-modal': true,
                                    'o-modal__no-border': !props.border,
                                    'o-modal__drawer': props.type === 'drawer',
                                    [`o-modal__drawer-${props.from}`]: props.type === 'drawer'
                                }}
                                style={{
                                    width: typeof props.width === 'string' ? props.width : `${props.width}px`,
                                    height: typeof props.height === 'string' ? props.height : `${props.height}px`,
                                    '--o-modal-border-radius': props.borderRadius === true ? '4px' : props.borderRadius === false ? 0 : props.borderRadius
                                } as CSSProperties}
                                onClick={e => e.stopPropagation()}
                                ref={modalRef}
                                v-show={props.overlay.useVShow ? showBox.value : true}
                                tabindex="-1"
                                {...attrs}
                            >
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
