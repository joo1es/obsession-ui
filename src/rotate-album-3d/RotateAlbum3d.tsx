import { useNamespace } from '../utils'
import {
    defineComponent,
    type PropType,
    type ExtractPropTypes
} from 'vue'

export const rotateAlbum3dProps = {
    list: Array as PropType<any[]>,
    xDeg: String,
    size: {
        type: Number,
        default: 300
    },
    duration: {
        type: Number,
        default: 20
    },
    hoverToStop: {
        type: Boolean,
        default: true
    }
}

export type RotateAlbum3dProps = ExtractPropTypes<typeof rotateAlbum3dProps>

export default defineComponent({
    name: 'ORotateAlbum3d',
    props: rotateAlbum3dProps,
    setup() {
        const { basic, of, is } = useNamespace('rotate-album-3d')

        return {
            basic,
            of,
            is
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
                    '--x-deg': this.xDeg,
                    '--duration': `${this.duration}s`
                }}
            >
                {
                    this.list?.map((item, index) => (
                            <div
                                key={index}
                                class={this.of('cell')}
                                style={{
                                    transform: `rotateY(${360 / (this.list?.length || 0) * (index + 1)}deg) translateZ(${this.size}px)`
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