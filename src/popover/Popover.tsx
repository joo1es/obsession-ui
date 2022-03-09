import {
    defineComponent,
    h,
    Transition,
    PropType,
    cloneVNode,
    mergeProps,
    ref,
    computed,
    createTextVNode,
    CSSProperties,
    provide,
    inject,
    watch
} from 'vue'
import { VBinder, VTarget, VFollower } from 'vueuc'

import type { ExtractPropTypes } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { getMaxZIndex, useAutoControl } from '../utils'
import { closeAll } from './utils'

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'none';
export type PopoverPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';
export const popoverProps = {
    modelValue: {
        type: Boolean,
        default: undefined,
    },
    trigger: {
        type: String as PropType<PopoverTrigger>,
        default: 'click',
    },
    placement: {
        type: String as PropType<PopoverPlacement>,
        default: 'top',
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    zIndex: Number,
    raw: Boolean,
    to: {
        type: [String, Object, Boolean] as PropType<string | HTMLElement | false>,
        default: undefined,
    },
    width: {
        type: [Number, String] as PropType<number | 'trigger' | 'target'>,
    },
    flip: {
        type: Boolean,
        default: true,
    },
    duration: {
        type: Number,
        default: 100,
    },
    dark: Boolean,
    transition: {
        type: String,
        default: 'popover-transition',
    },
    closeOnClickOutside: {
        type: Boolean,
        default: true,
    },
    popoverClass: {
        type: [String, Object] as PropType<string | Record<string, boolean>>,
        default: '',
    },
    popoverStyle: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: '',
    },
    offset: {
        type: Array as PropType<number[]>,
    },
    x: Number,
    y: Number,
    doNotCloseMe: Boolean,
    useVShow: Boolean
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;

export const popoverEmits = {
    'update:modelValue': (value: boolean) => typeof value === 'boolean',
}

export type PopoverEmits = typeof popoverEmits;

const textVNodeType = createTextVNode('').type

export default defineComponent({
    name: 'OPopover',
    inheritAttrs: false,
    props: popoverProps,
    emits: popoverEmits,
    setup(props, { slots, emit, attrs }) {
        /**
         * 非受控模式
         */
        const popoverShow = ref(false)
        const zIndex = ref(0)
        const show = useAutoControl(popoverShow, props, 'modelValue', emit)
        watch(show, () => {
            if (show.value && !props.zIndex) {
                zIndex.value = getMaxZIndex()
            }
        })
        watch(closeAll, () => {
            if (closeAll.value && !props.doNotCloseMe) {
                show.value = false
            }
        })
        /**
         * 点击外部自动关闭自身
         */
        const popoverRef = ref<HTMLDivElement | null>(null)
        const popoverId = Math.random().toString(36).slice(-8)
        onClickOutside(popoverRef, (event) => {
            if (!props.closeOnClickOutside) return
            const { path } = event as PointerEvent & { path: HTMLElement[] }
            for (const el of path) {
                const wpPopover = el.getAttribute?.('_o_popover_')
                if (wpPopover === popoverId) return
            }
            if (!show.value) return
            show.value = false
        })
        const mouseMoveing = ref<ReturnType<typeof setTimeout> | null>(null)
        /**
         * 处理事件
         */
        const handleClick = () => {
            show.value = !show.value
        }
        const handleMouseEnter = () => {
            if (mouseMoveing.value) clearTimeout(mouseMoveing.value)
            show.value = true
        }
        const handleMouseLeave = () => {
            if (mouseMoveing.value) clearTimeout(mouseMoveing.value)
            mouseMoveing.value = setTimeout(() => {
                show.value = false
            }, props.duration)
        }
        const handleFocus = () => {
            show.value = true
        }
        const handleBlur = () => {
            show.value = false
        }
        const getReferenceNode = () => {
            const references = slots.target?.()
            if (!references) {
                if (props.x || props.y) return
                console.warn(
                    'ObsessionUi: Popover 组件没有找到 target，请确保插槽中正确放入内容'
                )
                return
            }
            const reference = cloneVNode(
                references[0].type === textVNodeType
                    ? h('span', null, references)
                    : references[0]
            )
            /**
             * 绑定事件
             */
            if (!reference.props) reference.props = {}
            const handlers: Record<string, () => void> = {}
            if (props.trigger === 'click') handlers.onClick = handleClick
            if (props.trigger === 'hover') {
                handlers.onMouseenter = handleMouseEnter
                handlers.onMouseleave = handleMouseLeave
            }
            if (props.trigger === 'focus') {
                handlers.onFocus = handleFocus
                handlers.onBlur = handleBlur
            }
            reference.props = mergeProps(reference.props, handlers, {
                _o_popover_: popoverId,
            })
            return reference
        }
        const followerEnabled = ref(show.value)
        const popoverClassRef = computed(() => {
            if (typeof props.popoverClass === 'string') {
                const popoverClasses = props.popoverClass.split(' ')
                const final: Record<string, boolean> = {}
                popoverClasses.forEach((item) => {
                    final[item] = true
                })
                return final
            }
            return props.popoverClass
        })
        const leaving = ref(false)
        provide('o-popover', true)
        const subPopover = inject<boolean>('o-popover', false)
        const toComputedRef = computed(() => {
            if (subPopover) return false
            return props.to
        })
        const zIndexRef = computed(() => props.zIndex || zIndex.value)
        return () => (
            <VBinder>
                <VTarget>{getReferenceNode()}</VTarget>
                <VFollower
                    show={true}
                    placement={props.placement}
                    zIndex={zIndexRef.value}
                    enabled={followerEnabled.value}
                    to={toComputedRef.value === false ? undefined : toComputedRef.value}
                    width={
                        props.width === 'trigger' || props.width === 'target'
                            ? 'target'
                            : undefined
                    }
                    flip={props.flip}
                    teleportDisabled={toComputedRef.value === false}
                    x={props.x}
                    y={props.y}
                >
                    <Transition
                        name={props.transition}
                        onEnter={() => {
                            followerEnabled.value = true
                        }}
                        onLeave={() => {
                            leaving.value = true
                        }}
                        onAfterLeave = {() => {
                            followerEnabled.value = false
                            leaving.value = false
                        }}
                    >
                        { props.useVShow || show.value ? (
                            props.raw ? (
                                <div
                                    class={popoverClassRef}
                                    ref={popoverRef}
                                    onMouseenter={() => {
                                        if (props.trigger !== 'hover' || leaving.value) return
                                        handleMouseEnter()
                                    }}
                                    onMouseleave={() => {
                                        if (props.trigger !== 'hover' || leaving.value) return
                                        handleMouseLeave()
                                    }}
                                    style={{
                                        width:
                      typeof props.width === 'number' ? `${props.width}px` : '',
                                        transform: props.offset
                                            ? `translateX(${props.offset[0]}px) translateY(${props.offset[1]}px)`
                                            : '',
                                    }}
                                    v-show={!props.useVShow ? true : show.value}
                                    { ...attrs }
                                >
                                    {slots.default?.()}
                                </div>
                            ) : (
                                <div
                                    class={{
                                        'o-popover': true,
                                        'o-popover__dark': props.dark,
                                        ...popoverClassRef.value,
                                    }}
                                    ref={popoverRef}
                                    onMouseenter={() => {
                                        if (props.trigger !== 'hover' || leaving.value) return
                                        handleMouseEnter()
                                    }}
                                    onMouseleave={() => {
                                        if (props.trigger !== 'hover') return
                                        handleMouseLeave()
                                    }}
                                    {...mergeProps({
                                        style: {
                                            width: typeof props.width === 'number' ? `${props.width}px`: '',
                                            transform: props.offset ? `translateX(${props.offset[0]}px) translateY(${props.offset[1]}px)` : ''
                                        }
                                    }, { style: props.popoverStyle })}
                                    v-show={!props.useVShow ? true : show.value}
                                    { ...attrs }
                                >
                                    {props.arrow ? <div class="o-popover-arrow" /> : null}
                                    <div class="o-popover-content">{slots.default?.()}</div>
                                </div>
                            )
                        ) : null}
                    </Transition>
                </VFollower>
            </VBinder>
        )
    },
})
