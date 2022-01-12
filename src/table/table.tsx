import { defineComponent, ExtractPropTypes } from 'vue'

export const tableProps = {
    stripe: Boolean,
    border: Boolean
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export default defineComponent({
    name: 'OTable',
    props: tableProps,
    render() {
        return (
            <div class={'o-table'}>
                <table class={{
                    'o-table--body': true,
                    'o-table--stripe': this.stripe,
                    'o-table--border': this.border
                }}>
                  { this.$slots.default?.() }
                </table>
            </div>
        )
    }
})
