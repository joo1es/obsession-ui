import { defineComponent, ExtractPropTypes } from 'vue'

export const omitItemProps = {
    omit: Boolean
}

export type OmitItemProps = ExtractPropTypes<typeof omitItemProps>

export default defineComponent({
    name: 'OOmitItem',
    inheritAttrs: false,
    props: omitItemProps,
    render() {
        return (
            <>
                { this.$slots.default?.({ omit: this.omit }) }
            </>
        )
    }
})