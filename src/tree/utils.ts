import { Ref } from 'vue'
import { TreeListItemCustom, TreeListItemExtra } from './interface'
import { TreeProps } from './Tree'

const getListByText = (text: string | undefined, props: TreeProps, list: TreeListItemCustom[], finalList: TreeListItemCustom[], expands?: (string | number | symbol)[]) => {
    if (!text) return list
    return list.forEach(item => {
        const key = props.getKey?.(item) || item[props.props.key]
        /**
         * 1. 标题内容符合条件
         */
        if (
            item[props.props.title]?.includes(text) ||
            item[key]?.includes(text)
        ) {
            return finalList.push(item)
        }
        /**
         * 2. 如果没有子元素
         */
        if (!item.children || item.children.length === 0) return
        if (expands) expands.push(key)
        /**
         * 3. 递归检查子元素
         */
        const children: TreeListItemCustom[] = []
        getListByText(text, props, item.children, children, expands)
        if (children.length === 0) return
        finalList.push({
            ...item,
            children
        })
    })
}

const getListByExclude = (excludeSet: Set<string | number | symbol>, props: TreeProps, list: TreeListItemCustom[], finalList: TreeListItemCustom[]) => {
    if (!excludeSet) return list
    return list.forEach(item => {
        const key = props.getKey?.(item) || item[props.props.key]
        if (excludeSet.has(key)) return
        if (!item.children) {
            finalList.push(item)
            return
        }
        if (item.children.length === 0) return
        const children: TreeListItemCustom[] = []
        getListByExclude(excludeSet, props, item.children, children)
        if (children.length === 0) return
        finalList.push({
            ...item,
            children
        })
    })
}

export const itemsFilter = (props: TreeProps, text?: string, expandsRef?: Ref<(string | number | symbol)[] | undefined>) => {
    let { list } = props
    if (props.autoExpands && expandsRef) expandsRef.value = []
    if (props.filterable && text) {
        const expands: (string | number | symbol)[] = []
        const final: TreeListItemCustom[] = []
        getListByText(text, props, props.list, final, expands)
        if (props.autoExpands && expandsRef) expandsRef.value = expands as (string | number | symbol)[]
        list = final
    }
    const excludeSet = props.exclude ? new Set<string | number | symbol>(props.exclude) : undefined
    if (excludeSet) {
        const final: TreeListItemCustom[] = []
        getListByExclude(excludeSet, props, list, final)
        list = final
    }
    return list
}

export const getStatus = (
    children: TreeListItemCustom[],
    counter: {
        count: number,
        checkedCount: number
    },
    checkedSet: Set<string | number | symbol>,
    props: TreeProps
) => {
    for (let i = 0; i < children.length; i++) {
        const item = children[i]
        const key = props.getKey?.(item) || item[props.props.key]
        if (item.disabled || item.remote) continue
        if (item.children && item.children.length > 0) {
            getStatus(item.children, counter, checkedSet, props)
            continue
        }
        if (counter.checkedCount !== 0 && counter.count !== counter.checkedCount) return 0
        if (checkedSet.has(key)) counter.checkedCount += 1
        if (!item.children) counter.count += 1
    }
    if (counter.count === 0) return -2
    if (counter.checkedCount === 0) return -1
    if (counter.count === counter.checkedCount) return 1
    return 0
}

export const getChecked = (list: TreeListItemCustom, props: TreeProps, checkedSet: Set<string | number | symbol>) => {
    const key = props.getKey?.(list) || list[props.props.key]
    if (!list.children || props.checkStrictly) return checkedSet.has(key) ? 1 : -1
    if (list.children.length === 0) return -2
    const counter = {
        count: 0,
        checkedCount: 0
    }
    const status = getStatus(list.children, counter, checkedSet, props)
    return status
}

export const flattenList = (
    list: TreeListItemCustom,
    finalList: TreeListItemExtra[],
    level = 0,
    parent: null | TreeListItemCustom = null,
    expands: (string | number | symbol)[],
    props: TreeProps
) => {
    const key = props.getKey ? props.getKey(list) : list[props.props.key]
    finalList.push({
        key: `${String(key)}--${finalList.length}`,
        keyIs: key,
        title: list[props.props.title],
        level,
        children: list.children,
        disabled: Boolean(list.disabled),
        list,
        parent,
        remote: list.remote
    })
    if (!list.remote && list.children && expands.includes(key)) {
        for (const item of list.children) {
            flattenList(item, finalList, level + 1, list, expands, props)
        }
    }
}

/**
 * 
 * Expose
 * 
 */

export const getCheckedItems = (
    treeList: TreeListItemCustom[],
    checked: (string | number | symbol)[],
    props: TreeProps
) => {
    const final = new Set<TreeListItemCustom>()
    const checkedSet = new Set(checked)
    const getItems = (list: TreeListItemCustom[]) => {
        for (const item of list) {
            const key = props.getKey ? props.getKey(item) : item[props.props.key]
            if (item.children) {
                getItems(item.children)
            } else if (checkedSet.has(key)) final.add(item)
        }
    }
    getItems(treeList)
    return Array.from(final)
}

export const getFlattenList = (fullList: TreeListItemCustom[], getSet = false) => {
    const finalList = new Set<TreeListItemCustom>()
    const getingFlattenList = (list: TreeListItemCustom) => {
        finalList.add(list)
        if (list.children && list.children.length > 0) {
            list.children.forEach(item => getingFlattenList(item))
        }
    }
    fullList.forEach(item => getingFlattenList(item))
    return getSet ? finalList : Array.from(finalList)
}

export const getItemsCount = (fullList: TreeListItemCustom[], props: TreeProps) => {
    const excludeSet = props.exclude ? new Set<string | number | symbol>(props.exclude) : undefined
    const finalCounter = new Set<TreeListItemCustom>()
    const flattenItems = getFlattenList(fullList, true) as Set<TreeListItemCustom>
    for (const item of flattenItems) {
        if (item.disabled || item.remote) continue
        if (item.children) continue
        const key = props.getKey ? props.getKey(item) : item[props.props.key]
        if (excludeSet && excludeSet.has(key)) continue
        finalCounter.add(key)
    }
    return finalCounter.size
}

/**
 * Draggable
 * 判断是否是自身或者子元素，避免拖动时删除自身或者造成无限引用
 */
export const isChildrenOrSelf = (item: TreeListItemCustom, compareItem?: TreeListItemCustom) => {
    // 1. 比较项不存在，否
    if (!compareItem) return false
    // 2. 是自身
    if (item === compareItem) return true
    // 3. 无子元素，不可是子元素
    if (
        !item.children ||
        item.remote ||
        item.children.length === 0
    ) return false
    // 4. 扁平化后判断是否存在子元素
    const itemChildrenSet = getFlattenList(item.children, true) as Set<TreeListItemCustom>
    return itemChildrenSet.has(compareItem)
}
