import { useNamespace } from '../utils'
import {
    defineComponent,
    ref,
    watch,
    computed,
    onBeforeUnmount,
    type ExtractPropTypes
} from 'vue'
import { useElementSize } from '@vueuse/core'

export const infiniteScrollProps = {
    auto: {
        type: [Boolean, Number]
    },
    hoverToStop: {
        type: Boolean
    }
}
export type InfiniteScrollProps = ExtractPropTypes<typeof infiniteScrollProps>

export default defineComponent({
    name: 'OInfiniteScroll',
    props: infiniteScrollProps,
    setup(props) {
        const { basic, of } = useNamespace('infinite-scroll')

        const parentRef = ref<HTMLDivElement>()
        const contentRef = ref<HTMLDivElement>()
        const { height: parentHeight } = useElementSize(parentRef)
        const { height } = useElementSize(contentRef)

        const noNeedToScroll = computed(() => parentHeight.value > height.value)
        const auto = computed(() => {
            if (noNeedToScroll.value) return false
            return props.auto
        })

        function handleScroll(e: Event) {
            const target = (e.target as HTMLDivElement)
            if (target.scrollTop >= height.value) {
                const delta = target.scrollTop - height.value
                target.scrollTop = delta
            }
        }

        let timer: ReturnType<typeof setInterval>
        function autoScroll() {
            stop()
            if (auto.value) {
                timer = setInterval(() => {
                    if (parentRef.value) parentRef.value.scrollTop += 1
                }, typeof auto.value === 'number' ? auto.value : 50)
            }
        }

        function stop() {
            clearInterval(timer) 
        }

        function handleVisibilityChange() {
            if (!auto.value) return
            if (document.visibilityState === 'visible') {
                autoScroll()
            } else {
                stop()
            }
        }

        watch(auto, autoScroll, {
            immediate: true
        })

        window.addEventListener('visibilitychange', handleVisibilityChange)
        onBeforeUnmount(() => {
            stop()
            window.removeEventListener('visibilitychange', handleVisibilityChange)
        })

        return {
            basic,
            of,
            handleScroll,
            contentRef,
            parentRef,
            autoScroll,
            stop,
            noNeedToScroll
        }
    },
    render() {
        return (
            <div
                class={ this.basic }
                onScroll={ this.handleScroll }
                ref="parentRef"
                onMouseenter={ this.hoverToStop ? this.stop : void 0 }
                onMouseleave={ this.hoverToStop ? this.autoScroll : void 0 }
            >
                <div class={ this.of('content') } ref="contentRef">
                    { this.$slots.default?.() }
                </div>
                {
                    !this.noNeedToScroll ? (
                        <div class={ this.of('content') }>
                            { this.$slots.default?.() }
                        </div>
                    ) : null
                }
            </div>
        )
    }
})