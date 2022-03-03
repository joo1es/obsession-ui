import { useAutoControl, addUnit } from '../utils'
import { ref, computed, defineComponent, ExtractPropTypes, CSSProperties, PropType } from 'vue'

export const sliderProps = {
    modelValue: {
        type: [Number, Array] as PropType<number | number[]>
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
        default: 1
    },
    vertical: Boolean,
    height: {
        type: [Number, String],
        default: 100
    },
    reverse: Boolean,
    marks: {
        type: [Object, Array] as PropType<Record<number, string> | number[]>
    },
    showTip: Boolean
}
export type SliderProps = ExtractPropTypes<typeof sliderProps>

export default defineComponent({
    name: 'OSlider',
    props: sliderProps,
    setup(props, { emit }) {
        const dataRef = ref(0)
        const data = useAutoControl(dataRef, props, 'modelValue', emit, { passive: true, deep: true })

        const getCurrentData = (value?: number | number[], type: 'min' | 'max' = 'max') => {
            let currentData = 0
            if (Array.isArray(value)) {
                currentData = Math[type](value[0], value[1])
            } else {
                currentData = value || 0
            }
            return currentData
        }

        const getPercentage = (value?: number | number[], type: 'min' | 'max' = 'max') => (getCurrentData(value, type) - props.min) / (props.max - props.min) * 100

        const percentage = computed(() => getPercentage(data.value))
        const minPercentage = computed(() => getPercentage(data.value, 'min'))

        const currentModel = computed({
            get() {
                return (Array.isArray(data.value) ? data.value[0] : data.value) || 0
            },
            set(value: number) {
                if (Array.isArray(data.value)) {
                    data.value[0] = value
                } else {
                    data.value = Number(value)
                }
            }
        })
        const secondModel = computed({
            get() {
                return (Array.isArray(data.value) ? data.value[1] : 0) || 0
            },
            set(value: number) {
                if (Array.isArray(data.value)) data.value[1] = Number(value)
            }
        })

        const height = computed(() => addUnit(props.height))

        const GetLinearGradient = (gradient: string) => `
            linear-gradient(
                to right,
                ${gradient}
                transparent var(--o-slider--percentage, 0%),  transparent
            )
        `

        const linearGradient = computed(() => {
            if (Array.isArray(data.value)) {
                return GetLinearGradient(`
                    transparent,  transparent var(--o-slider--min-percentage, 0%),
                    var(--o-slider-track-active-background) var(--o-slider--min-percentage, 0%), var(--o-slider-track-active-background) var(--o-slider--percentage, 0%),
                `)
            } 
                return GetLinearGradient(`
                    var(--o-slider-track-active-background), var(--o-slider-track-active-background) var(--o-slider--percentage, 0%),
                `)
            
        })

        const marksMap = computed(() => {
            if (!props.marks) return
            if (Array.isArray(props.marks)) {
                return props.marks.map(mark => [mark, ''])
            } 
                return Object.entries(props.marks)
            
        })

        const calcPercentage = (percentage: number, extra = '') => {
            const startPoint = 'var(--o-slider-thumb-width) / 2'
            const distance = '(100% - var(--o-slider-thumb-width))'
            return `calc(${startPoint} + ${distance} * ${percentage / 100} ${extra})`
        }

        return {
            data,
            percentage,
            height,
            marksMap,
            currentModel,
            secondModel,
            linearGradient,
            minPercentage,
            getPercentage,
            calcPercentage
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
                onTouchstart={e => e.stopPropagation()}
            >
                <input
                    type="range"
                    class={[
                        'o-slider--range'
                    ]}
                    style={{
                        '--o-slider--percentage': `${this.percentage}%`,
                        '--o-slider--min-percentage': `${this.minPercentage}%`,
                        '--o-slider--background-image': this.linearGradient
                    } as CSSProperties}
                    min={this.min}
                    max={this.max}
                    step={this.step}
                    v-model={this.currentModel}
                />
                {
                    this.showTip && !this.vertical && !Array.isArray(this.data) && (
                        <div class="o-slider--tip">
                            <div class="o-slider--tip--content" style={{
                                left: !this.vertical && !this.reverse ? this.calcPercentage(this.percentage) : '',
                                right: !this.vertical && this.reverse ? this.calcPercentage(this.percentage) : '',
                            }}>
                                { this.$slots.tip?.() || this.currentModel }
                            </div>
                        </div>
                    )
                }
                {
                    Array.isArray(this.data) && (
                        <div class="o-slider--second">
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
                                v-model={this.secondModel}
                            />
                        </div>
                    )
                }
                {
                    this.marksMap && (
                        <div class="o-slider--marks">
                            {
                                this.marksMap.map(mark => {
                                    const number = Number(mark[0])
                                    const percentage = this.getPercentage(number)
                                    const active = !Array.isArray(this.data) ? (
                                        !(percentage > this.percentage)
                                    ) : (
                                        !(percentage > this.percentage || percentage < this.minPercentage)
                                    )
                                    const calc = this.calcPercentage(percentage, '- var(--o-slider-mark-width) / 2')
                                    return (
                                        <div
                                            class={[
                                                'o-slider--mark',
                                                {
                                                    'o-slider--mark--active': active
                                                }
                                            ]}
                                            key={mark[0]}
                                            style={{
                                                left: !this.reverse && !this.vertical ? calc : '',
                                                right: this.reverse && !this.vertical ? calc : '',
                                                bottom: this.reverse && this.vertical ? this.calcPercentage(percentage, '- var(--o-slider-mark-width) / 2') : '',
                                                top: !this.reverse && this.vertical ? this.calcPercentage(percentage, '- var(--o-slider-mark-width) / 2') : ''
                                            } as CSSProperties}
                                        >
                                            {
                                                mark[1] && !this.vertical && <div class="o-slider--mark--text">{mark[1]}</div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        )
    }
})
