import { addUnit, useAutoControl } from '../utils'
import { ref, computed, defineComponent, ExtractPropTypes, CSSProperties } from 'vue'

export const sliderProps = {
    modelValue: {
        type: Number
    },
    max: {
        type: Number,
        default: 100
    },
    min: {
        type: Number,
        default: 0
    },
    step: {
        type: Number,
        default: .01
    },
    vertical: Boolean,
    height: {
        type: [Number, String],
        default: 100
    },
    reverse: Boolean
}
export type SliderProps = ExtractPropTypes<typeof sliderProps>

export default defineComponent({
    name: 'OSlider',
    props: sliderProps,
    setup(props, { emit }) {
        const dataRef = ref(0)
        const data = useAutoControl(dataRef, props, 'modelValue', emit, { passive: true, deep: true })

        const percentage = computed(() => (((data.value || 0) - props.min) / (props.max - props.min)) * 100)

        const height = computed(() => addUnit(props.height))

        return {
            data,
            percentage,
            height
        }
    },
    render() {
        return (
            <div
                class={[
                    'o-slider',
                    {
                        'o-slider--vertical': this.vertical,
                        'o-slider--reverse': this.reverse
                    }
                ]}
                style={{
                    '--o-slider--vertical-height': this.vertical ? this.height : ''
                } as CSSProperties}
            >
                <input
                    type="range"
                    class={[
                        'o-slider--range'
                    ]}
                    style={{
                        '--o-slider--percentage': `${this.percentage}%`
                    } as CSSProperties}
                    min={this.min}
                    max={this.max}
                    step={this.step}
                    v-model={this.data}
                    list="tickmarks"
                />
            </div>
        )
    }
})