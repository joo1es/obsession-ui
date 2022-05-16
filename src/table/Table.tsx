import {
    ref,
    computed,
    defineComponent,
    type ExtractPropTypes,
    type PropType,
    h,
    watch
} from 'vue'

import { type TableColumn, firstRight, colSpan, childLevel, rowSpan, noBorder, lastLeft } from './typings'
import { getStyle, getColSpanByColumn, calcFixedPosition, getTextByProp, setNoBorder, getClass } from './utils'
import { addUnit, useNamespace, useAutoControl } from '../utils'

import Ellipsis from '../ellipsis'
import { useScroll } from '@vueuse/core'
import Checkbox from '../checkbox'
import Radio from '../radio'
import Icon from '../icon'
import VirtualList from '../virtual-list'
import DataTableRender from './Render'
import ScrollBar, { type ScrollBarProps } from '../scroll-bar'

import { ChevronForward, ArrowDownOutline } from '@vicons/ionicons5'

export const dataTableProps = {
    columns: {
        type: Array as PropType<TableColumn[]>
    },
    data: {
        type: Array as PropType<any[]>
    },
    rowKey: String,
    border: {
        type: Boolean
    },
    stripe: Boolean,
    height: {
        type: [String, Number] as PropType<string | number>
    },
    fixed: Boolean,
    totalLine: null,
    footFixed: Boolean,
    scrollWidth: {
        type: [String, Number]
    },
    dark: Boolean,
    selections: {
        type: Array as PropType<any[]>
    },
    radio: null,
    expands: {
        type: Array as PropType<any[]>
    },
    childrenField: {
        type: String,
        default: 'children'
    },
    itemHeight: {
        type: Number,
        default: 50
    },
    rowClassName: {
        type: [String, Function] as PropType<string | ((rowData: object, index: number) => string)>
    },
    cellClassName: {
        type: [String, Function] as PropType<string | ((rowData: object, index: number, column: TableColumn) => string)>
    },
    virtual: Boolean,
    hideHead: Boolean,
    shadow: {
        type: Boolean,
        default: true
    },
    scrollBar: {
        type: Object as PropType<Partial<ScrollBarProps> & Record<string, any>>,
    },
    sort: {
        type: Object as PropType<Map<keyof any, 'desc' | 'asc' | undefined>>
    },
    sortMode: {
        type: String as PropType<'single' | 'multiple'>,
        default: 'single'
    }
}

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

export default defineComponent({
    name: 'OTable',
    props: dataTableProps,
    emits: {
        rowClick: (rowData: object, index: number) => ((void rowData, index, true)),
        cellClick: (rowData: object, index: number, column: TableColumn) => ((void rowData, index, column, true)),
        'update:selections': (selections: any[]) => ((void selections, true)),
        'update:expands': (expands: any[]) => ((void expands, true)),
        'update:radio': (radio: any) => ((void radio, true)),
        'update:sort': (sort: Map<keyof any, 'desc' | 'asc' | undefined>) => ((void sort, true)),
        sort: (prop: keyof any, way: 'desc' | 'asc' | undefined, allSort: Map<keyof any, 'desc' | 'asc' | undefined>) => ((void prop, void way, void allSort, true))
    },
    setup(props, { emit, slots }) {
        const { basic, of, is } = useNamespace('table')

        const tableRef = ref<HTMLDivElement>()
        const headRef = ref<HTMLDivElement>()
        const footRef = ref<HTMLDivElement>()
        const virtualRef = ref<InstanceType<typeof VirtualList>>()

        const scrollElement = computed(() => {
            if (props.virtual) {
                return virtualRef.value?.itemsElRef?.parentNode as HTMLDivElement
            } 
                return tableRef.value
            
        })
        const { arrivedState, x } = useScroll(scrollElement)

        /** sync scroll */
        watch(x, () => {
            if (headRef.value) headRef.value.scrollLeft = x.value
            if (footRef.value) footRef.value.scrollLeft = x.value
        })

        /**
         * selectionsStart
         */
        const selectionsRef = ref<any[]>([])
        const selections = useAutoControl(selectionsRef, props, 'selections', emit, {
            deep: true,
            passive: true
        })
        const selectionsSet = computed(() => new Set(selections.value))
        /**
         * Expose method
         */
        const getSelectionsRows = () => {
            if (!props.rowKey) return selections.value
            const selectionsSet = new Set(selections.value)
            return props.data?.filter(item => {
                if (!props.rowKey) return false
                return selectionsSet.has(item[props.rowKey])
            }) || []
        }

        const radioRef = ref<any>()
        const radio = useAutoControl(radioRef, props, 'radio', emit)

        const expandsRef = ref<any[]>([])
        const expands = useAutoControl(expandsRef, props, 'expands', emit, {
            deep: true,
            passive: true
        })

        const sortRef = ref<Map<keyof any, 'desc' | 'asc' | undefined>>(new Map())
        const sortMap = useAutoControl(sortRef, props, 'sort', emit, {
            deep: true,
            passive: true
        })
        const flatting = (final: any[], childrenField: string, columns: any[], level = 0) => {
            columns?.forEach(item => {
                final.push({
                    ...item,
                    [childLevel]: level,
                    [origin]: item
                })
                const key = props.rowKey ? item[props.rowKey] : item
                if (item[childrenField] && Array.isArray(item[childrenField]) && expands.value?.includes(key)) {
                    flatting(final, childrenField, item[childrenField], level + 1)
                }
            })
        }
        const dataFlat = computed(() => {
            const { data, childrenField } = props
            const final: any[] = []
            const dataCopy = data ? [...data] : []
            if (sortMap.value?.size) {
                const columnsSortWay = new Map<keyof any, boolean | ((a: unknown, b: unknown) => number) | 'remote'>()
                columnsCollect.value.childrenColumns.forEach(item => {
                    if (item.prop && item.sortable) columnsSortWay.set(item.prop, item.sortable)
                })
                dataCopy.sort((a, b) => {
                    if (!sortMap.value) return 0
                    for (const sorting of sortMap.value) {
                        const sortWay = columnsSortWay.get(sorting[0])
                        if (sortWay === 'remote') continue
                        if (typeof sortWay === 'function') {
                            const result = sortWay(a, b)
                            if (result !== 0) return result
                        } else {
                            const aValue = getTextByProp(a, sorting[0])
                            const bValue = getTextByProp(b, sorting[0])
                            if (aValue === bValue) continue
                            if (sorting[1] === 'desc') return aValue > bValue ? -1 : 1
                            return aValue < bValue ? -1 : 1
                        }
                    }
                    return 0
                })
            }
            flatting(final, childrenField, dataCopy)
            return final
        })

        const deepCopy = (columns?: TableColumn[]) => {
            if (!columns) return []
            return columns.map(column => {
                const copyColumn = { ...column }
                if (copyColumn.children && copyColumn.children.length > 0) {
                    copyColumn.children = deepCopy(copyColumn.children)
                }
                return copyColumn
            })
        }

        const columnsCollect = computed(() => {
            const columns = deepCopy(props.columns)
            const renderColumns: TableColumn[][] = []
            const childrenColumns: TableColumn[] = []

            const lastColumnsChildren = columns[columns.length - 1].children
            if (lastColumnsChildren && lastColumnsChildren.length > 0) {
                setNoBorder(lastColumnsChildren)
            }
            columns[columns.length - 1][noBorder] = true

            getColSpanByColumn(columns, childrenColumns, renderColumns)

            const maxLength = renderColumns.length

            childrenColumns.forEach(column => {
                column[rowSpan] = maxLength - (column[childLevel] || 0)
            })

            const fixedLeftColumns: TableColumn[] = []
            const fixedRightColumns: TableColumn[] = []
            for (const column of childrenColumns) {
                if (column.fixed === true || column.fixed === 'left') {
                    fixedLeftColumns.push(column)
                }
                if (column.fixed === 'right') {
                    fixedRightColumns.unshift(column)
                }
            }
            calcFixedPosition(fixedLeftColumns)
            calcFixedPosition(fixedRightColumns)
            if (fixedRightColumns.length > 0) fixedRightColumns[fixedRightColumns.length - 1][firstRight] = true
            if (fixedLeftColumns.length > 0) fixedLeftColumns[fixedLeftColumns.length - 1][lastLeft] = true

            return {
                childrenColumns,
                renderColumns
            }
        })

        const top = ref(0)

        const checkAll = computed({
            get() {
                if (!props.data || props.data.length === 0) return false
                return props.data.every(item => {
                    const key = props.rowKey ? item[props.rowKey] : item
                    return selectionsSet.value.has(key)
                })
            },
            set(value) {
                if (!props.data) return
                if (!Array.isArray(selections.value)) selections.value = []
                if (!value) {
                    selections.value = []
                    return
                }
                const selectionsSet = new Set(selections.value)
                props.data.forEach(item => {
                    const key = props.rowKey ? item[props.rowKey] : item
                    selectionsSet.add(key)
                })
                selections.value = Array.from(selectionsSet)
            }
        })

        const getTrClass = (column: TableColumn) => getClass(column, of, arrivedState, props.shadow)
        const TdRender = (column: TableColumn, index: number, data: any) => {
            let insideText: any = ''
            const rowKey = props.rowKey ? data[props.rowKey] : undefined
            const key = rowKey ?? data[origin]
            switch (column.type) {
                case 'index':
                    insideText = String(index + 1)
                    break
                case 'selection': case 'checkbox':
                    insideText = (
                        <Checkbox
                            modelValue={selections.value && selections.value.includes(key)}
                            onUpdate:modelValue={selection => {
                                if (!Array.isArray(selections.value)) selections.value = []
                                if (selection) {
                                    selections.value.push(key)
                                } else {
                                    selections.value.splice(selections.value.indexOf(key), 1)
                                }
                            }}
                        />
                    )
                    break
                case 'radio':
                    insideText = (
                        <Radio
                            modelValue={radio.value === key}
                            onUpdate:modelValue={value => {
                                if (value) {
                                    radio.value = key
                                } else {
                                    radio.value = undefined
                                }
                            }}
                        />
                    )
                    break
                default:
                    insideText = getTextByProp(data, column.prop)
                    insideText = insideText && String(insideText)
            }
            insideText = slots[`table-${String(column.prop) || ''}`]?.({ column, row: data, index }) ?? insideText
            const ellipsisProps = typeof column.ellipsis === 'boolean' ? {} : column.ellipsis
            const content = (
                column.ellipsis ? (
                    <Ellipsis {...ellipsisProps}>
                        {insideText}
                    </Ellipsis>
                ) : insideText
            )
            return (
                <td
                    class={[
                        of('cell'),
                        getTrClass(column),
                        typeof props.cellClassName === 'string' ? props.cellClassName : props.cellClassName?.(data, index, column),
                        column.className,
                        {
                            [is('sort')]: column.prop && sortMap.value?.get(column.prop)
                        }
                    ]}
                    style={getStyle(column)}
                    key={column.prop}
                    colspan={column.colSpan?.(data, index)}
                    rowspan={column.rowSpan?.(data, index)}
                    onClick={() => emit('cellClick', data, index, column)}
                >
                    {column.indent ? (
                        <>
                            {
                                data[props.childrenField] && data[props.childrenField].length > 0 && (
                                    <Icon
                                        onClick={() => {
                                            if (!expands.value) expands.value = []
                                            if (expands.value.includes(key)) {
                                                expands.value.splice(expands.value.indexOf(key), 1)
                                            } else {
                                                expands.value.push(key)
                                            }
                                        }}
                                        class={[
                                            of('arrow', of('cell')),
                                            {
                                                [of('arrow--active', of('cell'))]: expands.value?.includes(key)
                                            }
                                        ]}
                                    >
                                        <ChevronForward />
                                    </Icon>
                                )
                            }
                            {
                                new Array(data[childLevel] || 0).fill('').map(() => (
                                    <span class={of('cell-indent')} />
                                ))
                            }
                            {content}
                        </>
                    ) : content}
                </td>
            )
        }

        const width = computed(() => addUnit(props.scrollWidth))

        const Empty = computed(() => {
            if (dataFlat.value && dataFlat.value.length > 0) return
            return (
                <div
                    class={of('empty')}
                    style={{
                        width: width.value
                    }}
                >
                    {slots.empty?.() ?? '暂无数据'}
                </div>
            )
        })

        const Colgroup = computed(() => (
            <colgroup>
                {columnsCollect.value.childrenColumns.map(column => (
                    <col style={{ width: column.width ? addUnit(column.width) : column.fixed ? '100px' : undefined, minWidth: addUnit(column.minWidth) }} />
                ))}
            </colgroup>
        ))

        return {
            basic,
            of,
            is,
            getStyle,
            getTrClass,
            columnsCollect,
            tableRef,
            checkAll,
            arrivedState,
            selections,
            TdRender,
            dataFlat,
            top,
            virtualRef,
            headRef,
            footRef,
            width,
            getSelectionsRows,
            sortMap,
            Empty,
            Colgroup
        }
    },
    render() {
        const TbodyRender = () => {
            const TbodyTrs = (row: any, index: number) => (
                <tr
                    key={this.rowKey ? row[this.rowKey] : index}
                    class={typeof this.rowClassName === 'string' ? this.rowClassName : this.rowClassName?.(row, index)}
                    onClick={() => this.$emit('rowClick', row, index)}
                >
                    {this.columnsCollect.childrenColumns.map(column => this.TdRender(column, index, row))}
                </tr>
            )
            const style = {
                width: this.width
            }
            if (!this.virtual) {
                return (
                    <div class={this.of('outer')} ref="tableRef">
                        {this.Empty}
                        {
                            h(DataTableRender as any, {
                                childrenColumns: this.columnsCollect.childrenColumns,
                                style
                            }, {
                                default: () => this.dataFlat?.map(TbodyTrs)
                            })
                        }
                    </div>
                )
            } 
                return (
                    h(VirtualList as any, {
                        visibleItemsTag: DataTableRender,
                        itemSize: this.itemHeight,
                        class: [
                            this.of('outer')
                        ],
                        items: this.dataFlat,
                        keyField: this.rowKey,
                        visibleItemsProps: {
                            childrenColumns: this.columnsCollect.childrenColumns
                        },
                        itemsStyle: style,
                        ref: 'virtualRef',
                        itemResizable: true
                    }, {
                        default: ({ item: row, index }: { item: TableColumn, index: number }) => TbodyTrs(row, index),
                        empty: () => this.Empty
                    })
                )
            
        }
        /**
         * Thead 渲染
         */
        const TheadRender = () => {
            if (this.hideHead) return
            const ContentRender = (column: TableColumn) => {
                const sortIs = column.prop ? this.sortMap?.get(column.prop) : undefined
                switch (column.type) {
                    case 'selection':
                        return <Checkbox v-model={this.checkAll} indeterminate={this.selections && this.selections.length !== 0} />
                    default:
                        const Text = this.$slots[`head-${String(column.prop) || ''}`]?.({ column }) ?? column.label
                        const Final: any[] = [Text]
                        const SortIcon = (
                            <Icon
                                class={[
                                    this.of('head-icon'),
                                    {
                                        active: sortIs,
                                        [this.of('head-icon--asc')]: sortIs === 'asc'
                                    }
                                ]}
                            ><ArrowDownOutline /></Icon>
                        )
                        if (column.sortable) {
                            Final.push(SortIcon)
                        }
                        return Final
                }
            }
            /**
             * 列头渲染
             */
            const HeadTrs = (
                this.columnsCollect.renderColumns.map((columns, index) => (
                    <tr key={index}>
                        {
                            columns.map(column => (
                                <th
                                    class={[
                                        this.of('head'),
                                        column.className,
                                        {
                                            'no-border': column[noBorder],
                                            [this.of('head--sortable')]: column.sortable,
                                            [this.is('sort')]: column.prop && this.sortMap?.get(column.prop)
                                        },
                                        this.getTrClass(column)
                                    ]}
                                    style={this.getStyle(column)}
                                    key={column.prop}
                                    colspan={column[colSpan]}
                                    rowspan={column[rowSpan]}
                                    onClick={() => {
                                        if (!column.prop || !column.sortable) return
                                        if (!this.sortMap) this.sortMap = new Map()
                                        const sortIs = this.sortMap.get(column.prop)
                                        if (!sortIs && this.sortMode === 'single') this.sortMap.clear()
                                        if (!sortIs) this.sortMap.set(column.prop, 'desc')
                                        if (sortIs === 'desc') this.sortMap.set(column.prop, 'asc')
                                        if (sortIs === 'asc') this.sortMap.delete(column.prop)
                                        this.$emit('sort', column.prop, this.sortMap.get(column.prop), this.sortMap)
                                    }}
                                >
                                    {ContentRender(column)}
                                </th>
                            ))
                        }
                    </tr>
                ))
            )
            return (
                <div class={this.of('outerhead')} ref="headRef">
                    <table cellspacing="0" class={[this.of('self'), this.of('headself')]} style={{ width: this.width }}>
                        {this.Colgroup}
                        <thead>
                            {HeadTrs}
                        </thead>
                    </table>
                </div>
            )
        }
        const TfootRender = () => {
            if (!this.totalLine) return
            const ContentRender = (column: TableColumn) => {
                switch (column.type) {
                    case 'selection':
                        return <Checkbox v-model={this.checkAll} indeterminate={this.selections && this.selections.length !== 0} />
                    default:
                        return this.$slots[`foot-${String(column.prop) || ''}`]?.({ column }) ?? (column.prop ? this.totalLine?.[column.prop] : '')
                }
            }
            const FootTds = (
                this.columnsCollect.childrenColumns.map(column => (
                    <td
                        class={[
                            this.of('foot'), column.className,
                            {
                                [this.of('foot--fixed')]: this.footFixed,
                                [this.is('sort')]: column.prop && this.sortMap?.get(column.prop)
                            },
                            this.getTrClass(column)
                        ]}
                        style={this.getStyle(column)}
                        key={column.prop}
                    >
                        {ContentRender(column)}
                    </td>
                ))
            )
            return (
                <div class={this.of('outerfoot')} ref="footRef">
                    <table cellspacing="0" class={[this.of('self'), this.of('footself')]} style={{ width: this.width }}>
                        {this.Colgroup}
                        <tfoot>
                            <tr>
                                {FootTds}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )
        }
        return (
            <div
                class={
                    [
                        this.basic,
                        {
                            [this.is('noborder')]: !this.border,
                            [this.is('stripe')]: this.stripe,
                            [this.is('fixed')]: this.fixed,
                            'dark': this.dark
                        }
                    ]
                }
                style={{
                    height: addUnit(this.height)
                }}
            >
                {TheadRender()}
                <ScrollBar {...this.scrollBar}>
                    {TbodyRender}
                </ScrollBar>
                {TfootRender()}
            </div>
        )
    }
})