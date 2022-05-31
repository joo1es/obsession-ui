import { addUnit, useAutoControl } from '../utils'
import { computed, CSSProperties, defineComponent, ExtractPropTypes, PropType, ref, watch } from 'vue'

export const switchProps = {
    modelValue: null,
    activeValue: {
        type: null as unknown as PropType<any>,
        default: true
    },
    inactiveValue: {
        type: null as unknown as PropType<any>,
        default: false
    },
    activeColor: String,
    inactiveColor: String,
    activeText: String,
    inactiveText: String,
    width: {
        type: [String, Number]
    },
    height: {
        type: [String, Number]
    },
    borderRadius: {
        type: [String, Number]
    },
    disabled: Boolean
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export default defineComponent({
    name: 'OSwitch',
    props: switchProps,
    emits: {
        'update:modelValue': (value?: any) => ((void value, true)),
        'change': (value?: any) => ((void value, true))
    },
    setup(props, { emit }) {
        const modelRef = ref<any>(false)
        const model = useAutoControl(modelRef, props, 'modelValue', emit)

        const active = computed(() => model.value === props.activeValue)

        watch(model, () => {
            emit('change', model.value)
        })

        return {
            model,
            active
        }
    },
    render() {
        return (
            <div
                class={[
                    'o-switch',
                    {
                        'o-switch--active': this.active,
                        'o-switch--disabled': this.disabled
                    }
                ]}
                style={{
                    '--o-switch-active-color': this.activeColor || undefined,
                    '--o-switch-inactive-color': this.inactiveColor || undefined,
                    '--o-switch-width': addUnit(this.width) || undefined,
                    '--o-switch-height': addUnit(this.height) || undefined,
                    '--o-switch-border-radius': addUnit(this.borderRadius) || undefined
                } as CSSProperties}
                onClick={() => {
                    if (this.disabled) return
                    if (this.model === this.activeValue) {
                        this.model = this.inactiveValue
                    } else {
                        this.model = this.activeValue
                    }
                }}
            >
                <div class="o-switch--button" />
                {
                    (this.activeText || this.inactiveText) ? (
                        <div class="o-switch--text">
                            {this.active ? (this.$slots.activeText?.() ?? this.activeText) : (this.$slots.inactiveText?.() ?? this.inactiveText) }
                        </div>
                    ) : null
                }
            </div>
        )
    }
})
