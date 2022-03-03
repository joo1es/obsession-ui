import { ref, defineComponent, PropType, Component, ExtractPropTypes, watch } from 'vue'
import OInput from '../input'
import Icon from '../icon'
import { ChevronUp, ChevronDown, Add, Remove } from '@vicons/ionicons5'
import { useAutoControl } from '../utils'

export const inputNumberProps = {
    modelValue: {
        type: Number as PropType<number>
    },
    disabled: Boolean,
    readonly: Boolean,
    suffix: Object as PropType<Component>,
    prefix: Object as PropType<Component>,
    size: {
        type: String as PropType<'small' | 'default' | 'medium' | 'large'>,
        default: 'default'
    },
    autofocus: Boolean,
    tabindex: {
        type: [String, Number]
    },
    name: String,
    min: Number,
    max: Number,
    step: {
        type: Number,
        default: 1
    },
    stepStrictly: Boolean,
    controls: {
        type: [Boolean, String] as PropType<boolean | 'right' | 'both'>,
        default: true
    },
    precision: {
        type: Number
    },
    placeholder: {
        type: String,
        default: '请输入'
    }
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export default defineComponent({
    name: 'OInputNumber',
    props: inputNumberProps,
    emits: {
        'update:modelValue': (value?: number) => {
            void value
            return true
        },
        'blur': (e: Event) => {
            void e
            return true
        },
        'focus': (e: Event) => {
            void e
            return true
        },
        'change': (e: Event) => {
            void e
            return true
        }
    },
    setup(props, { emit }) {
        const valueRef = ref<number>()
        const model = useAutoControl(valueRef, props, 'modelValue', emit)

        const value = ref(model.value)

        watch(model, () => {
            if (model.value === undefined) {
                value.value = undefined
                return
            }
            if (props.max && model.value > props.max) model.value = props.max
            if (props.min && model.value < props.min) model.value = props.min
            value.value = model.value
        }, {
            immediate: true
        })

        const changeByStep = (add = true, e: Event) => {
            e.preventDefault()
            if (props.readonly || props.disabled) return
            if (add) {
                value.value = (value.value || 0) + props.step
            } else {
                value.value = (value.value || 0) - props.step
            }
            model.value = value.value
        }

        return {
            value,
            model,
            changeByStep
        }
    },
    render() {
        return (
            <div class={[
                'o-input-number',
                {
                    'o-input-number--controls-right': this.controls === 'right' || this.controls === true,
                    'o-input-number--controls-both': this.controls === 'both'
                }
            ]}>
                {
                    this.controls === 'both' && (
                        <button class="o-input-number--control o-input-number--control-left" onClick={(e) => this.changeByStep(false, e)}>
                            <Icon><Remove/></Icon>
                        </button>
                    )
                }
                <OInput
                    type="number"
                    modelValue={String(this.value)}
                    onUpdate:modelValue={value => {
                        this.value = Number(value)
                    }}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    clearable={false}
                    suffix={this.suffix}
                    prefix={this.prefix}
                    size={this.size}
                    autofocus={this.autofocus}
                    tabindex={this.tabindex}
                    name={this.name}
                    min={this.min}
                    max={this.max}
                    placeholder={this.placeholder}
                    step={this.stepStrictly ? this.step : undefined}
                    onBlur={e => this.$emit('blur', e)}
                    onFocus={e => this.$emit('focus', e)}
                    onChange={e => {
                        const delta = (this.value || 0) - (this.model || 0)
                        if (this.precision !== undefined) {
                            this.value = Number((this.value || 0).toFixed(this.precision))
                        }
                        if (!this.stepStrictly || delta % this.step === 0) {
                            this.model = this.value
                            this.$emit('change', e)
                        } else if (delta !== 0) {
                            const valueMore = (this.value || 0) + this.step - delta % this.step
                            const valueLess = (this.value || 0) - this.step - delta % this.step
                            const deltaMore = Math.abs(valueMore - (this.value || 0))
                            const deltaLess = Math.abs(valueLess - (this.value || 0))
                            if (deltaMore >= deltaLess) {
                                this.value = valueLess
                            } else {
                                this.value = valueMore
                            }
                            this.model = this.value
                            this.$emit('change', e)
                        }
                    }}
                    v-slots={this.$slots}
                />
                {
                    this.controls === 'right' || this.controls === true && (
                        <div class="o-input-number--controls">
                            <button class="o-input-number--control" onClick={(e) => this.changeByStep(true, e)}>
                                <Icon><ChevronUp/></Icon>
                            </button>
                            <button class="o-input-number--control" onClick={(e) => this.changeByStep(false, e)}>
                                <Icon><ChevronDown /></Icon>
                            </button>
                        </div>
                    )
                }
                {
                    this.controls === 'both' && (
                        <button class="o-input-number--control o-input-number--control-right" onClick={(e) => this.changeByStep(true, e)}>
                            <Icon><Add/></Icon>
                        </button>
                    )
                }
            </div>
        )
    }
})