import { useAutoControl } from '../utils'
import { computed, defineComponent, ExtractPropTypes, PropType, provide, ref, toRef } from 'vue'

import Space, { spaceProps } from '../space'

const radioGroupSelf = {
    modelValue: {
        type: [String, Number, Symbol] as PropType<string | number | symbol>,
        default: undefined
    },
    disabled: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
    }
}

export const radioGroupProps = {
    ...spaceProps,
    ...radioGroupSelf
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export default defineComponent({
    name: 'ORadioGroup',
    props: radioGroupProps,
    emits: {
        'update:modelValue': (value: string | number | symbol) =>  {
            void value
            return true
        }
    },
    setup(props, { slots, emit }) {
        const radioValueRef = ref<string | number | symbol>()
        const radioValue = useAutoControl(radioValueRef, props, 'modelValue', emit)
        provide('o-radio-value', radioValue)
        provide('o-radio-disabled', toRef(props, 'disabled'))
        provide('o-radio-size', toRef(props, 'size'))
        const spacePropsMap = computed(() => {
            const spacePropsTemp: Partial<RadioGroupProps> = { ...props }
            delete spacePropsTemp.modelValue
            delete spacePropsTemp.disabled
            delete spacePropsTemp.size
            return spacePropsTemp
        })
        return () => (
            <Space { ...spacePropsMap.value }>
                { slots.default?.() }
            </Space>
        )
    }
})
