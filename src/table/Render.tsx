import { useNamespace, addUnit } from '../utils'
import { defineComponent, PropType, ref } from 'vue'
import { DataColumn } from './typings'

export default defineComponent({
    props: {
        colgroup: null,
        childrenColumns: {
            type: Array as PropType<DataColumn[]>
        }
    },
    emits: {
        'update:checkAll': (val: boolean) => {
            void val
            return true
        }
    },
    setup() {
        const { of } = useNamespace('table')

        const tableRef = ref<HTMLTableElement>()

        return {
            of,
            tableRef
        }
    },
    render() {
        return (
            <table cellspacing="0" class={this.of('self')} ref="tableRef">
                <colgroup>
                    {this.childrenColumns?.map(column => (
                        <col style={{ width: addUnit(column.width), minWidth: addUnit(column.minWidth) }} />
                    ))}
                </colgroup>
                <tbody>
                    {this.$slots.default?.()}
                </tbody>
            </table>
        )
    }
})