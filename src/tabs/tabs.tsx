import { useResizeObserver } from '@vueuse/core'
import { ref, defineComponent, ExtractPropTypes, VNode, PropType, computed, watch, nextTick, onUpdated, onMounted, Transition, CSSProperties } from 'vue'

import Space, { SpaceProps } from '../space'
import XScroll, { XScrollProps } from '../x-scroll'
import Icon from '../icon'
import { CloseSharp } from '@vicons/ionicons5'
import { addUnit, flatten, useAutoControl } from '../utils'

export const tabsProps = {
    modelValue: {
        type: [String, Symbol, Number, Boolean] as PropType<string | symbol | number | boolean>,
        default: undefined
    },
    duration: {
        type: Number,
        default: 300
    },
    spaceProps: {
        type: Object as PropType<SpaceProps & Record<any, any>>
    },
    xScrollProps: {
        type: Object as PropType<XScrollProps & Record<any, any>>
    },
    showLine: {
        type: Boolean,
        default: true
    },
    titleOnly: Boolean,
    closable: Boolean,
    lazy: Boolean,
    card: Boolean,
    lineWidth: {
        type: [String, Number]
    }
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export default defineComponent({
    name: 'OTabs',
    props: tabsProps,
    emits: {
        'update:modelValue': (value: string | symbol | number | boolean) => ((void value, true)),
        'close': (index: string | symbol | number | boolean) => ((void index, true))
    },
    setup(props, { emit }) {
        const activeRef = ref<string | symbol | number | boolean>()
        const active = useAutoControl(activeRef, props, 'modelValue', emit)

        const activeIndex = ref(0)
        const transform = computed(() => `-${activeIndex.value * 100}%`)

        const scrollRef = ref<InstanceType<typeof XScroll> | null>(null)
        const activeTabTitle = ref<null | HTMLDivElement>(null)
        const tabsRef = ref<null | HTMLDivElement>(null)
        const init = ref(false)

        const left = ref(0)
        const width = ref('0px')
        const getLeft = async() => {
            if (!activeTabTitle.value || !props.showLine || props.card) return
            await nextTick()
            if (!activeTabTitle.value) return
            left.value = activeTabTitle.value.offsetLeft + activeTabTitle.value.offsetWidth / 2
            width.value = activeTabTitle.value.offsetWidth + 'px'
            setTimeout(() => {
                init.value = true
            })
        }

        const widthComputed = computed(() => props.lineWidth ? addUnit(props.lineWidth) : width.value)

        watch(() => props.lineWidth, getLeft)
        watch(activeIndex, () => {
            getLeft()
            nextTick(() => {
                if (!scrollRef.value || !activeTabTitle.value) return
                const boundingRect = activeTabTitle.value.getBoundingClientRect()
                const deltaX = boundingRect.x - scrollRef.value.$el.offsetLeft
                if (
                    deltaX < 0 ||
                    scrollRef.value.$el.offsetWidth - deltaX < boundingRect.width
                ) {
                    scrollRef.value?.scrollTo({
                        left: activeTabTitle.value.offsetLeft - scrollRef.value.$el.offsetWidth / 2 + boundingRect.width / 2,
                        behavior: 'smooth'
                    })
                }
            })
        })
        onUpdated(getLeft)
        onMounted(getLeft)

        useResizeObserver(activeTabTitle, getLeft)

        const spaceSize = computed<[string | number, string | number]>(() => {
            if (!props.spaceProps || !props.spaceProps.size) return [props.card ? 0 : 20, 0]
            if (!Array.isArray(props.spaceProps.size)) return [props.spaceProps.size, 0]
            return [props.spaceProps.size[0], 0]
        })

        const propsHandle = (props?: Record<any, any> | null) => {
            if (!props) return {}
            const propsMap = {...props}
            delete propsMap.index
            delete propsMap.closable
            delete propsMap.title
            return propsMap
        }

        return {
            left,
            active,
            activeIndex,
            transform,
            activeTabTitle,
            tabsRef,
            width,
            spaceSize,
            scrollRef,
            widthComputed,
            propsHandle,
            init
        }
    },
    render() {
        const tabs = flatten(this.$slots.default?.() || []).filter(tab => (tab.type as { name?: string }).name === 'OTab')
        const activeIndex = tabs.findIndex((tab, index) => (tab.props?.key || index) === this.active)
        this.activeIndex = this.titleOnly ? activeIndex : (activeIndex > -1 ? activeIndex : 0)
        return (
            <div class={
                ['o-tabs', {
                    'o-tabs--card': this.card
                }]
            } ref="tabsRef" style={{
                '--o-tabs-durtation': `${this.duration / 1000}s`
            } as CSSProperties}>
                <div class="o-tabs--title">
                    <XScroll ref="scrollRef" {...this.xScrollProps}>
                        <Space {...this.spaceProps} wrap={false} size={this.spaceSize} v-slots={{
                            suffix: this.showLine && !this.card ? () => (
                                <div class="o-tabs--line" style={{ left: this.left + 'px', width: this.widthComputed, transition: this.init ? undefined : 'none' }} />
                            ) : undefined
                        }}>
                            { this.$slots?.prefix?.() }
                            {
                                tabs.map((tab, index) => (
                                    <div
                                        class={[
                                            'o-tabs--title--cell',
                                            {
                                                'o-tabs--title--cell--active': index === this.activeIndex
                                            }
                                        ]}
                                        key={tab.props?.key || index}
                                        onClick={() => {
                                            this.active = tab.props?.key || index
                                        }}
                                        onMousedown={e => {
                                            if (typeof tab.props?.closable === 'boolean' ? tab.props?.closable : this.closable) {
                                                if (e.button === 1) {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    this.$emit('close', tab.props?.key || index)
                                                }
                                            }
                                        }}
                                        {...this.propsHandle(tab.props)}
                                        ref={index === this.activeIndex ? 'activeTabTitle' : undefined}
                                    >
                                        {(tab.children as Record<string, ({ active }: { active: boolean }) => VNode>)?.title?.({ active: index === this.activeIndex }) ?? tab.props?.title }
                                        {(typeof tab.props?.closable === 'boolean' ? tab.props?.closable : this.closable) && (
                                            this.$slots.close?.() ?? (
                                                <Icon class="o-tabs--title--cell--close" onClick={e => {
                                                    e.stopPropagation()
                                                    this.$emit('close', tab.props?.key || index)
                                                }}>
                                                    <CloseSharp />
                                                </Icon>
                                            )
                                        ) }
                                    </div>
                                ))
                            }
                            { this.$slots?.suffix?.()}
                        </Space>
                    </XScroll>
                </div>
                {
                    !this.titleOnly && (
                        <div class="o-tabs--content" style={{
                            transform: `translateX(${this.transform})`,
                            transition: this.init ? undefined : 'none'
                        }}>
                            {
                                tabs.map((tab, index) => (
                                    <div class="o-tabs--tab" key={tab.props?.key || index}>
                                        {
                                            this.lazy ? (
                                                <Transition name="o-tabs-fade">
                                                    { index === this.activeIndex ? (
                                                        <div class="o-tabs--tab--content">
                                                            {(tab.children as Record<string, () => VNode>)?.default?.() }
                                                        </div>
                                                    ) : null }
                                                </Transition>
                                            ): (
                                                <Transition name="o-tabs-fade">
                                                    <div class="o-tabs--tab--content" v-show={index === this.activeIndex}>
                                                        {(tab.children as Record<string, () => VNode>)?.default?.() }
                                                    </div>
                                                </Transition>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
})
