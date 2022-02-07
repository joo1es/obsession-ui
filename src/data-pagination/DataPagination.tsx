import { computed, defineComponent, ExtractPropTypes, PropType, VNode, ref } from 'vue'

import Space, { type SpaceProps } from '../space'
import Icon from '../icon'
import Button from '../button'
import Dropdown from '../dropdown'

import { ChevronBack, ChevronForward, ArrowForwardSharp, ArrowBackSharp, ChevronDown } from '@vicons/ionicons5'
import { useAutoControl } from '../utils'

export const dataPaginationProps = {
    layout: {
        type: Array as PropType<('total' | 'prev' | 'pager' | 'next' | 'sizes' | 'jumper' | string)[]>,
        default: () => ['total', 'prev', 'pager', 'next']
    },
    total: {
        type: Number,
        default: 0
    },
    size: Number,
    page: Number,
    pageCount: Number,
    spaceProps: {
        type: Object as PropType<Partial<SpaceProps> & Record<string, any>>
    },
    limit: {
        type: Number,
        default: 2
    },
    sizes: {
        type: Array as PropType<number[]>,
        default: () => [10, 20, 30, 40]
    },
    sizesRender: {
        type: Function as PropType<(size: number) => string | VNode>,
        default: (size: number) => `${size}条/页`
    },
    disabled: Boolean
}

export type DataPaginationProps = ExtractPropTypes<typeof dataPaginationProps>

export default defineComponent({
    name: 'ODataPagination',
    props: dataPaginationProps,
    emits: {
        'update:page': (page: number) => typeof page === 'number',
        'update:size': (total: number) => typeof total === 'number',
        'change': (page: number) => typeof page === 'number',
        'sizeChange': (size: number) => typeof size === 'number'
    },
    expose: ['go'],
    setup(props, { emit }) {
        const pageRefRef = ref(1)
        const pageRef = useAutoControl(pageRefRef, props, 'page', emit)
        const safePage = computed(() => pageRef.value || 1)
        const sizeRefRef = ref(10)
        const sizeRef = useAutoControl(sizeRefRef, props, 'size', emit)
        const safeSize = computed(() => sizeRef.value || 10)
        const count = computed(() => {
            let finalCount = 1
            if (typeof props.pageCount === 'undefined') {
                finalCount = Math.ceil(props.total / safeSize.value)
            } else {
                finalCount = props.pageCount
            }
            return finalCount <= 0 || isNaN(finalCount) ? 1 : finalCount
        })
        const goPage = (page: number | string) => {
            if (typeof page === 'string') {
                page = Number(page)
            }
            if (page === pageRef.value || isNaN(page)) return
            if (page < 1) {
                pageRef.value = 1
                emit('change', pageRef.value)
                return
            }
            if (page > count.value) {
                pageRef.value = count.value
                emit('change', pageRef.value)
                return
            }
            pageRef.value = page
            emit('change', pageRef.value)

        }
        const sizesList = computed(() => props.disabled ? undefined : props.sizes.map(size => ({
            index: size,
            title: props.sizesRender(size),
            disabled: size === safeSize.value,
            click: () => {
                sizeRef.value = size
                emit('sizeChange', size)
            }
        })))
        const jumper = ref<string>()
        return {
            count,
            pageRef,
            goPage,
            safePage,
            safeSize,
            sizeRef,
            jumper,
            sizesList,
            go: goPage
        }
    },
    render() {
        /**
         * 渲染
         */
        const totalRender = () => (
            this.$slots.total?.({ total: this.total }) || <span class="o-data-pagination--total">共 {this.total} 项</span>
        )
        const prevRender = () => {
            const click = () => this.goPage(this.safePage - 1)
            const disabled = this.safePage === 1 || this.disabled
            return (
                this.$slots.prev?.({ click, disabled }) || (
                    <Button icon={ChevronBack} size="mini" onClick={click} disabled={disabled} class="o-data-pagination--pager o-data-pagination--prev" />
                )
            )
        }
        const nextRender = () => {
            const click = () => this.goPage(this.safePage + 1)
            const disabled = this.safePage === this.count || this.disabled
            return (
                this.$slots.next?.({ click, disabled }) || (
                    <Button icon={ChevronForward} size="mini" onClick={click} disabled={disabled} class="o-data-pagination--pager o-data-pagination--next" />
                )
            )
        }
        /**
         * 页码渲染
         */
        const pagerRender = () => {
            const pagers: (VNode | VNode[])[] = []
            if (!this.count) return pagers
            for (let i = 1; i <= this.count; i++) {
                if (
                    i === this.count &&
                    this.count > this.limit * 2 &&
                    Math.abs(this.count - 1 - (this.safePage || 1)) > this.limit &&
                    this.limit > 0
                ) {
                    const click = () => this.goPage(this.safePage + this.limit)
                    pagers.push(
                        this.$slots.jumpRight?.({ click, limit: this.limit }) || (
                            <Button size="mini" icon={ArrowForwardSharp} onClick={click} class="o-data-pagination--pager o-data-pagination--jump-right" key={'jump-right'} disabled={this.disabled} />
                        )
                    )
                }
                if (
                    i === 1 ||
                    i === this.count ||
                    (Math.abs(i - (this.safePage || 1)) <= this.limit)
                ) {
                    const click = () => this.goPage(i)
                    pagers.push(
                        this.$slots.pager?.({ page: i, click }) || (
                            <Button
                                size="mini"
                                onClick={click}
                                class={[
                                    'o-data-pagination--pager',
                                    'o-data-pagination--number',
                                    {
                                        'o-data-pagination--pager-active': i === this.safePage
                                    }
                                ]}
                                type={i === this.safePage ? 'primary' : undefined}
                                color={i === this.safePage ? 'var(--o-data-pagination-active-color)' : undefined}
                                key={'page' + i}
                                disabled={this.disabled}
                            >{i}</Button>
                        )
                    )
                }
                if (
                    i === 1 &&
                    this.count > this.limit * 2 &&
                    Math.abs(2 - (this.safePage || 1)) > this.limit &&
                    this.limit > 0
                ) {
                    const click = () => this.goPage(this.safePage - this.limit)
                    pagers.push(
                        this.$slots.jumpLeft?.({ click, limit: this.limit }) || (
                            <Button size="mini" icon={ArrowBackSharp} onClick={click} class="o-data-pagination--pager o-data-pagination--jump-left" key={'jump-left'} disabled={this.disabled} />
                        )
                    )
                }
            }
            return pagers
        }
        /**
        * 尺寸下拉框渲染
        */
        const sizesRender = () => (
            this.$slots.sizes?.({ sizes: this.sizes, size: this.safeSize, render: this.sizesRender }) || (
                <Dropdown popover={{
                    class: 'o-data-pagination-popover'
                }} list={this.sizesList}>
                    <Button
                        size="mini"
                        class="o-data-pagination--pager o-data-pagination--sizes"
                        disabled={this.disabled}
                    >
                        <Space size={5} align="center">
                            { this.sizesRender(this.safeSize) }
                            <Icon>
                                <ChevronDown />
                            </Icon>
                        </Space>
                    </Button>
                </Dropdown>
            )
        )
        const jumperRender = () => (
            this.$slots.jumper?.() || (
                <div class="o-data-pagination--jumper">
                    跳至
                    <input
                        class="o-data-pagination--jumper-input"
                        onBlur={() => {
                            if (!this.jumper || this.disabled) return
                            this.goPage(this.jumper)
                            this.jumper = undefined
                        }}
                        onKeydown={e => {
                            if (this.disabled) return
                            if ((e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space')) {
                                e.preventDefault();
                                (e.target as HTMLInputElement).blur()
                            }
                        }}
                        v-model={this.jumper}
                        readonly={this.disabled}
                    />
                    页
                </div>
            )
        )
        const renderList: Record<string, () => (undefined | VNode | (VNode | VNode[])[])> = {
            total: totalRender,
            prev: prevRender,
            next: nextRender,
            pager: pagerRender,
            sizes: sizesRender,
            jumper: jumperRender
        }
        const layoutRender = () => {
            const final: (undefined | VNode | (VNode | VNode[])[])[] = []
            this.layout.forEach(item => {
                if (item in renderList) {
                    final.push(renderList[item]())
                } else {
                    const vNode = this.$slots?.[item]?.({ page: this.safePage, size: this.safeSize, disabled: this.disabled })
                    final.push(vNode)
                }
            })
            return final
        }
        return (
            <Space size={5} class={[
                'o-data-pagination',
                {
                    'o-data-pagination__disabled': this.disabled
                }
            ]} align={'center'} { ...this.spaceProps }>
                { layoutRender() }
            </Space>
        )
    }
})
