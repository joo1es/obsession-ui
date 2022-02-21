import { useIntersectionObserver } from '@vueuse/core'
import { computed, defineComponent, ExtractPropTypes, onMounted, PropType, ref } from 'vue'
import VirtualList, { VirtualListProps } from '../virtual-list'
import ListTip from './ListTip'
import PullRefresh from '../pull-refresh'
import { useAutoControl, useScrollParent } from '../utils'

export const listProps = {
    virtual: Boolean,
    loading: {
        type: Boolean,
        default: undefined
    },
    finished: Boolean,
    error: {
        type: Boolean,
        default: undefined
    },
    loadingText: {
        type: String,
        default: '加载中…'
    },
    finishedText: {
        type: String,
        default: '没有更多了'
    },
    errorText: {
        type: String,
        default: '加载失败'
    },
    rootMargin: String,
    threshold: Number,
    load: {
        type: Function as PropType<(isPullRefresh: boolean) => Promise<void>>
    },
    direction: {
        type: String as PropType<'up' | 'down'>,
        default: 'down'
    },
    items: {
        type: Array as PropType<Record<string, any>[]>,
        default: () => []
    },
    itemSize: {
        type: Number,
        default: 10
    },
    virtualListProps: {
        type: Object as PropType<Partial<VirtualListProps> & Record<string, any>>
    },
    pullRefresh: Boolean
}

export type ListProps = ExtractPropTypes<typeof listProps>

export default defineComponent({
    name: 'OList',
    props: listProps,
    emits: {
        'update:loading': (loading: boolean) => typeof loading === 'boolean',
        'update:error': (error: boolean) => typeof error === 'boolean'
    },
    setup(props, { emit }) {
        const loadingRef = ref(false)
        const loadingSync = useAutoControl(loadingRef, props, 'loading', emit)

        const errorRef = ref(false)
        const errorSync = useAutoControl(errorRef, props, 'error', emit)

        const tipRef = ref<HTMLDivElement | null>(null)
        const listRef = ref<InstanceType<typeof PullRefresh> | null>(null)
        const virtualListRef = ref<InstanceType<typeof VirtualList> | null>(null)

        const intersecting = ref(false)
        const doLoad = async(isPullRefresh = false) => {
            if (!isPullRefresh && (errorSync.value || loadingSync.value || props.finished)) return
            loadingSync.value = true
            try {
                await props.load?.(isPullRefresh)
            } catch {
                errorSync.value = true
            } finally {
                loadingSync.value = false
                if (intersecting.value) {
                    doLoad()
                }
            }
        }

        const scrollParent = useScrollParent(computed(() => listRef.value?.root))

        if (!props.virtual) {
            onMounted(() => {
                useIntersectionObserver(tipRef, ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        intersecting.value = true
                        doLoad()
                    } else {
                        intersecting.value = false
                    }
                }, {
                    root: scrollParent.value === document.body ? undefined : scrollParent,
                    rootMargin: props.rootMargin,
                    threshold: props.threshold
                })
            })
        }

        const itemsMap = computed(() => {
            if (!props.virtual) return
            const items = [...props.items]
            if (props.direction === 'down') {
                items.push({
                    'wp__istip': true
                })
            } else {
                items.unshift({
                    'wp__istip': true
                })
            }
            return items
        })

        const rootElement = computed(() => {
            if (props.virtual) {
                return virtualListRef.value?.listElRef
            } 
                return scrollParent.value
            
        })

        return {
            loadingSync,
            errorSync,
            tipRef,
            listRef,
            itemsMap,
            doLoad,
            virtualListRef,
            rootElement
        }
    },
    expose: ['virtualListRef'],
    render() {
        const tip = (
            <div class={[
                'o-list--tip',
                {
                    [`o-list--tip__${this.loadingSync ? 'loading' : this.errorSync ? 'error' : 'finished'}`]: true
                }
            ]} ref="tipRef">
                <ListTip
                    loading={this.loadingSync}
                    loadingText={this.loadingText}
                    error={this.errorSync}
                    errorText={this.errorText}
                    finished={this.finished}
                    finishedText={this.finishedText}
                    virtual={this.virtual}
                    onLoad={this.doLoad}
                    v-slots={this.$slots}
                />
            </div>
        )
        const insetWrapper = !this.virtual ? (
            <>
                { this.direction === 'up' && tip }
                { this.$slots.default?.() }
                { this.direction === 'down' && tip }
            </>
        ) : null
        return (
            <PullRefresh
                ref="listRef"
                class="o-list"
                disabled={!this.pullRefresh}
                refresh={() => this.doLoad(true)}
                rootElement={this.rootElement}
            >
                {
                    this.virtual ? (
                        <VirtualList
                            ref="virtualListRef"
                            itemSize={this.itemSize}
                            itemResizable={true}
                            items={this.itemsMap}
                            {...this.virtualListProps}
                            v-slots={{
                                default: ({ item, index }: { item: Record<string, any>, index: number }) => (
                                    item?.wp__istip ? tip : this.$slots.default?.({ item, index })
                                )
                            }}
                        />
                    ) : insetWrapper
                }
            </PullRefresh>
        )
    }
})
