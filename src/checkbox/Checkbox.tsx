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

import { CheckmarkSharp, RemoveSharp } from '@vicons/ionicons5'

export const checkboxProps = {
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
    indeterminate: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>
    },
    borderRadius: {
        type: String,
        default: '2px'
    }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export default defineComponent({
    name: 'OCheckbox',
    props: checkboxProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean'
    },
    setup(props, { slots, emit }) {
        const checkedRef = ref(false)
        const checkedControl = useAutoControl(checkedRef, props, 'modelValue', emit)
        const checkedList = inject<Ref<(string | number | symbol)[]> | false>(
            'o-checkbox-list',
            false
        )
        const checked = computed<boolean>({
            get() {
                if (checkedList) {
                    return Boolean(props.value && checkedList.value.includes(props.value))
                } 
                    return Boolean(checkedControl.value)
                
            },
            set(value) {
                if (checkedList) {
                    if (!props.value) return
                    const index = checkedList.value.indexOf(props.value)
                    if (value) {
                        if (index > -1) return
                        checkedList.value.push(props.value)
                    } else {
                        checkedList.value.splice(index, 1)
                    }
                } else {
                    checkedControl.value = value
                }
            }
        })
        /**
         * disabled
         */
        const disabledInject = inject<Ref<boolean>>('o-checkbox-disabled', ref(false))
        const disabled = computed(() => disabledInject.value || props.disabled)
        const sizeInject = inject<Ref<boolean> | false>('o-checkbox-size', false)
        return () => (
            <div
                class={{
                    'o-checkbox': true,
                    'o-checkbox__checked': checked.value || props.indeterminate,
                    'o-checkbox__disabled': disabled.value,
                    [`o-checkbox__${props.size ? props.size : ( sizeInject ? sizeInject.value : 'default' )}`]: true
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
                        'o-checkbox--box': true,
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
                        ) : (
                            props.indeterminate ? (
                                <Icon>
                                    {
                                        slots.indeterminate?.() || <RemoveSharp />
                                    }
                                </Icon>
                            ) : slots.unchecked?.()
                        )
                    }
                </div>
                {
                    slots.default || props.label ? (
                        <span class={'o-checkbox--label'}>
                            { slots.default?.() || props.label }
                        </span>
                    ) : null
                }
            </div>
        )
    }
})
