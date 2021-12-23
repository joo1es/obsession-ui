import { defineComponent, PropType, Component, inject, Ref, computed, watch, ComputedRef, ref, provide, h, CSSProperties } from 'vue'
import { MenuList, MenuRecord } from './typings'
import MenuItem from './MenuItem'
import CollapseItem from '../collapse-item'
import type { CollapseSupport } from '../collapse'
import Popover from '../popover'
import Tooltip from '../tooltip'
import Icon from '../icon'
import { RightOutlined } from '@vicons/antd'

export default defineComponent({
    name: 'OMenuItem',
    props: {
        index: {
            type: [String, Symbol, Number] as PropType<CollapseSupport>,
            required: true
        },
        title: String,
        icon: {
            type: [Object, String] as PropType<Component | string>,
            default: undefined
        },
        children: {
            type: Array as PropType<MenuList>,
            default: () => []
        },
        isChild: Boolean,
        disabled: Boolean,
        info: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({})
        },
        groupName: String
    },
    setup(props, { slots }) {
        const clickMethod = inject<(record: MenuRecord) => void>('click')
        const parentSlots = inject<Ref<typeof slots>>('slots')
        const active = inject<Ref<CollapseSupport>>('active')
        const popoverShow = ref(false)
        let closeParent = () => {}
        if (!props.isChild) {
            provide('o-popover-show', popoverShow)
        } else {
            const parentPopoverShow = inject<Ref<boolean>>('o-popover-show')
            closeParent = () => {
                if (parentPopoverShow) parentPopoverShow.value = false
            }
        }
        /**
         * CollapseItem 是否是激活项
         */
        const isActive = (list: MenuRecord) => {
            if (list.children && list.children?.length > 0) {
                for (const item of list.children) {
                    if (isActive(item)) return true
                }
                return false
            } 
            return list.index === active?.value
            
        }
        const collapseActive = computed(() => {
            if (props.children?.length > 0) {
                return props.children.some(item => isActive(item))
            } 
            return false
            
        })

        const vertical = inject<ComputedRef<boolean>>('vertical')

        const unfold = inject<Ref<CollapseSupport[]>>('unfold')
        watch(collapseActive, () => {
            if (unfold && collapseActive.value && vertical?.value) {
                if (!unfold.value.includes(props.index)) unfold.value.push(props.index)
            }
        }, {
            immediate: true
        })

        const collapse = inject<ComputedRef<boolean>>('collapse')
        watch(() => collapse?.value, () => {
            closeParent()
        })
        const trigger = inject<ComputedRef<'click' | 'hover'>>('trigger')
        const arrow = inject<ComputedRef<boolean>>('showArrow')
        const menuStyle = inject<ComputedRef<CSSProperties>>('menuStyle')
        return () => {
            const Title = (
                <>
                    {
                        props.icon ? (
                            <div class="o-menu-item__icon">
                                <Icon name={typeof props.icon === 'string' ? props.icon : undefined} v-slots={{
                                    default: () => typeof props.icon !== 'string' ? h(props.icon as any) : ''
                                }} />
                            </div>
                        ) : null
                    }
                    {
                        !props.isChild && props.icon && collapse?.value && vertical?.value ? null : (
                            <div class="o-menu-item__text">
                                {
                                    parentSlots?.value?.title?.(props) || props.title
                                }
                            </div>
                        )
                    }
                </>
            )
            const TitleBox = (needClick = true, isActive = false, showArrow = false) => {
                const TitleRaw = (
                    <div
                        class={{
                            'o-menu-item-title': true,
                            'o-menu-item__active': isActive || active?.value === props.index,
                            'o-menu-item__diabled': props.disabled,
                            'o-menu-item__with-arrow': showArrow && arrow?.value
                        }}
                        onClick={() => {
                            if (props.disabled || !needClick) return
                            closeParent()
                            const afterClick = clickMethod?.(props)
                            if (!afterClick && active) active.value = props.index
                        }}
                    >
                        { Title }
                        {
                            showArrow && arrow?.value ? (
                                <div class='o-menu-item__arrow'>
                                    <Icon>
                                        { () => h(RightOutlined) }
                                    </Icon>
                                </div>
                            ) : null
                        }
                    </div>
                )
                return vertical?.value && collapse?.value && needClick && !props.isChild ? (
                    <Tooltip trigger={trigger?.value || 'hover'} placement={'right'} popoverClass={'o-menu-tooltip'} v-slots={{
                        title: () => parentSlots?.value?.title?.(props) || props.title,
                        default: () => TitleRaw
                    }} />
                ) : TitleRaw
            }
            return (
                <>
                    {
                        props.groupName && ( vertical?.value || props.isChild ) ? (
                            <div class="o-menu-item-group">
                                { props.groupName }
                            </div>
                        ) : null
                    }
                    <div class="o-menu-item">
                        {
                            props.children?.length > 0 ? (
                                collapse?.value || !vertical?.value ? (
                                    <Popover
                                        v-slots={{
                                            target: () => TitleBox(false, collapseActive.value, props.isChild)
                                        }}
                                        placement={vertical?.value || props.isChild ? 'right' : 'bottom-start'}
                                        to={props.isChild ? false : undefined}
                                        arrow={false}
                                        v-model={popoverShow.value}
                                        trigger={trigger?.value || 'hover'}
                                        popoverClass={'o-menu-popover'}
                                        popoverStyle={menuStyle?.value}
                                    >
                                        { props.children?.map(item => (
                                            <MenuItem {...item} isChild={true} />
                                        )) || '' }
                                    </Popover>
                                ) : (
                                    <CollapseItem
                                        name={props.index}
                                        class={{
                                            'o-menu-item__active': collapseActive.value || active?.value === props.index,
                                            'o-menu-item__diabled': props.disabled
                                        }}
                                        onClickTitle={() => clickMethod?.(props)}
                                        v-slots={{
                                            title: () => Title
                                        }}
                                        disabled={props.disabled}
                                        showArrow={arrow?.value}
                                    >
                                        { props.children?.map(item => (
                                            <MenuItem {...item} isChild={true} />
                                        )) }
                                    </CollapseItem>
                                )
                            ) : TitleBox()
                        }
                    </div>
                </>
            )
        }
    }
})
