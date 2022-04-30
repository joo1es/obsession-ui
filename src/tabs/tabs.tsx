import { useResizeObserver } from '@vueuse/core'
import { ref, defineComponent, type ExtractPropTypes, VNode, PropType, computed, watch, nextTick, onUpdated, onMounted, Transition, CSSProperties, onActivated } from 'vue'

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
        type: Object as PropType<Partial<SpaceProps> & Record<any, any>>
    },
    xScrollProps: {
        type: Object as PropType<Partial<XScrollProps> & Record<any, any>>
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
    },
    swipeAnimation: {
        type: Boolean,
        default: true
    },
    position: {
        type: String as PropType<'top' | 'left' | 'bottom' | 'right' | 'none'>,
        default: 'top'
    }
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export default defineComponent({
    name: 'OTabs',
    props: tabsProps,
    emits: {
        'update:modelValue': (value: string | symbol | number | boolean) => ((void value, true)),
        'close': (index: string | symbol | number | boolean) => ((void index, true)),
        'change': (index: string | symbol | number | boolean) => ((void index, true))
    },
    setup(props, { emit }) {
        const activeRef = ref<string | symbol | number | boolean>()
        const active = useAutoControl(activeRef, props, 'modelValue', emit)

        const activeIndex = ref(0)
        const transform = computed(() => `-${activeIndex.value * 100}%`)
        const init = ref(false)

        const scrollRef = ref<InstanceType<typeof XScroll> | null>(null)
        const activeTabTitle = ref<null | HTMLDivElement>(null)
        const tabsTitle = ref<null | HTMLDivElement>(null)
        const tabsRef = ref<null | HTMLDivElement>(null)

        const left = ref(0)
        const width = ref('0px')
        const getLeft = async() => {
            setTimeout(() => {
                init.value = true
            })
            if (!activeTabTitle.value || !props.showLine || props.card) return
            await nextTick()
            if (!activeTabTitle.value) return
            if (props.position === 'top' || props.position === 'bottom') {
                const leftValue = activeTabTitle.value.offsetLeft + activeTabTitle.value.offsetWidth / 2
                const widthValue = activeTabTitle.value.offsetWidth
                if (leftValue && widthValue) {
                    left.value = leftValue
                    width.value = widthValue + 'px'
                }
            } else {
                const leftValue = activeTabTitle.value.offsetTop + activeTabTitle.value.offsetHeight / 2
                const widthValue = activeTabTitle.value.offsetHeight
                if (leftValue && widthValue) {
                    left.value = leftValue
                    width.value = widthValue + 'px'
                }
            }
        }

        const widthComputed = computed(() => props.lineWidth ? addUnit(props.lineWidth) : width.value)

        const scrollToView = () => {
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
        }

        watch(() => props.lineWidth, getLeft)
        watch(activeIndex, () => {
            getLeft()
            nextTick(scrollToView)
        })
        onUpdated(getLeft)
        onMounted(() => {
            getLeft()
            scrollToView()
        })
        onActivated(() => {
            init.value = false
            setTimeout(() => {
                init.value = true
            })
        })

        useResizeObserver(activeTabTitle, getLeft)
        useResizeObserver(tabsTitle, getLeft)

        const spaceSize = computed<[string | number, string | number]>(() => {
            if (props.position === 'top' || props.position === 'bottom') {
                if (!props.spaceProps || !props.spaceProps.size) return [props.card ? 0 : 20, 0]
                if (!Array.isArray(props.spaceProps.size)) return [props.spaceProps.size, 0]
                return [props.spaceProps.size[0], 0]
            } 
            if (!props.spaceProps || !props.spaceProps.size) return [0, props.card ? 0 : 15]
            if (!Array.isArray(props.spaceProps.size)) return [0, props.spaceProps.size]
            return [0, props.spaceProps.size[1]]
        })

        const propsHandle = (props?: Record<any, any> | null) => {
            if (!props) return {}
            const propsMap = {...props}
            delete propsMap.index
            delete propsMap.closable
            delete propsMap.title
            delete propsMap.disabled
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
            init,
            update: getLeft,
            scrollToView,
            tabsTitle
        }

    },
    render() {
        const tabs = flatten(this.$slots.default?.() || []).filter(tab => (tab.type as { name?: string }).name === 'OTab')
        if (this.active === undefined && !this.titleOnly) {
            this.active = tabs[0]?.props?.index || 0
        }
        const activeIndex = tabs.findIndex((tab, index) => (tab.props?.index || index) === this.active)
        this.activeIndex = this.titleOnly ? activeIndex : (activeIndex > -1 ? activeIndex : 0)

        const TitleCellsRender = (vertical = false) => (
            <Space {...this.spaceProps} wrap={false} size={this.spaceSize} vertical={vertical} v-slots={{
                suffix: this.showLine && !this.card ? () => (
                    <div class="o-tabs--line" style={{ [vertical ? 'top' : 'left']: this.left + 'px', [vertical ? 'height' : 'width']: this.widthComputed, transition: this.init ? undefined : 'none' }} />
                ) : undefined
            }}>
                { this.$slots?.prefix?.() }
                {
                    tabs.map((tab, index) => (
                        <div
                            class={[
                                'o-tabs--title--cell',
                                {
                                    'o-tabs--title--cell--active': index === this.activeIndex,
                                    'o-tabs--title--cell--disabled': tab.props?.disabled || tab.props?.disabled === ''
                                }
                            ]}
                            key={tab.props?.index || index}
                            onClick={() => {
                                if (tab.props?.disabled || tab.props?.disabled === '') return
                                this.active = tab.props?.index || index
                                this.$emit('change', tab.props?.index || index)
                            }}
                            onMousedown={e => {
                                if (typeof tab.props?.closable === 'boolean' ? tab.props?.closable : this.closable) {
                                    if (e.button === 1) {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        this.$emit('close', tab.props?.index || index)
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
                                        this.$emit('close', tab.props?.index || index)
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
        )

        const TitleRender = (
            <div class="o-tabs--title" ref="tabsTitle">
                <XScroll ref="scrollRef" {...this.xScrollProps}>
                    { TitleCellsRender() }
                </XScroll>
            </div>
        )

        const TitleVerticalRender = (
            <div class="o-tabs--title" ref="tabsTitle">
                {TitleCellsRender(true)}
            </div>
        )

        return (
            <div class={
                [
                    'o-tabs',
                    `o-tabs--${this.position}`,
                    {
                        'o-tabs--card': this.card
                    }
                ]
            } ref="tabsRef" style={{
                '--o-tabs-durtation': `${this.duration / 1000}s`
            } as CSSProperties}>
                { this.position === 'top' && TitleRender }
                { this.position === 'left' && TitleVerticalRender }
                <div class="o-tabs--wrapper">
                    {
                        !this.titleOnly && (
                            <div class="o-tabs--content" style={{
                                transform: `translateX(${this.transform})`,
                                transition: this.init && this.swipeAnimation ? undefined : 'none'
                            }}>
                                {
                                    tabs.map((tab, index) => (
                                        <div class="o-tabs--tab" key={tab.props?.index || index}>
                                            {
                                                this.lazy ? (
                                                    <Transition name={this.swipeAnimation ? 'o-tabs-fade' : undefined}>
                                                        { index === this.activeIndex ? (
                                                            <div class="o-tabs--tab--content">
                                                                {(tab.children as Record<string, () => VNode>)?.default?.() }
                                                            </div>
                                                        ) : null }
                                                    </Transition>
                                                ): (
                                                        <Transition name={this.swipeAnimation ? 'o-tabs-fade' : undefined}>
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
                {this.position === 'bottom' && TitleRender}
                {this.position === 'right' && TitleVerticalRender}
            </div>
        )
    }
})
