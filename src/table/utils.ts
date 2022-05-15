import { addUnit } from '../utils'
import { TableColumn, fixedWidth, colSpan, childLevel, noBorder } from './typings'

export const getStyle = (column: TableColumn) => ({
    left: column.fixed === true || column.fixed === 'left' ? `${column[fixedWidth]}` : undefined,
    right: column.fixed === 'right' ? `calc(${column[fixedWidth]})` : undefined,
    textAlign: column.align
})

export const calcFixedPosition = (columns: TableColumn[]) => {
    let fixedLeft = ''
    columns.forEach(column => {
        const width = addUnit(column.width) || '100px'
        column[fixedWidth] = `calc(${fixedLeft})`
        if (column.width) {
            if (!fixedLeft) {
                fixedLeft = width
            } else {
                fixedLeft += ' + ' + width
            }
        } else {
            fixedLeft += '100px'
        }
    })
}

/**
 * Get leaf nodes' count
 */
const getLeafNodeCount = (column: TableColumn) => {
    let count = 0
    if (column.children && column.children.length) {
        for (let i = 0; i < column.children.length; i++) {
            count += getLeafNodeCount(column.children[i])
        }
    } else {
        count = 1
    }
    return count
}

/**
 * This is a recursive function that returns the sum of all leaf nodes under the column
 */
export const getColSpanByColumn = (columns: TableColumn[], childrenColumns: TableColumn[], renderColumns: TableColumn[][], level = 0) => {
    columns.map(column => {
        column[colSpan] = getLeafNodeCount(column)
        column[childLevel] = level
        if (!renderColumns[level]) renderColumns[level] = []
        renderColumns[level].push(column)
        if (column.children && column.children.length > 0) {
            getColSpanByColumn(column.children, childrenColumns, renderColumns, level + 1)
        } else {
            childrenColumns.push(column)
        }
        return column
    })
}

/**
 * search last no border column
 */
export const setNoBorder = (columns: TableColumn[]) => {
    columns[columns.length - 1][noBorder] = true
    const lastColumn = columns[columns.length - 1]
    if (lastColumn.children && lastColumn.children.length > 0) {
        setNoBorder(lastColumn.children)
    }
}

/**
 * if you get 'a.b.c'
 * and will return to you a['b']['c']
 */
export const getTextByProp = (data: Record<keyof any, any>, prop?: keyof any) => {
    if (!prop) return
    if (typeof prop !== 'string' || !prop.includes('.')) return data[prop]
    const props = prop.split('.')
    let currentData = data
    for (const prop of props) {
        currentData = currentData[prop]
        if (currentData === null || currentData === undefined) return ''
    }
    return currentData
}