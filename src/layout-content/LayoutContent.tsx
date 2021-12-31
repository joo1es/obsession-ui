import { defineComponent, ExtractPropTypes } from 'vue'

export const layoutContentProps = {
    padding: String
}

export type LayoutContentProps = ExtractPropTypes<typeof layoutContentProps>

export default defineComponent({
    name: 'OLayoutContent',
    props: layoutContentProps,
    setup(props, { slots }) {
        return () => (
            <div class="o-layout-content" style={{
                padding: props.padding
            }}>
                { slots.default?.() }
            </div>
        )
    }
})
