import {
    ref,
    computed,
    defineComponent,
    type ExtractPropTypes,
    type PropType,
    h,
    watch
} from 'vue'

import { type DataColumn, firstRight, colSpan, childLevel, rowSpan, noBorder, lastLeft } from './typings'
import { getStyle, getColSpanByColumn, calcFixedPosition, getTextByProp, setNoBorder } from './utils'
import { addUnit, useNamespace, useAutoControl } from '../utils'

import Ellipsis from '../ellipsis'
import { useScroll } from '@vueuse/core'
import Checkbox from '../checkbox'
import Radio from '../radio'
import Icon from '../icon'
import VirtualList from '../virtual-list'
import DataTableRender from './Render'
import ScrollBar from '../scroll-bar'

import { ChevronForward } from '@vicons/ionicons5'

export const dataTableProps = {
    columns: {
        type: Array as PropType<DataColumn[]>
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
    expends: {
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
        type: [String, Function] as PropType<string | ((rowData: object, index: number, column: DataColumn) => string)>
    },
    virtual: Boolean,
    hideHead: Boolean,
    shadow: {
        type: Boolean,
        default: true
    }
}

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

export default defineComponent({
    name: 'OTable',
    props: dataTableProps,
    emits: {
        rowClick: (rowData: object, index: number) => ((void rowData, index, true)),
        cellClick: (rowData: object, index: number, column: DataColumn) => ((void rowData, index, column, true)),
        'update:selections': (selections: any[]) => ((void selections, true)),
        'update:expends': (expends: any[]) => ((void expends, true)),
        'update:radio': (radio: any) => ((void radio, true))
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

        const expendsRef = ref<any[]>([])
        const expends = useAutoControl(expendsRef, props, 'expends', emit, {
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
                if (item[childrenField] && Array.isArray(item[childrenField]) && expends.value?.includes(key)) {
                    flatting(final, childrenField, item[childrenField], level + 1)
                }
            })
        }
        const dataFlat = computed(() => {
            const { data, childrenField } = props
            const final: any[] = []
            flatting(final, childrenField, data || [])
            return final
        })

        const deepCopy = (columns?: DataColumn[]) => {
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
            const renderColumns: DataColumn[][] = []
            const childrenColumns: DataColumn[] = []

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

            const fixedLeftColumns: DataColumn[] = []
            const fixedRightColumns: DataColumn[] = []
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

        const getClass = (column: DataColumn) => ({
            [of('cell--fixed')]: column.fixed,
            [of('cell--fixed--left')]: column.fixed === true || column.fixed === 'left',
            [of('cell--fixed--right')]: column.fixed === 'right',
            [of('shadow--left')]: props.shadow && column.fixed === 'right' && column[firstRight] && !arrivedState.right,
            [of('shadow--right')]: props.shadow && (column.fixed === 'left' || column.fixed === true) && column[lastLeft] && !arrivedState.left
        })

        const checkAll = computed({
            get() {
                if (!props.data || props.data.length === 0) return false
                const selectionsSet = new Set(selections.value || [])
                return props.data.every(item => {
                    const key = props.rowKey ? item[props.rowKey] : item
                    return selectionsSet.has(key)
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

        const TdRender = (column: DataColumn, index: number, data: any) => {
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
                        getClass(column),
                        typeof props.cellClassName === 'string' ? props.cellClassName : props.cellClassName?.(data, index, column),
                        column.className
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
                                            if (!expends.value) expends.value = []
                                            if (expends.value.includes(key)) {
                                                expends.value.splice(expends.value.indexOf(key), 1)
                                            } else {
                                                expends.value.push(key)
                                            }
                                        }}
                                        class={[
                                            of('arrow', of('cell')),
                                            {
                                                [of('arrow--active', of('cell'))]: expends.value?.includes(key)
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

        return {
            basic,
            of,
            is,
            getStyle,
            getClass,
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
            getSelectionsRows
        }
    },
    render() {
        const Colgroup = (
            <colgroup>
                {this.columnsCollect.childrenColumns.map(column => (
                    <col style={{ width: column.width ? addUnit(column.width) : column.fixed ? '100px' : undefined, minWidth: addUnit(column.minWidth) }} />
                ))}
            </colgroup>
        )
        const Empty = !this.dataFlat || this.dataFlat.length === 0 && (
            <div class={this.of('empty')} style={{
                width: this.width
            }}>
                {this.$slots.empty?.() ?? '暂无数据'}
            </div>
        )
        const Tbody = !this.virtual ? (
            <div class={this.of('outer')} ref="tableRef">
                {Empty}
                {
                    h(DataTableRender as any, {
                        childrenColumns: this.columnsCollect.childrenColumns,
                        style: {
                            width: this.width
                        }
                    }, {
                        default: () => (
                            <>
                                {
                                    this.dataFlat?.map((row, index) => (
                                        <tr
                                            key={this.rowKey ? row[this.rowKey] : index}
                                            class={typeof this.rowClassName === 'string' ? this.rowClassName : this.rowClassName?.(row, index)}
                                            onClick={() => this.$emit('rowClick', row, index)}
                                        >
                                            {
                                                this.columnsCollect.childrenColumns.map(column => this.TdRender(column, index, row))
                                            }
                                        </tr>
                                    ))
                                }
                            </>
                        )
                    })
                }
            </div>
        ) : (
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
                itemsStyle: {
                    width: this.width
                },
                ref: 'virtualRef',
                itemResizable: true
            }, {
                default: ({ item: row, index }: { item: DataColumn, index: number }) => (
                    <tr
                        class={typeof this.rowClassName === 'string' ? this.rowClassName : this.rowClassName?.(row, index)}
                        onClick={() => this.$emit('rowClick', row, index)}
                    >
                        {
                            this.columnsCollect.childrenColumns.map(column => this.TdRender(column, index, row))
                        }
                    </tr>
                ),
                empty: () => Empty
            })
        )
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
                {
                    !this.hideHead && (
                        <div class={this.of('outerhead')} ref="headRef">
                            <table cellspacing="0" class={[this.of('self'), this.of('headself')]} style={{ width: this.width }}>
                                {Colgroup}
                                <thead>
                                    {
                                        this.columnsCollect.renderColumns.map((columns, index) => (
                                            <tr key={index}>
                                                {
                                                    columns.map(column => (
                                                        <th
                                                            class={[this.of('head'), column.className, {
                                                                'no-border': column[noBorder]
                                                            }, this.getClass(column)]}
                                                            style={this.getStyle(column)}
                                                            key={column.prop}
                                                            colspan={column[colSpan]}
                                                            rowspan={column[rowSpan]}
                                                        >
                                                            {
                                                                (() => {
                                                                    switch (column.type) {
                                                                        case 'selection':
                                                                            return <Checkbox v-model={this.checkAll} indeterminate={this.selections && this.selections.length !== 0} />
                                                                        default:
                                                                            return this.$slots[`head-${String(column.prop) || ''}`]?.({ column }) ?? column.label
                                                                    }
                                                                })()
                                                            }
                                                        </th>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </thead>
                            </table>
                        </div>
                    )
                }
                <ScrollBar>
                    {Tbody}
                </ScrollBar>
                {
                    this.totalLine && (
                        <div class={this.of('outerfoot')} ref="footRef">
                            <table cellspacing="0" class={[this.of('self'), this.of('footself')]} style={{ width: this.width }}>
                                <tfoot>
                                    <tr>
                                        {
                                            this.columnsCollect.childrenColumns.map(column => (
                                                <td
                                                    class={[this.of('foot'), column.className, {
                                                        [this.of('foot--fixed')]: this.footFixed,
                                                    }, this.getClass(column)]}
                                                    style={this.getStyle(column)}
                                                    key={column.prop}
                                                >
                                                    {
                                                        (() => {
                                                            switch (column.type) {
                                                                case 'selection':
                                                                    return <Checkbox v-model={this.checkAll} indeterminate={this.selections && this.selections.length !== 0} />
                                                                default:
                                                                    return this.$slots[`foot-${String(column.prop) || ''}`]?.({ column }) ?? (column.prop ? this.totalLine?.[column.prop] : '')
                                                            }
                                                        })()
                                                    }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )
                }
            </div>
        )
    }
})