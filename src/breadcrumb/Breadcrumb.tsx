import { defineComponent, ExtractPropTypes, PropType, VNode } from 'vue'

import Space, { SpaceProps } from '../space'

import { RouteLocationRaw, RouterLink } from 'vue-router'

export interface BreadcrumbRecord {
    index?: string | number | symbol,
    title?: string | VNode
    to?: RouteLocationRaw,
    replace?: boolean
}

export const breadcrumbProps = {
    list: {
        type: Array as PropType<BreadcrumbRecord[]>,
        default: () => []
    },
    separator: {
        type: [String, Object] as PropType<string | VNode>,
        default: '/'
    },
    spaceProps: {
        type: Object as PropType<Partial<SpaceProps> & Record<string, any>>,
        default: () => ({})
    }
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export default defineComponent({
    name: 'OBreadcrumb',
    props: breadcrumbProps,
    emits: {
        click: (item: BreadcrumbRecord) => {
            void item
            return true
        }
    },
    setup(props, { slots, emit }) {
        return () => (
            <Space class="o-breadcrumb" align="center" { ...props.spaceProps }>
                {
                    props.list.map((item, index) => (
                        <>
                            <div class="o-breadcrumb-item" onClick={() => {
                                emit('click', item)
                            }}>
                                {
                                    slots.item?.(item) || (
                                        item.to ? (
                                            <RouterLink to={item.to} replace={item.replace}>
                                                { item.title }
                                            </RouterLink>
                                        ) : item.title
                                    )
                                }
                            </div>
                            {
                                index !== props.list.length - 1 ? (
                                    <div class="o-breadcrumb-separator">
                                        {slots.separator?.() || props.separator }
                                    </div>
                                ) : null
                            }
                        </>
                    ))
                }
            </Space>
        )
    }
})
