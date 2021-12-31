import { defineComponent, ExtractPropTypes } from 'vue'

export const layoutProps = {
    row: Boolean
}

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export default defineComponent({
    name: 'OLayout',
    props: layoutProps,
    setup(props, { slots }) {
        return () => (
            <div class="o-layout" style={{
                flexDirection: props.row ? 'row' : 'column'
            }}>
                { slots.default?.() }
            </div>
        )
    }
})