import { useNamespace } from '../utils'
import {
    ref,
    provide,
    inject,
    computed,
    defineComponent,
    type CSSProperties,
    type ExtractPropTypes,
    type InjectionKey
} from 'vue'
import { useElementSize, useFullscreen } from '@vueuse/core'

export const containProps = {
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 },
    background: { type: String },
    blur: Boolean,
    dev: Boolean,
    backgroundToFullscreen: Boolean
}

export type ContainProps = ExtractPropTypes<typeof containProps>

export interface ContainStyle {
    fixed: boolean,
    width: number,
    height: number,
    left: number,
    top: number,
    right: number,
    bottom: number
}

function getPercentage(total: number, value?: number) {
    if (!value) return
    return `${(value / total * 100)}%`
}
export function getStyle(style: CSSProperties & Partial<ContainStyle>, dev = false, width = 1920, height = 1080) {
    return {
        outline: dev ? 'red dashed 5px' : undefined,
        position: style.fixed ? 'fixed' : 'absolute',
        ...style,
        width: getPercentage(width, style.width),
        height: getPercentage(height, style.height),
        left: getPercentage(width, style.left),
        right: getPercentage(width, style.right),
        top: getPercentage(height, style.top),
        bottom: getPercentage(height, style.bottom)
    } as CSSProperties
}

export const containInjectKey: InjectionKey<typeof getStyle> = Symbol('contain')
export const useGetStyle = () => inject(containInjectKey, getStyle)

export default defineComponent({
    name: 'OContain',
    props: containProps,
    setup(props) {
        const { basic, of } = useNamespace('contain')
        const containRef = ref<HTMLDivElement>()
        const { width, height } = useElementSize(containRef)
        const { toggle } = useFullscreen(containRef)

        const scale = computed(() => Math.min(width.value / props.width, height.value / props.height))

        function getComponentStyle(style: CSSProperties & Partial<ContainStyle>, dev?: boolean, width?: number, height?: number) {
            return getStyle(style, dev ?? props.dev, width ?? props.width, height ?? props.height)
        }

        provide(containInjectKey, getStyle)

        return {
            basic,
            of,
            containRef,
            scale,
            getStyle: getComponentStyle,
            toggleFullscreen: toggle
        }
    },
    render() {
        return (
            <div ref="containRef" class={this.basic}>
                {
                    this.blur && this.background && (
                        <div
                            class={[this.of('background'), { blur: this.blur }]}
                            style={{ background: this.background }}
                            onDblclick={() => {
                                if (this.backgroundToFullscreen) this.toggleFullscreen()
                            }}
                        />
                    )
                }
                <div
                    class={this.of('wrapper')}
                    style={{
                        width: this.width + 'px',
                        height: this.height + 'px',
                        transform: `scale(${this.scale})`,
                        background: this.background
                    }}
                >
                    { this.$slots.default?.({ getStyle: this.getStyle }) }
                </div>
            </div>
        )
    }
})