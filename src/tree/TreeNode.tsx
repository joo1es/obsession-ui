import { computed, defineComponent, inject, PropType, ref, Ref } from 'vue'

import Icon from '../icon'
import { CaretForward } from '@vicons/ionicons5'
import Checkbox from '../checkbox'
import Radio from '../radio'

import type { TreeListItemCustom, ExpandsList, TreeListItemExtra } from './interface'
import { isChildrenOrSelf } from './utils'
import { useVModel } from '@vueuse/core'
import Spin from '../spin'

export default defineComponent({
    props: {
        keyIs: {
            type: [String, Number, Symbol] as PropType<string | number | symbol>,
            required: true
        },
        title: String,
        level: {
            type: Number,
            required: true
        },
        expands: {
            type: Array as PropType<(string | number | symbol)[]>,
            required: true
        },
        modelValue: {
            type: Array as PropType<(string | number | symbol)[]>
        },
        disabled: Boolean,
        list: {
            type: Object as PropType<TreeListItemCustom>,
            required: true
        },
        getChecked: {
            type: Function as PropType<(list: TreeListItemCustom) => -1 | -2 | 0 | 1>,
            required: true
        },
        children: Array as PropType<TreeListItemCustom[]>,
        expandsList: {
            type: Array as PropType<ExpandsList[]>,
            required: true
        },
        parent: {
            type: [Object, null] as PropType<TreeListItemCustom | null>,
            required: true
        },
        checkable: Boolean,
        selectable: Boolean,
        selection: [String, Number, Symbol] as PropType<string | number | symbol>,
        arrow: {
            type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
            default: true
        },
        useRadio: Boolean,
        link: Boolean,
        draggable: Boolean,
        remote: Boolean,
        propList: Array as PropType<TreeListItemCustom[]>,
        onRemote: Function as PropType<(item: TreeListItemCustom) => Promise<TreeListItemCustom[]>>,
        onRemoteChange: Function as PropType<(list: TreeListItemCustom[]) => void>,
        checkStrictly: Boolean
    },
    emits: {
        setChecked: (value: boolean, children: TreeListItemCustom[]) => {
            void value
            void children
            return true
        },
        expand: (isDelete: boolean, key: string | number | symbol, level: number) => {
            void isDelete
            void key
            void level
            return true
        },
        'update:modelValue': (value: (string | number | symbol)[]) => Array.isArray(value),
        'update:selection': (selection: string | number | symbol) => {
            void selection
            return true
        },
        select: (selection: string | number | symbol, item: TreeListItemCustom) => {
            void selection
            void item
            return true
        },
        'childrenAdd': (dragging: TreeListItemCustom) => typeof dragging === 'object'
    },
    setup(props, { slots, emit }) {
        const checkedList = useVModel(props, 'modelValue', emit, {
            passive: true,
            deep: true
        })
        
        const levels = computed(() => new Array(props.level).fill(''))
        
        const expanding = computed(() => props.expands.includes(props.keyIs) || props.expandsList.find(item => !item.isDelete && item.keyIs === props.keyIs))
        const checkedStatus = computed(() => props.getChecked(props.list))
        const disabled = computed(() => props.disabled || (checkedStatus.value === -2 && !props.checkStrictly))
        const isNoChildren = computed(() => !props.children || props.children.length === 0)

        /**
         * 展开的函数
         */
        const loading = ref(false)
        const expand = async() => {
            if (isNoChildren.value && !props.remote) return
            try {
                if (props.remote && props.onRemote) {
                    loading.value = true
                    const list = await props.onRemote(props.list)
                    props.onRemoteChange?.(list)
                    emit('expand', props.expands.includes(props.keyIs), props.keyIs, props.level)
                } else {
                    emit('expand', props.expands.includes(props.keyIs), props.keyIs, props.level)
                }
            } finally {
                loading.value = false
            }
        }

        const arrow = computed(() => (
            <div class={{
                'o-tree-node__arrow': true,
                'left': props.arrow === true || props.arrow === 'left',
                'right': props.arrow === 'right'
            }} onClick={e => {
                if (!isNoChildren.value || props.remote) {
                    e.stopPropagation()
                    expand()
                }
            }}>
                {
                    !isNoChildren.value || props.remote ? (
                        loading.value ? (
                            <Spin color="currentcolor" />
                        ) : (
                            <Icon class={{
                                expand: expanding.value
                            }}>
                                <CaretForward />
                            </Icon>
                        )
                    ) : null
                }
            </div>
        ))

        /**
         * 可拖拽
         */
        const onDragging = ref(false)
        const dragging = inject<Ref<TreeListItemExtra | null>>('o-tree-dragging', ref(null))
        const handleDragStart = () => {
            dragging.value = props
        }
        const handleDragEnd = () => {
            dragging.value = null
        }

        const dragRemove = (avoidIndex?: number) => {
            if (!dragging.value) return
            const dragChildren = dragging.value.parent ? dragging.value.parent.children : props.propList
            const index = dragChildren?.findIndex((item, i) => {
                /**
                 * 如果有同一个父元素，会避免删除自身
                 */
                if (dragging.value?.parent === props.parent && typeof avoidIndex === 'number') {
                    return item === dragging.value?.list && i !== avoidIndex
                }
                return item === dragging.value?.list
            })
            if (typeof index === 'number' && index > -1) {
                dragChildren?.splice(index, 1)
            }
            // 如果没有任何子元素了，设为叶子节点
            if (dragChildren?.length === 0) {
                if (dragging.value.parent) dragging.value.parent.children = undefined
                // props.propList 不可能没有任何子元素，也不可能为叶子节点，所以不做修改
            }
            dragging.value = null
        }

        /**
         * isDroppable
         * 是否能被“丢”到上面
         */
        const isDroppable = computed(() => {
            if (!props.draggable) return false
            if (props.remote || !dragging.value) return false
            if (props.parent === dragging.value.list) return false
            if (isChildrenOrSelf(dragging.value.list, props.list)) return false
            return true
        })

        /**
         * content 元素的 drop 判断
         */
        const handleDragover = (e: Event) => {
            if (!isDroppable.value) return
            e.preventDefault()
            onDragging.value = true
        }
        const handleDrop = () => {
            onDragging.value = false
            if (!isDroppable.value || !dragging.value) return
            emit('childrenAdd', dragging.value.list)
            // remove
            dragRemove()
        }

        /**
         * 上线条或者下线条的 drop 判断
         */
        const onDraggingTop = ref(false)
        const onDraggingBottom = ref(false)
        const handleDragoverTop = (e: Event, isTop = true) => {
            if (!isDroppable.value) return
            e.preventDefault()
            e.stopPropagation()
            if (isTop) {
                onDraggingTop.value = true
            } else {
                onDraggingBottom.value = true
            }
        }
        const handleDropTop = (e: Event, isTop = true) => {
            if (isTop) {
                onDraggingTop.value = false
            } else {
                onDraggingBottom.value = false
            }
            if (!isDroppable.value || !dragging.value) return
            e.stopPropagation()
            // add
            const dragChildren = props.parent ? props.parent.children : props.propList
            const index = dragChildren?.findIndex(item => item === props.list)
            if (typeof index === 'number' && index > -1) {
                dragChildren?.splice(isTop ? index : index + 1, 0, dragging.value.list)
            }
            // remove
            dragRemove(typeof index === 'number' ? ( isTop ? index : index + 1 ) : undefined)
        }
        
        const slotBind = computed(() => ({ ...props.list, expanding: expanding.value, loading: loading.value })) 

        return () => {
            const NodeContent = (
                [
                    <div class='o-tree-node__indent'>
                        {
                            levels.value.map(lv => (
                                <div key={lv} class={{
                                    'o-tree-node__indent-cell': true,
                                    'o-tree-node__indent-cell--link': props.link
                                }} />
                            ))
                        }
                    </div>,
                    <div class='o-tree-node__title'>
                        { props.arrow === true || props.arrow === 'left' ? ( slots.arrow?.(slotBind) || arrow.value ) : null }
                        { slots.prefix?.(slotBind) }
                        <div class="o-tree-node__content">
                            {
                                props.checkable ? (
                                    !props.useRadio ?
                                        <Checkbox
                                            disabled={disabled.value}
                                            modelValue={checkedStatus.value === 1}
                                            indeterminate={checkedStatus.value === 0}
                                            onClick={(e: Event) => {
                                                e.stopPropagation()
                                            }}
                                            onUpdate:modelValue={value => {
                                                if (disabled.value) return
                                                if (!props.children || props.checkStrictly) {
                                                    if (!checkedList.value) return
                                                    const index = checkedList.value.indexOf(props.keyIs)
                                                    if (value) {
                                                        if (index > -1) return
                                                        checkedList.value.push(props.keyIs)
                                                    } else {
                                                        checkedList.value.splice(index, 1)
                                                    }
                                                } else {
                                                    emit('setChecked', value, props.children)
                                                }
                                            }}
                                        /> :
                                        <Radio
                                            disabled={disabled.value || (Boolean(props.children) && !props.checkStrictly)}
                                            modelValue={checkedStatus.value !== -1}
                                            onClick={(e: Event) => {
                                                e.stopPropagation()
                                            }}
                                            onUpdate:modelValue={() => {
                                                if (disabled.value) return
                                                if (!props.children || props.checkStrictly) {
                                                    if (!checkedList.value) return
                                                    checkedList.value = [props.keyIs]
                                                }
                                            }}
                                        />
                                ) : null
                            }
                            { slots.default?.(props.list) ?? props.title ?? props.keyIs }
                        </div>
                        { slots.suffix?.(slotBind) }
                        { props.arrow === 'right' ? ( slots.arrow?.(slotBind) || arrow.value ) : null }
                    </div>
                ]
            )
            if (props.draggable) {
                NodeContent.unshift(
                    <div
                        class={{
                            'top': true,
                            'o-tree-node__dropline': true,
                            'o-tree-node__ondrag': onDraggingTop.value
                        }}
                        onDragover={handleDragoverTop}
                        onDragleave={() => {
                            onDraggingTop.value = false
                        }}
                        onDrop={handleDropTop}
                    />
                )
                NodeContent.push(
                    <div
                        class={{
                            'bottom': true,
                            'o-tree-node__dropline': true,
                            'o-tree-node__ondrag': onDraggingBottom.value
                        }}
                        onDragover={e => handleDragoverTop(e, false)}
                        onDragleave={() => {
                            onDraggingBottom.value = false
                        }}
                        onDrop={e => handleDropTop(e, false)}
                    />
                )
            }
            return (
                <div
                    class={{
                        'o-tree-node': true,
                        'o-tree-node__selection-disabled': props.disabled,
                        'o-tree-node__disabled': disabled.value,
                        'o-tree-node__selecting': props.selectable && props.selection === props.keyIs,
                        'o-tree-node__ondrag': onDragging.value
                    }}
                    onClick={() => {
                        if (props.selectable && !props.disabled) {
                            if (props.selection !== props.keyIs) {
                                emit('update:selection', props.keyIs)
                                emit('select', props.keyIs, props.list)
                                return
                            }
                        }
                        expand()
                    }}
                    draggable={props.draggable}
                    onDragstart={handleDragStart}
                    onDragend={handleDragEnd}
                    onDragover={handleDragover}
                    onDragleave={() => {
                        onDragging.value = false
                    }}
                    onDrop={handleDrop}
                >
                    {NodeContent}
                </div>
            )
        }
    }
})
