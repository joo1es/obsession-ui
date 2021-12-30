import { defineComponent, ExtractPropTypes, PropType, computed, ref, Transition, watch, nextTick, CSSProperties } from 'vue'

import Overlay, { OverlayProps } from '../overlay'
import Icon from '../icon'
import { Close } from '@vicons/ionicons5'
import { onClickOutside } from '@vueuse/core'

import { closeAll } from './utils'
import { useAutoControl } from '../utils'

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
        type: [Boolean, Number, String],
        default: true
    },
    type: {
        type: String as PropType<'dialog' | 'drawer'>,
        default: 'dialog'
    },
    from: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
        default: 'bottom'
    },
    handler: Boolean
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
        const modalRef = ref<HTMLDivElement | null>(null)
        const showRef = ref(false)
        const show = useAutoControl(showRef, props, 'modelValue', emit)
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
        onClickOutside(modalRef, () => {
            if (props.noOverlay) {
                show.value = false
            }
        })
        /**
         * 手势关闭
         */
        const startX = ref(0)
        const startY = ref(0)
        const deltaX = ref(0)
        const deltaY = ref(0)
        const transitionDuration = ref('')
        const needTouchEvent = computed(() => props.handler)
        const handleTouchStart = (e: TouchEvent) => {
            if (!needTouchEvent.value) return
            transitionDuration.value = 'none'
            startX.value = e.touches[0].pageX
            startY.value = e.touches[0].pageY
        }
        const handleTouchMove = (e: TouchEvent) => {
            if (!needTouchEvent.value) return
            deltaX.value = e.touches[0].pageX - startX.value
            deltaY.value = e.touches[0].pageY - startY.value
            /**
             * 往上拖的逻辑暂时取消
             */
            // if (props.from === 'left') {
            //     if (deltaX.value < -40) deltaX.value = -40
            // } else if (deltaX.value > 40) deltaX.value = 40
            // if (props.from === 'bottom') {
            //     if (deltaY.value < -40) deltaY.value = -40
            // } else if (deltaY.value > 40) deltaY.value = 40
        }
        const clear = (close = false) => {
            deltaX.value = 0
            deltaY.value = 0
            if (close) {
                nextTick(() => {
                    show.value = false
                })
            }
        }
        const handleTouchEnd = () => {
            if (!needTouchEvent.value) return
            transitionDuration.value = '.3s'
            if (modalRef.value) {
                if (props.from === 'bottom' || props.from === 'top') {
                    if (Math.abs(deltaY.value) > modalRef.value?.clientHeight / 2) {
                        return clear(true)
                    }
                }
                if (Math.abs(deltaX.value) > modalRef.value?.clientWidth / 2) {
                    return clear(true)
                }
            }
            clear()
        }
        const modalTransform = computed(() => {
            switch (props.from) {
                case 'bottom':
                    return deltaY.value > 0 ? `translateY(${deltaY.value}px)` : ''
                case 'top':
                    return deltaY.value < 0 ? `translateY(${deltaY.value}px)` : ''
                case 'left':
                    return deltaX.value < 0 ? `translateX(${deltaX.value}px)` : ''
                case 'right':
                    return deltaX.value > 0 ? `translateX(${deltaX.value}px)` : ''
            }
        })
        const modalBorderRadius = computed(() => {
            if (typeof props.borderRadius === 'boolean') {
                return props.borderRadius ? '4px' : ''
            } 
            if (!isNaN(Number(props.borderRadius))) {
                return `${props.borderRadius}px`
            } 
            return props.borderRadius
        })
        return () => (
            <Overlay {...props.overlay} modelValue={showOverlay.value} onUpdate:modelValue={(value) => { show.value = value }} class={{
                'o-modal__overlay': true,
                [`o-modal__overlay-${props.from}`]: props.type === 'drawer',
                'o-modal__overlay-hidden': props.noOverlay
            }}>
                <Transition name={props.transitionName || (props.type === 'drawer' ? `o-modal-${props.from}` : 'o-modal-fade')} onAfterLeave={() => emit('afterClose')} onAfterEnter={() => {
                    modalRef.value?.focus()
                    emit('afterOpen')
                }} onEnter={() => {
                    const tabIndexBack = document.body.tabIndex
                    document.body.tabIndex = -1
                    document.body.focus()
                    nextTick(() => {
                        document.body.tabIndex = tabIndexBack
                    })
                }} appear={true} >
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
                                    transform: modalTransform.value,
                                    transition: transitionDuration.value,
                                    '--o-modal-border-radius': modalBorderRadius.value
                                } as CSSProperties}
                                onClick={e => e.stopPropagation()}
                                ref={modalRef}
                                v-show={props.overlay.useVShow ? showBox.value : true}
                                tabindex="-1"
                                onTouchstart={handleTouchStart}
                                onTouchmove={handleTouchMove}
                                onTouchend={handleTouchEnd}
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
                                                }}><Icon><Close/></Icon></span> : null
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
