import { defineComponent, ExtractPropTypes } from 'vue'

export const layoutAsideProps = {
    width: [String, Number],
    height: [String, Number],
    padding: String
}

export type LayoutAsideProps = ExtractPropTypes<typeof layoutAsideProps>

export default defineComponent({
    name: 'OLayoutAside',
    props: layoutAsideProps,
    setup(props, { slots }) {
        return () => (
            <div class="o-layout-aside" style={{
                width: typeof props.width === 'number' ? `${props.width}px` : props.width,
                height: typeof props.height === 'number' ? `${props.height}px` : props.height,
                padding: props.padding
            }}>
                {slots.default?.()}
            </div>
        )
    }
})