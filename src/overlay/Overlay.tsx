import { defineComponent, ExtractPropTypes, PropType, watch, ref, Teleport, RendererElement, Transition, computed, ComputedRef } from 'vue'

import { lockBodyScrollList } from './utils'

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
        default: '#00000099'
    },
    blur: {
        type: [Boolean, String] as PropType<boolean | string>,
        default: false
    },
    zIndex: Number,
    to: {
        type: [String, Object] as PropType<string | RendererElement | null>,
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

const getMaxZIndex = () => {
    const elements = Array.from(document.querySelectorAll('*'))
    const arr = elements.map(e => +window.getComputedStyle(e).zIndex || 0)
    return arr.length ? Math.max(...arr) + 1 : 1
}

export default defineComponent({
    name: 'OOverlay',
    inheritAttrs: false,
    props: overlayProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean'
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
        const parentOverlayShow = inject<ComputedRef<boolean>>('o-overlay', false)
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
            if (props.modelValue) {
                lockBodyScrollList.add(overlaySymbol)
            } else {
                lockBodyScrollList.delete(overlaySymbol)
            }
        }, {
            immediate: true
        })
        watch(() => props.preventScroll, () => {
            if (props.modelValue) {
                if (props.preventScroll) {
                    lockBodyScrollList.add(overlaySymbol)
                } else {
                    lockBodyScrollList.delete(overlaySymbol)
                }
            }
        })
        return () => (
            <Teleport to={props.to}>
                <Transition name={props.transitionName}>
                    {
                        !props.useVShow && !props.modelValue ? null : (
                            <>
                                <div class="o-overlay" style={{
                                    position: props.position,
                                    zIndex: typeof props.zIndex === 'undefined' ? zIndex.value : props.zIndex,
                                    background: props.background,
                                    backdropFilter: props.blur ? `blur(${typeof props.blur === 'boolean' ? '10px' : props.blur})` : '',
                                    display: props.useVShow && !props.modelValue ? 'none' : ''
                                }} onClick={() => props.clickToClose && emit('update:modelValue', false)} {...attrs}>
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
