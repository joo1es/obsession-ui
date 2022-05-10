import { useNamespace } from '../utils'
import { computed, defineComponent, ExtractPropTypes } from 'vue'

export const aspectRatioProps = {
    ratio: {
        type: Number,
        default: 1
    }
}

export type AspectRatioProps = ExtractPropTypes<typeof aspectRatioProps>

export default defineComponent({
    name: 'OAspectRatio',
    props: aspectRatioProps,
    setup(props) {
        const { basic, of } = useNamespace('aspect-ratio')
        const paddingTop = computed(() => `${1 / props.ratio * 100}%`)

        return {
            basic,
            of,
            paddingTop
        }
    },
    render() {
        return (
            <div class={this.basic}>
                <div class={this.of('fill')} style={{ paddingTop: this.paddingTop }} />
                <div class={this.of('content')}>
                    {this.$slots.default?.()}
                </div>
            </div>
        )
    }
})
