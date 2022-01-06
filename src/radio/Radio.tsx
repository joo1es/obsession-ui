import { useAutoControl } from '../utils'
import {
    computed,
    ref,
    inject,
    defineComponent,
    type ExtractPropTypes,
    type PropType,
    type Ref
} from 'vue'
import Icon from '../icon'
import { CheckmarkSharp } from '@vicons/ionicons5'

export const radioProps = {
    modelValue: {
        type: Boolean,
        default: undefined
    },
    value: {
        type: [String, Number, Symbol] as PropType<string | number | symbol>
    },
    label: {
        type: String
    },
    disabled: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>
    },
    borderRadius: {
        type: String,
        default: '50%'
    }
}

export type RadioProps = ExtractPropTypes<typeof radioProps>

export default defineComponent({
    name: 'ORadio',
    props: radioProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean'
    },
    setup(props, { slots, emit }) {
        const checkedRef = ref(false)
        const checkedControl = useAutoControl(checkedRef, props, 'modelValue', emit)
        const checkedValue = inject<Ref<string | number | symbol> | false>(
            'o-radio-value',
            false
        )
        const checked = computed<boolean>({
            get() {
                if (checkedValue) {
                    return checkedValue.value === props.value
                } 
                    return Boolean(checkedControl.value)
                
            },
            set(value) {
                if (checkedValue) {
                    if (!props.value) return
                    checkedValue.value = props.value
                } else {
                    checkedControl.value = value
                }
            }
        })
        /**
         * disabled
         */
        const disabledInject = inject<Ref<boolean>>('o-radio-disabled', ref(false))
        const disabled = computed(() => disabledInject.value || props.disabled)
        const sizeInject = inject<Ref<boolean> | false>('o-radio-size', false)
        return () => (
            <div
                class={{
                    'o-radio': true,
                    'o-radio__checked': checked.value,
                    'o-radio__disabled': disabled.value,
                    [`o-radio__${props.size ? props.size : ( sizeInject ? sizeInject.value : 'default' )}`]: true
                }}
                tabindex={!disabled.value ? 0 : undefined}
                onClick={() => {
                    if (disabled.value) return
                    checked.value = !checked.value
                }}
                onKeydown={e => {
                    if ((e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space')) {
                        e.preventDefault()
                        checked.value = !checked.value
                    }
                }}
            >
                <div
                    class={{
                        'o-radio--box': true,
                        'checked': checked.value
                    }}
                    style={{
                        borderRadius: props.borderRadius
                    }} 
                >
                    {
                        checked.value ? (
                            <Icon>
                                {
                                    slots.checked?.() || <CheckmarkSharp />
                                }
                            </Icon>
                        ) : slots.unchecked?.()
                    }
                </div>
                {
                    slots.default || props.label ? (
                        <span class={'o-radio--label'}>
                            { slots.default?.() || props.label }
                        </span>
                    ) : null
                }
            </div>
        )
    }
})
