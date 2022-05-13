import type { EllipsisProps } from '../ellipsis'

export const fixedWidth = Symbol('fixedWidth')
export const firstRight = Symbol('firstRight')
export const lastLeft = Symbol('lastLeft')
export const colSpan = Symbol('colSpan')
export const rowSpan = Symbol('rowSpan')
export const childLevel = Symbol('childLevel')
export const noBorder = Symbol('noBorder')

export interface DataColumn {
    label?: string
    prop?: keyof any
    ellipsis?: boolean | Partial<EllipsisProps>
    width?: string | number
    minWidth?: string | number
    fixed?: boolean | 'left' | 'right'
    align?: 'left' | 'right' | 'center'
    children?: DataColumn[]
    type?: 'index' | 'selection' | 'radio' | 'checkbox'
    indent?: boolean
    colSpan?: (rowData: object, rowIndex: number) => number
    rowSpan?: (rowData: object, rowIndex: number) => number
    className?: string
    [fixedWidth]?: string
    [firstRight]?: boolean
    [colSpan]?: number,
    [rowSpan]?: number
    [childLevel]?: number,
    [noBorder]?: boolean,
    [lastLeft]?: boolean
}