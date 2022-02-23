import { useAutoControl } from '../utils'
import { computed, defineComponent, ExtractPropTypes, PropType, provide, ref, toRef } from 'vue'

import Space, { spaceProps } from '../space'

const checkboxGroupSelf = {
    modelValue: {
        type: Array as PropType<(string | number | symbol | boolean)[]>,
        default: undefined
    },
    disabled: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
    },
    spaceSize: spaceProps.size
}

export const checkboxGroupProps = {
    ...spaceProps,
    ...checkboxGroupSelf
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export default defineComponent({
    name: 'OCheckboxGroup',
    props: checkboxGroupProps,
    emits: {
        'update:modelValue': (value: (string | number | symbol | boolean)[]) =>  Array.isArray(value)
    },
    setup(props, { slots, emit }) {
        const checkboxListRef = ref<(string | number | symbol | boolean)[]>([])
        const checkboxList = useAutoControl(checkboxListRef, props, 'modelValue', emit, {
            passive: true,
            deep: true
        })
        provide('o-checkbox-list', checkboxList)
        provide('o-checkbox-disabled', toRef(props, 'disabled'))
        provide('o-checkbox-size', toRef(props, 'size'))
        const spacePropsMap = computed(() => {
            const spacePropsTemp: Partial<CheckboxGroupProps> = { ...props }
            delete spacePropsTemp.modelValue
            delete spacePropsTemp.disabled
            delete spacePropsTemp.size
            return spacePropsTemp
        })
        return () => (
            <Space  { ...spacePropsMap.value } size={props.spaceSize}>
                { slots.default?.() }
            </Space>
        )
    }
})
