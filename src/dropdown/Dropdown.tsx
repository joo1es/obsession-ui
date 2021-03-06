import { ref, computed, defineComponent, ExtractPropTypes, PropType, provide } from 'vue'

import Popover, { PopoverProps, PopoverPlacement } from '../popover'

import type { DropdownRecord } from './typings'
import DropdownItem from './DropdownItem'

import { useAutoControl } from '../utils'

export const dropdownProps = {
    modelValue: {
        type: Boolean,
        default: undefined
    },
    popover: {
        type: Object as PropType<Partial<PopoverProps> & Record<string, any>>,
        default: () => ({})
    },
    rootPopover: {
        type: Object as PropType<Partial<PopoverProps> & Record<string, any>>,
        default: () => ({})
    },
    list: {
        type: Array as PropType<DropdownRecord[]>,
        default: () => []
    },
    subMenuPlacement: {
        type: String as PropType<PopoverPlacement>,
        default: 'right'
    },
    showArrow: {
        type: Boolean,
        default: true
    }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export default defineComponent({
    name: 'ODropdown',
    inheritAttrs: false,
    props: dropdownProps,
    emits: {
        'update:modelValue': (value: boolean) => typeof value === 'boolean',
        'click': null
    },
    setup(props, { slots, emit, attrs }) {
        const showRef = ref(false)
        const show = useAutoControl(showRef, props, 'modelValue', emit)
        provide('o-dropdown-sub-menu-placement', computed(() => props.subMenuPlacement))
        provide('o-popover-props', computed(() => props.popover))
        provide('o-popover-close', () => {
            show.value = false
        })
        provide('o-dropdown-click', (record?: DropdownRecord) => {
            emit('click', record)
        })
        provide('o-dropdown-parent-slot', slots)
        provide('o-dropdown-show-arrow', computed(() => props.showArrow))
        const classComputedRef = computed(() => {
            if (!props.popover.popoverClass) return 'o-dropdown-popover'
            if (typeof props.popover.popoverClass === 'string') {
                return `o-dropdown-popover ${props.popover.popoverClass}`
            } 
            return {
                'o-dropdown-popover': true,
                ...props.popover.popoverClass
            }
        })
        return () => (
            <Popover
                arrow={false}
                placement="bottom"
                trigger="hover"
                { ...props.popover }
                { ...props.rootPopover }
                popoverClass={classComputedRef.value}
                v-model={show.value}
                v-slots={{
                    target: () => (
                        slots.default?.()
                    ),
                    default: () => (
                        <div class="o-dropdown" { ...attrs }>
                            {
                                props.list.map(item => (
                                    <DropdownItem { ...item } v-slots={{
                                        title: () => slots.title?.(item) || item.title
                                    }} />
                                ))
                            }
                        </div>
                    )
                }}
            />
        )
    }
})
