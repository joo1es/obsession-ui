import type { EllipsisProps } from '../ellipsis'

export const fixedWidth = Symbol('fixedWidth')
export const firstRight = Symbol('firstRight')
export const lastLeft = Symbol('lastLeft')
export const colSpan = Symbol('colSpan')
export const rowSpan = Symbol('rowSpan')
export const childLevel = Symbol('childLevel')
export const noBorder = Symbol('noBorder')

export interface TableColumn {
    label?: string
    prop?: keyof any
    ellipsis?: boolean | Partial<EllipsisProps>
    width?: string | number
    minWidth?: string | number
    fixed?: boolean | 'left' | 'right'
    align?: 'left' | 'right' | 'center'
    children?: TableColumn[]
    type?: 'index' | 'selection' | 'radio' | 'checkbox'
    indent?: boolean
    colSpan?: (rowData: object, rowIndex: number) => number
    rowSpan?: (rowData: object, rowIndex: number) => number
    className?: string
    sortable?: boolean | ((a: unknown, b: unknown) => number) | 'remote',
    filter?: { label?: string, value: any }[],
    filterBy?: 'or' | 'and',
    filterMethod?: ((filters: any[], value: any, row: object) => boolean) | 'remote',
    [fixedWidth]?: string
    [firstRight]?: boolean
    [colSpan]?: number,
    [rowSpan]?: number
    [childLevel]?: number,
    [noBorder]?: boolean,
    [lastLeft]?: boolean
}