import { ref, computed, defineComponent, ExtractPropTypes, PropType, provide, watch } from 'vue'

import { MenuList, MenuRecord } from './typings'

import MenuItem from './MenuItem'
import Collapse, { CollapseSupport } from '../collapse'
import { useAutoControl } from '../utils'

export const menuProps = {
    vertical: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Symbol, Number] as PropType<CollapseSupport>
    },
    list: {
        type: Array as PropType<MenuList>,
        default: () => []
    },
    unfold: {
        type: Array as PropType<CollapseSupport[]>
    },
    collapse: {
        type: Boolean,
        default: false
    },
    trigger: {
        type: String as PropType<'hover' | 'click'>,
        default: 'hover'
    },
    showArrow: {
        type: Boolean,
        default: true
    },
    width: {
        type: String,
        default: '400px'
    },
    click: Function as PropType<(record?: MenuRecord) => boolean | void>
}
export type MenuProps = ExtractPropTypes<typeof menuProps>

const menuEmits = {
    'update:modelValue': (value: CollapseSupport) => typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol',
    'update:unfold': (value: CollapseSupport[]) => Array.isArray(value)
}

export default defineComponent({
    name: 'OMenu',
    props: menuProps,
    emits: menuEmits,
    setup(props, { emit, slots, attrs }) {
        provide('click', (record: MenuRecord) => props.click?.(record))
        const activeRef = ref<string | null>(null)
        const active = useAutoControl(activeRef, props, 'modelValue', emit)
        provide('active', active)
        const slotsRef = ref(slots)
        provide('slots', slotsRef)
        /**
         * provide unfold
         */
        const items = ref<CollapseSupport[]>([])
        const unfoldItems = useAutoControl(items, props, 'unfold', emit, {
            passive: true,
            deep: true
        })
        provide('unfold', unfoldItems)
        /**
         * provide unfold
         */
        let collapseRecord: CollapseSupport[] = []
        provide('collapse', computed(() => props.collapse))
        watch(() => props.collapse, () => {
            if (props.collapse) {
                collapseRecord = unfoldItems.value || []
                unfoldItems.value = []
            } else {
                if (collapseRecord.length === 0) return
                unfoldItems.value = collapseRecord
                collapseRecord = []
            }
        }, {
            immediate: true
        })
        provide('trigger', computed(() => props.trigger))
        provide('vertical', computed(() => props.vertical))
        provide('showArrow', computed(() => props.showArrow))
        provide('menuStyle', computed(() => attrs.style))
        return () => {
            slotsRef.value = slots
            return (
                <div class={{
                    'o-menu': true,
                    'o-menu__collapse' : props.collapse,
                    'o-menu__row': !props.vertical
                }} style={{
                    maxWidth: !props.collapse && props.vertical ? props.width : '',
                    minWidth: !props.collapse && props.vertical ? props.width : ''
                }}>
                    {
                        props.vertical ? (
                            <Collapse v-model={unfoldItems.value} class="o-menu-collapse">
                                {
                                    props.list.map(item => <MenuItem {...item} />)
                                }
                            </Collapse>
                        ) : props.list.map(item => <MenuItem {...item} />)
                    }
                </div>
            )
        }
    }
})
