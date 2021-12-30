import { defineComponent, PropType, provide, ref } from 'vue'

import type { ExtractPropTypes } from 'vue'
import { useAutoControl } from '../utils'

export type CollapseSupport = string | number | symbol;
export const collapseProps = {
    modelValue: {
        type: [String, Number, Symbol, Array] as PropType<
      CollapseSupport | CollapseSupport[]
    >,
    },
}

export const collapseEmits = {
    'update:modelValue': (value: CollapseSupport | CollapseSupport[]) => {
        const type = typeof value
        return (
            ['string', 'number', 'symbol'].includes(type) || Array.isArray(value)
        )
    },
    change: (value?: CollapseSupport | CollapseSupport[]) => {
        if (typeof value === 'undefined') return true
        const type = typeof value
        return (
            ['string', 'number', 'symbol'].includes(type) || Array.isArray(value)
        )
    },
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;
export type CollapseEmits = typeof collapseEmits;

export default defineComponent({
    name: 'OCollapse',
    props: collapseProps,
    emits: collapseEmits,
    setup(props, { slots, emit }) {
        /**
         * 非受控模式，使用 ref 管理 collapseItems
         */
        const collapseItems = ref<CollapseSupport[]>([])

        provide(
            'collapseItems',
            useAutoControl(collapseItems, props, 'modelValue', emit)
        )
        provide(
            'update:collapseItems',
            (value: CollapseSupport | CollapseSupport[]) => {
                if (collapseItems.value !== value) emit('change', value)
                if (typeof props.modelValue === 'undefined' && Array.isArray(value)) {
                    collapseItems.value = value
                } else {
                    emit('update:modelValue', value)
                }
            }
        )
        return () => <div class="o-collapse">{slots.default?.()}</div>
    },
})
