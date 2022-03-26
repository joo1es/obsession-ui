import { defineComponent, ExtractPropTypes, PropType, watch, ref, Teleport, RendererElement, Transition, computed, ComputedRef, onBeforeUnmount, provide, inject } from 'vue'

import { lockBodyScrollList } from './utils'
import { getMaxZIndex } from '../utils'

export const overlayProps = {
    modelValue: {
        type: Boolean,
        default: undefined
    },
    position: {
        type: String as PropType<'fixed' | 'absolute'>,
        default: 'fixed'
    },
    background: {
        type: String,
        default: 'rgba(0, 0, 0, .75)'
    },
    blur: {
        type: [Boolean, String] as PropType<boolean | string>,
        default: false
    },
    zIndex: Number,
    to: {
        type: [String, Object, Boolean] as PropType<string | RendererElement | false>,
        default: 'body'
    },
    clickToClose: {
        type: Boolean,
        default: true
    },
    useVShow: {
        type: Boolean,
        default: false
    },
    transitionName: {
        type: String,
        default: 'o-overlay-fade'
    },
    preventScroll: {
        type: Boolean,
        default: true
    }
}

export type OverlayProps =  ExtractPropTypes<typeof overlayProps>

export default defineComponent({
    name: 'OOverlay',
    inheritAttrs: false,
    props: overlayProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean',
        'enter': () => true
    },
    setup(props, { slots, emit, attrs }) {
        const overlaySymbol = Symbol('overlay')
        const zIndex = ref(1)
        const getZIndex = () => {
            if (props.modelValue && typeof props.zIndex === 'undefined') zIndex.value = getMaxZIndex()
        }
        /**
         * 处理 overlay 嵌套
         */
        provide('o-overlay', computed(() => props.modelValue))
        const parentOverlayShow = inject<ComputedRef<boolean> | false>('o-overlay', false)
        if (parentOverlayShow) {
            watch(parentOverlayShow, () => {
                if (!parentOverlayShow.value) {
                    emit('update:modelValue', false)
                }
            })
        }
        watch(() => props.modelValue, () => {
            getZIndex()
            if (!props.preventScroll) return
            if (props.modelValue && props.to) {
                lockBodyScrollList.add(overlaySymbol)
            } else {
                lockBodyScrollList.delete(overlaySymbol)
            }
        }, {
            immediate: true
        })
        watch(() => props.preventScroll, () => {
            if (props.modelValue && props.to) {
                if (props.preventScroll) {
                    lockBodyScrollList.add(overlaySymbol)
                } else {
                    lockBodyScrollList.delete(overlaySymbol)
                }
            }
        })
        onBeforeUnmount(() => {
            lockBodyScrollList.delete(overlaySymbol)
        })
        return () => (
            <Teleport to={props.to || null} disabled={!props.to}>
                <Transition name={props.transitionName} appear={true} onEnter={() => emit('enter')}>
                    {
                        !props.useVShow && !props.modelValue ? null : (
                            <>
                                <div class="o-overlay" style={{
                                    position: props.position,
                                    zIndex: typeof props.zIndex === 'undefined' ? zIndex.value : props.zIndex,
                                    background: props.background,
                                    backdropFilter: props.blur ? `blur(${typeof props.blur === 'boolean' ? '10px' : props.blur})` : ''
                                }} onClick={() => props.clickToClose && emit('update:modelValue', false)} v-show={props.useVShow ? props.modelValue : true} {...attrs}>
                                    { slots.default?.() }
                                </div>
                            </>
                        )
                    }
                </Transition>
            </Teleport>
        )
    }
})
