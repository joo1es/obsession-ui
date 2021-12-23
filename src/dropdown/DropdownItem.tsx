import {
    ref,
    computed,
    defineComponent,
    PropType,
    Component,
    h,
    inject,
    ComputedRef,
    Ref
} from 'vue'

import { DropdownRecord } from './typings'
import Icon from '../icon'
import Popover, { PopoverProps, PopoverPlacement } from '../popover'

import DropdownItem from './DropdownItem'

import { RightOutlined } from '@vicons/antd'

const PopoverMap = Popover

export default defineComponent({
    name: 'ODropdownItem',
    props: {
        index: {
            type: [String, Symbol, Number] as PropType<string | symbol | number>
        },
        title: String,
        click: Function as PropType<(record?: DropdownRecord) => void>,
        groupName: String,
        disabled: Boolean,
        divided: Boolean,
        children: {
            type: Array as PropType<DropdownRecord[]>
        },
        icon: Object as PropType<Component>
    },
    setup(props, { slots }) {
        const popoverProps = inject<ComputedRef<Partial<PopoverProps> & Record<string, any>>>('o-popover-props')
        const subMenuPlacement = inject<ComputedRef<PopoverPlacement>>('o-dropdown-sub-menu-placement', computed(() => 'right'))
        const popoverClose = inject<() => void>('o-popover-close')
        const dropdownClick = inject<(record?: DropdownRecord) => void>('o-dropdown-click')
        const popoverShow = ref(false)
        const parentSlot = inject<typeof slots>('o-dropdown-parent-slot')
        const showArrow = inject<Ref<boolean>>('o-dropdown-show-arrow')
        return () => {
            const DropdownItemRaw = (
                <div class={{
                    'o-dropdown-item': true,
                    'o-dropdown-item__disabled': props.disabled,
                    'o-dropdown-item__divided': props.divided && !props.groupName,
                    'o-dropdown-item__with-arrow': showArrow?.value && props.children && props.children.length > 0
                }} onClick={() => {
                    if (props.disabled) return
                    if (!props.children || props.children.length === 0) popoverClose?.()
                    if (!props.click?.(props)) {
                        dropdownClick?.(props)
                    }
                }}>
                    {
                        props.icon ? (
                            <Icon class="o-dropdown-item__icon">{ h(props.icon) }</Icon>
                        ) : null
                    }
                    { slots.title?.() || props.title }
                    {
                        showArrow?.value && props.children && props.children.length > 0 ? (
                            <Icon class="o-dropdown-item__arrow"><RightOutlined /></Icon>
                        ) : null
                    }
                </div>
            )
            return (
                <>
                    {
                        props.groupName ? (
                            <div class={{
                                'o-dropdown-group': true,
                                'o-dropdown-item__divided': props.divided
                            }}>
                                { parentSlot?.group?.(props) || props.groupName }
                            </div>
                        ) : null
                    }
                    {
                        props.children && props.children.length > 0 ? (
                            <PopoverMap
                                arrow={false}
                                popoverClass="o-dropdown-popover"
                                trigger="hover"
                                { ...popoverProps?.value }
                                to={false}
                                modelValue={popoverShow.value}
                                onUpdate:modelValue={(value: boolean) => {
                                    if (props.disabled) return
                                    popoverShow.value = value
                                }}
                                placement={subMenuPlacement.value}
                                v-slots={{
                                    target: () => DropdownItemRaw,
                                    default: () => (
                                        props.children?.map(item => (
                                            <DropdownItem { ...item } v-slots={{
                                                title: () => parentSlot?.title?.(item) || item.title
                                            }} />
                                        ))
                                    )
                                }}
                            />
                        ) : DropdownItemRaw
                    }
                </>
            )
        }
    }
})
