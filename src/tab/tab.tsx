import { defineComponent, ExtractPropTypes, PropType } from 'vue'

export const tabProps = {
    title: String,
    index: {
        type: [String, Symbol, Number, Boolean] as PropType<string | symbol | number | boolean>,
        default: Symbol('index')
    },
    closeable: Boolean
}

export type TabProps = ExtractPropTypes<typeof tabProps>

export default defineComponent({
    name: 'OTab',
    props: tabProps,
    setup() {
    },
    render() {
        this.index
        return this.$slots.default?.()
    }
})
