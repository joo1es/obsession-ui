export interface TreeListItem {
    key?: string | number | symbol,
    title?: string,
    disabled?: boolean,
    children?: TreeListItem[],
    remote?: boolean,
    [x: string]: any
}

export interface TreeListItemCustom extends TreeListItem {
    children?: TreeListItemCustom[],
    [x: string]: any
}

export interface TreeListItemExtra extends TreeListItem {
    level: number,
    keyIs: string | number | symbol,
    list: TreeListItemCustom,
    parent: TreeListItemCustom | null
}

export interface ExpandsList {
    isDelete: boolean,
    keyIs: string | number | symbol,
    level: number,
    done: () => void,
    leave: () => void
}