import { useElementSize } from '@vueuse/core'
import { useNamespace } from '../utils'
import {
    ref,
    computed,
    defineComponent,
    type PropType,
    type ExtractPropTypes
} from 'vue'

export const rotateAlbumProps = {
    list: Array as PropType<any[]>,
    duration: {
        type: Number,
        default: 20
    },
    hoverToStop: {
        type: Boolean,
        default: true
    },
    showPath: Boolean,
    pathColor: {
        type: String,
        default: 'red'
    },
    pathWidth: {
        type: Number,
        default: 2
    }
}

export type RotateAlbumProps = ExtractPropTypes<typeof rotateAlbumProps>

export default defineComponent({
    name: 'ORotateAlbum',
    props: rotateAlbumProps,
    setup() {
        const { basic, of, is } = useNamespace('rotate-album')

        const elementRef = ref()
        const { width, height } = useElementSize(elementRef)

        const path = computed(() => 
            /**
             * M 起点 (0, 0)
             * a 椭圆弧
             */
             `M0 ${height.value / 2} a${width.value / 2} ${height.value / 2} 0 1 0 ${width.value} 0 a${width.value / 2} ${height.value / 2} 0 1 0 -${width.value} 0z`
        )

        return {
            basic,
            of,
            is,
            elementRef,
            path,
            width,
            height
        }
    },
    render() {
        return (
            <div
                class={[
                    this.basic,
                    {
                        [this.is('hover-to-stop')]: this.hoverToStop
                    }
                ]}
                style={{
                    '--duration': `${this.duration}s`,
                    '--offset-path': `path("${this.path}")`,
                }}
                ref='elementRef'
            >
                {
                    this.showPath && (
                        <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} class={this.of('path')}>
                            <path d={this.path} stroke={this.pathColor} stroke-width={this.pathWidth} fill="none" />
                        </svg>
                    )
                }
                {
                    this.list?.map((item, index) => (
                            <div
                                key={index}
                                class={this.of('cell')}
                                style={{
                                    animationDelay: `-${this.duration / (this.list?.length ?? 0) * index}s`
                                }}
                            >
                                { this.$slots.default?.({ item }) }
                            </div>
                        ))
                }
            </div>
        )
    }
})