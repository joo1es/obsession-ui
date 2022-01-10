import { computed, defineComponent, PropType } from 'vue'

import Icon from '../icon'
import { CaretForward } from '@vicons/ionicons5'
import Checkbox from '../checkbox'

import type { TreeListItemCustom, ExpendsList } from './interface'
import { useVModel } from '@vueuse/core'

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
        expends: {
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
        expendsList: {
            type: Array as PropType<ExpendsList[]>,
            required: true
        },
        parent: Object as PropType<TreeListItemCustom | null>,
        checkable: Boolean,
        selectable: Boolean,
        selection: [String, Number, Symbol] as PropType<string | number | symbol>
    },
    emits: {
        setChecked: (value: boolean, children: TreeListItemCustom[]) => {
            void value
            void children
            return true
        },
        expend: (isDelete: boolean, key: string | number | symbol, level: number) => {
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
        }
    },
    setup(props, { slots, emit }) {
        const checkedList = useVModel(props, 'modelValue', emit, {
            passive: true,
            deep: true
        })
        
        const levels = computed(() => new Array(props.level).fill(''))
        
        const expending = computed(() => props.expends.includes(props.keyIs) || props.expendsList.find(item => !item.isDelete && item.keyIs === props.keyIs))
        const checkedStatus = computed(() => props.getChecked(props.list))
        const disabled = computed(() => props.disabled || checkedStatus.value === -2)
        const isNoChildren = computed(() => !props.children || props.children.length === 0)
        return () => (
            <div
                class={{
                    'o-tree-node': true,
                    'o-tree-node__disabled': disabled.value,
                    'o-tree-node__selected': props.selectable && props.selection === props.keyIs
                }}
                onClick={() => {
                    if (props.selectable && !props.disabled) {
                        if (props.selection !== props.keyIs) {
                            emit('update:selection', props.keyIs)
                            emit('select', props.keyIs, props.list)
                            return
                        }
                    }
                    if (isNoChildren.value) return
                    const index = props.expends.indexOf(props.keyIs)
                    emit('expend', index > -1, props.keyIs, props.level)
                }}
            >
                <div class='o-tree-node__indent'>
                    {
                        levels.value.map(lv => (
                            <div key={lv} class='o-tree-node__indent-cell' />
                        ))
                    }
                </div>
                <div class='o-tree-node__title'>
                    <div class="o-tree-node__arrow" onClick={e => {
                        if (!isNoChildren.value) {
                            e.stopPropagation()
                            const index = props.expends.indexOf(props.keyIs)
                            emit('expend', index > -1, props.keyIs, props.level)
                        }
                    }}>
                        {
                            !isNoChildren.value ? (
                                <Icon class={{ 'expend': expending.value }}>
                                    <CaretForward />
                                </Icon>
                            ) : null
                        }
                    </div>
                    <div class="o-tree-node__content">
                        {
                            props.checkable ? (
                                <Checkbox
                                    disabled={disabled.value}
                                    modelValue={checkedStatus.value === 1}
                                    indeterminate={checkedStatus.value === 0}
                                    onClick={(e: Event) => {
                                        e.stopPropagation()
                                    }}
                                    onUpdate:modelValue={value => {
                                        if (disabled.value) return
                                        if (!props.children) {
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
                                />
                            ) : null
                        }
                        { slots.default?.(props.list) || props.title || props.keyIs }
                    </div>
                </div>
            </div>
        )
    }
})
