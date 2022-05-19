import { computed, defineComponent, ExtractPropTypes, PropType, ref, VNodeChild, provide } from 'vue'

import type { TreeListItemCustom, TreeListItemExtra, TreeListItem, ExpandsList } from './interface'

import { useAutoControl } from '../utils'

import VirtualList from '../virtual-list'

import TreeNode from './TreeNode'
import TreeTransition from './TreeTransition'

import { flattenList, getChecked, getCheckedItems, itemsFilter, getFlattenList, getItemsCount } from './utils'

export const treeProps = {
    list: {
        type: Array as PropType<TreeListItemCustom[]>,
        default: () => []
    },
    props: {
        type: Object as PropType<{ key: string, title: string }>,
        default: () => ({
            key: 'key',
            title: 'title'
        })
    },
    expands: {
        type: Array as PropType<(string | number | symbol)[]>,
        default: undefined
    },
    checkable: Boolean,
    checked: {
        type: Array as PropType<(string | number | symbol)[]>,
        default: undefined
    },
    virtual: Boolean,
    getKey: Function as PropType<(item: TreeListItemCustom) => string | number | symbol>,
    height: String,
    animation: {
        type: Boolean,
        default: true
    },
    filter: String,
    filterable: Boolean,
    itemHeight: {
        type: Number,
        default: 30
    },
    animationMax: {
        type: Number,
        default: 80
    },
    selection: [String, Number, Symbol] as PropType<string | number | symbol>,
    selectable: Boolean,
    arrow: {
        type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
        default: true
    },
    useRadio: Boolean,
    exclude: Array as PropType<(string | number | symbol)[]>,
    link: Boolean,
    onRemote: Function as PropType<(item: TreeListItemCustom) => Promise<TreeListItemCustom[]>>,
    draggable: Boolean,
    checkStrictly: Boolean,
    autoExpands: {
        type: Boolean,
        default: true
    },
    filterCall: Function as PropType<(item: TreeListItemCustom, text?: string) => boolean>,
}

export type TreeProps = ExtractPropTypes<typeof treeProps>

export default defineComponent({
    name: 'OTree',
    props: treeProps,
    emits: {
        'update:expands': (expands: (string | number | symbol)[]) => Array.isArray(expands),
        'update:checked': (checked: (string | number | symbol)[]) => Array.isArray(checked),
        'update:selection': (selection: string | number | symbol) => {
            void selection
            return true
        },
        'select': (selection: string | number | symbol, item: TreeListItemCustom) => {
            void selection
            void item
            return true
        }
    },
    setup(props, { emit }) {
        const expandsRef = ref<(string | number | symbol)[]>([])
        const expands = useAutoControl(expandsRef, props, 'expands', emit, {
            passive: true,
            deep: true
        })
        const checkedRef = ref<(string | number | symbol)[]>([])
        const checked = useAutoControl(checkedRef, props, 'checked', emit, {
            passive: true,
            deep: true
        })
        const checkedSet = computed(() => new Set(checked.value))
        const setChecked = (value: boolean, list: TreeListItem[], checkedSet: Set<string | number | symbol>, excludeSet: Set<string | number | symbol>) => {
            for (let i = 0; i < list.length; i++) {
                const item = list[i]
                const key = props.getKey?.(item) || item[props.props.key]
                if (excludeSet.has(key) && value) continue
                if (item.children && item.children.length > 0) {
                    setChecked(value, item.children, checkedSet, excludeSet)
                    continue
                }
                if (item.disabled) continue
                if (item.children) continue
                if (value) {
                    checkedSet.add(key)
                } else {
                    checkedSet.delete(key)
                }
            }
        }
        const setingChecked = (value: boolean, list: TreeListItem[]) => {
            const excludeSet = new Set(props.exclude)
            setChecked(value, list, checkedSet.value, excludeSet)
            checked.value = Array.from(checkedSet.value)
        }
        /**
         * 过滤
         */
        const filterRecord = ref(props.filter)
        const filterItems = computed(() => {
            const needAutoExpand = filterRecord.value !== props.filter
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            filterRecord.value = props.filter
            return itemsFilter(props, props.filter, expands, needAutoExpand)
        })
        const treeListFlatten = computed(() => {
            const finalList: TreeListItemExtra[] = []
            filterItems.value.forEach(item => {
                flattenList(item, finalList, 0, null, expands.value || [], props)
            })
            return finalList
        })
        const expandsList = ref<ExpandsList[]>([])
        const done = (isDelete: boolean, key: string | number | symbol) => {
            if (!expands.value) {
                expands.value = []
            }
            const index = expands.value.indexOf(key)
            if (isDelete) {
                expands.value.splice(index, 1)
            } else expands.value.push(key)
        }
        const leave = (key: string | number | symbol) => {
            const expandIndex = expandsList.value.findIndex(expandsItem => expandsItem.keyIs === key)
            if (expandIndex > -1) {
                expandsList.value.splice(expandIndex, 1)
            }
        }
        const handleExpand = (isDelete: boolean, key: string | number | symbol, level: number) => {
            if (expandsList.value.find(item => item.keyIs === key)) return
            if (props.animation) {
                expandsList.value.push({
                    isDelete,
                    keyIs: key,
                    level,
                    leave: () => {
                        leave(key)
                    },
                    done: () => {
                        done(isDelete, key)
                    }
                })
            } else {
                done(isDelete, key)
            }
        }
        const selectionRef = ref<string | number | symbol>()
        const selection = useAutoControl(selectionRef, props, 'selection', emit)

        const dragging = ref<TreeListItemExtra | null>(null)
        provide('o-tree-dragging', dragging)

        return {
            selection,
            checked,
            checkedSet,
            expands,
            expandsList,
            treeListFlatten,
            leave,
            done,
            setingChecked,
            handleExpand,
            getCheckedItems: () => getCheckedItems(props.list, checked.value || [], props),
            getFlattenList: (getSet = false) => getFlattenList(props.list, getSet),
            getItemsCount: (filter = false) => getItemsCount(filter ? filterItems.value : props.list, props),
            checkAll: () => {
                if (props.useRadio) return
                setingChecked(true, props.list)
            }
        }
    },
    expose: ['getCheckedItems'],
    render() {
        const TreeNodeFactory = (item: TreeListItemExtra) => (
            <TreeNode
                { ...item }
                expands={this.expands || []}
                getChecked={(list: TreeListItemCustom) => getChecked(list, this.$props, this.checkedSet)}
                v-model={this.checked}
                expandsList={this.expandsList}
                onSetChecked={this.setingChecked}
                onExpand={this.handleExpand}
                checkable={this.checkable}
                selectable={this.selectable}
                selection={this.selection}
                onUpdate:selection={value => {
                    this.selection = value
                }}
                onSelect={(selection, item) => this.$emit('select', selection, item)}
                arrow={this.arrow}
                useRadio={this.useRadio}
                link={this.link}
                draggable={this.draggable}
                propList={this.list}
                checkStrictly={this.checkStrictly}
                onRemote={this.onRemote}
                onRemoteChange={(list: TreeListItemCustom[]) => {
                    item.list.remote = false
                    item.list.children = list
                }}
                onChildrenAdd={(dragging: TreeListItemCustom) => {
                    if (!item.list.children) item.list.children = []
                    item.list.children.push(dragging)
                }}
                v-slots={{
                    prefix: this.$slots.prefix,
                    suffix: this.$slots.suffix,
                    default: this.$slots.title,
                    arrow: this.$slots.arrow
                }}
            />
        )
        const treeNodeRender = (item: TreeListItemExtra) => {
            const TreeNodeRender = (dom?: VNodeChild) => (
                !dom ? TreeNodeFactory(item) : (
                    <>
                        {TreeNodeFactory(item)}
                        {dom}
                    </>
                )
            )
            const expandsListFind =  this.expandsList.find(expandsItem => expandsItem.keyIs === item.keyIs)
            if (this.animation && expandsListFind && item.children) {
                const finalList: TreeListItemExtra[] = []
                item.children.forEach(child => {
                    flattenList(child, finalList, expandsListFind.level + 1, null, this.expands || [], this.$props)
                })
                if (finalList.length <= this.animationMax) {
                    return (
                        TreeNodeRender(
                            <TreeTransition key={item.key} {...expandsListFind} v-slots={{
                                default: () => (
                                    <div>
                                        { finalList.map(TreeNodeFactory) }
                                    </div>
                                )
                            }} />
                        )
                    )
                }
                this.leave(expandsListFind.keyIs)
                this.done(expandsListFind.isDelete, expandsListFind.keyIs)
            }
            return TreeNodeRender()
        }
        return (
            <div class={'o-tree'}>
                { this.$slots.default?.() }
                {
                    !this.virtual ? (
                        <div class='o-tree-nodes' style={{
                            height: this.height
                        }}>
                            { this.treeListFlatten.map(treeNodeRender) }
                        </div>
                    ) : (
                        <VirtualList
                            keyField="key"
                            style={{
                                height: this.height
                            }}
                            itemSize={this.itemHeight}
                            items={this.treeListFlatten}
                            class='o-tree-nodes'
                            v-slots={{
                                default: ({ item }: { item: TreeListItemExtra }) => treeNodeRender(item)
                            }}
                        />
                    )
                }
            </div>
        )
    }
})
