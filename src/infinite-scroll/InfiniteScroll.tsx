import { useNamespace } from '../utils'
import {
    defineComponent,
    ref,
    type ExtractPropTypes
} from 'vue'
import { useElementSize } from '@vueuse/core'

export const infiniteScrollProps = []
export type InfiniteScrollProps = ExtractPropTypes<typeof infiniteScrollProps>

export default defineComponent({
    name: 'OInfiniteScroll',
    setup() {
        const { basic, of } = useNamespace('infinite-scroll')

        const contentRef = ref<HTMLDivElement>()
        const { height } = useElementSize(contentRef)

        function handleScroll(e: Event) {
            const target = (e.target as HTMLDivElement)
            if (target.scrollTop >= height.value) {
                const delta = target.scrollTop - height.value
                target.scrollTop = delta
            }
        }

        return {
            basic,
            of,
            handleScroll,
            contentRef
        }
    },
    render() {
        return (
            <div class={ this.basic } onScroll={ this.handleScroll }>
                <div class={ this.of('content') } ref="contentRef">
                    { this.$slots.default?.() }
                </div>
                <div class={ this.of('content') }>
                    { this.$slots.default?.() }
                </div>
            </div>
        )
    }
})