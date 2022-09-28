import { useResizeObserver, useTemplateRefsList } from '@vueuse/core'
import { useNamespace, useAutoControl } from '../utils'
import Icon from '../icon'
import {
    computed,
    defineComponent,
    h,
    onMounted,
    onUpdated,
    reactive,
    ref,
    type Component,
    type ExtractPropTypes,
    type PropType
} from 'vue'

export interface SegmentedOption {
    label?: string,
    value: keyof any,
    className?: string,
    icon?: Component,
    disabled?: boolean
}

export const segmentedProps = {
    options: {
        type: Array as PropType<(keyof any | SegmentedOption)[]>
    },
    modelValue: {
        type: [String, Number, Symbol] as PropType<keyof any>,
        default: undefined
    },
    block: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
    },
    disabled: Boolean,
    switch: Boolean
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>

export default defineComponent({
    name: 'OSegmented',
    props: segmentedProps,
    emits: {
        'update:modelValue': (value: keyof any) => ((void value, true)),
        'change': (value?: keyof any) => ((void value, true))
    },
    setup(props, { emit }) {
        const { basic, of, is } = useNamespace('segmented')

        const activeRef = ref<keyof any>()
        const active = useAutoControl(activeRef, props, 'modelValue', emit)
        const navRef = ref<HTMLElement>()

        const standardOptions = computed(() => props.options?.map(item => {
                if (typeof item === 'object') {
                    return item
                } 
                    return {
                        label: String(item),
                        value: item
                    } as SegmentedOption
                
            }) ?? [] as SegmentedOption[])

        const thumbRef = ref<HTMLDivElement>()
        const itemsRef = useTemplateRefsList<HTMLDivElement>()
        const position = reactive({
            width: 0,
            top: 0,
            left: 0
        })
        function setThumbPosition() {
            if (!thumbRef.value) return
            const activeIndex = standardOptions.value.findIndex(item => item.value === active.value)
            if (activeIndex < 0) return
            const activeItemRef = itemsRef.value[activeIndex]
            position.top = activeItemRef.offsetTop
            position.left = activeItemRef.offsetLeft
            position.width = activeItemRef.offsetWidth
        }

        useResizeObserver(navRef, setThumbPosition)

        onMounted(setThumbPosition)
        onUpdated(setThumbPosition)

        return {
            basic,
            of,
            is,
            standardOptions,
            active,
            thumbRef,
            itemsRef,
            position,
            navRef
        }
    },
    render() {
        return (
            <nav class={[this.basic, this.is(this.size), { [this.is('block')]: this.block }]} ref="navRef">
                <div class={ this.of('content') }>
                    <div class={ this.of('items') }>
                        {
                            this.standardOptions.map(item => (
                                this.$slots.item?.(item) ?? (
                                    <div
                                        class={[
                                            this.of('item'),
                                            item.className,
                                            {
                                                [this.is('active', this.of('item'))]: this.active === item.value,
                                                [this.is('disabled', this.of('item'))]: this.disabled || item.disabled
                                            }
                                        ]}
                                        ref={this.itemsRef.set}
                                        onClick={() => {
                                            if (this.disabled || item.disabled) return
                                            if (this.switch && this.active === item.value) {
                                                if (this.standardOptions.length === 1) return
                                                let currentIndex = index
                                                while(true) {
                                                    if (currentIndex === this.standardOptions.length - 1) {
                                                        currentIndex = 0
                                                    } else {
                                                        currentIndex += 1
                                                    }
                                                    if (!this.standardOptions[currentIndex].disabled) {
                                                        this.active = this.standardOptions[currentIndex].value
                                                        this.$emit('change', this.active)
                                                        break
                                                    }
                                                    if (currentIndex === index) break
                                                }
                                            } else {
                                                this.active = item.value
                                                this.$emit('change', this.active)
                                            }
                                        }}
                                    >
                                        {
                                            item.icon && (
                                                <Icon class={this.of('item-icon')}>
                                                    { h(item.icon) }
                                                </Icon>
                                            )
                                        }
                                        <span class={this.of('item-label')}>
                                            { this.$slots.label?.(item) ?? item.label }
                                        </span>
                                    </div>
                                )
                            ))
                        }
                        <div class={ this.of('thumb') } ref="thumbRef" style={{ top: `${this.position.top}px`, left: `${this.position.left}px`, width: `${this.position.width}px` }} />
                    </div>
                </div>
            </nav>
        )
    }
})
