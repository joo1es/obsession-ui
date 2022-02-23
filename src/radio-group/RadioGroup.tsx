import { useAutoControl } from '../utils'
import { computed, defineComponent, ExtractPropTypes, PropType, provide, ref, toRef } from 'vue'

import Space, { spaceProps } from '../space'

const radioGroupSelf = {
    modelValue: {
        type: [String, Number, Symbol, Boolean] as PropType<string | number | symbol | boolean>,
        default: undefined
    },
    disabled: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
    },
    spaceSize: spaceProps.size
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
        'update:modelValue': (value: string | number | symbol | boolean) =>  {
            void value
            return true
        }
    },
    setup(props, { slots, emit }) {
        const radioValueRef = ref<string | number | symbol | boolean>()
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
            <Space { ...spacePropsMap.value } size={props.spaceSize}>
                { slots.default?.() }
            </Space>
        )
    }
})
