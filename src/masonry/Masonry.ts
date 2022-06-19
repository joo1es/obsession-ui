import { useEventListener } from '@vueuse/core'
import { addUnit, flatten } from '../utils'
import { ref, defineComponent, h, VNode, nextTick, onMounted, onUpdated, PropType, computed, mergeProps, Component, ExtractPropTypes  } from 'vue'
import { breakpointValue } from './utils'

export const masonryProps = {
    tag: {
        type: [String, Object] as PropType<string | Component>,
        default: 'div'
    },
    cols: {
        type: [Object, Number, String] as PropType<string | number | Record<string | number, string | number>>,
        default: 2
    },
    gutter: {
        type: [Object, Number, String] as PropType<string | number | Record<string | number, string | number>>,
        default: 0
    },
    columnTag: {
        type: [String, Object] as PropType<string | Component>,
        default: 'div'
    },
    columnProps: {
        type: Object as PropType<Record<string, any>>,
        default: () => {}
    }
}

export type MasonryProps = ExtractPropTypes<typeof masonryProps>

export default defineComponent({
    name: 'OMasonry',
    props: masonryProps,

    setup(props, { slots }) {
        const wrapperWidth = ref(0)
        const displayColumns = ref(2)
        const displayGutter = ref(0)

        const calculateGutterSize = (width: number) => {
            displayGutter.value = breakpointValue(props.gutter, width)
        }

        const calculateColumnCount = (width: number) => {
            let columnLength = breakpointValue(props.cols, width) || 0

            // Make sure we can return a valid value
            columnLength = Math.max(1, Number(columnLength))

            displayColumns.value = columnLength
        }

        // Recalculate how many columns to display based on window width
        // and the value of the passed `:cols=` prop
        const render = () => {
            const windowWidth = window?.innerWidth || Infinity

            if (wrapperWidth.value !== windowWidth) {
                wrapperWidth.value = windowWidth

                calculateColumnCount(wrapperWidth.value)
                calculateGutterSize(wrapperWidth.value)
            }
        }

        nextTick(render)
        onMounted(render)
        onUpdated(render)

        useEventListener('resize', render)

        const getColumnsWithChildItems = () => {
            const columns: VNode[][] = []
            const children = flatten(slots.default?.() || [])
            if (children.length === 0) return []

            for (
                let i = 0, visibleItemI = 0;
                i < children.length;
                i++, visibleItemI++
            ) {
                if (!children[i].type) visibleItemI--

                const columnIndex = visibleItemI % displayColumns.value

                if (!columns[columnIndex]) {
                    columns[columnIndex] = []
                }

                columns[columnIndex].push(children[i])
            }

            return columns
        }

        const gutterSize = computed(() => addUnit(displayGutter.value))

        return {
            wrapperWidth,
            displayColumns,
            gutterSize,
            getColumnsWithChildItems
        }
    },

    render() {
        const columnsContainingChildren = this.getColumnsWithChildItems()

        const columns = columnsContainingChildren.map((children, index) => 
            // Create column element and inject the children
            h(this.columnTag as any, mergeProps({
                key: `${index}-${columnsContainingChildren.length}`,
                class: 'o-masonry-column'
            }, this.columnProps), children)
        )

        // Return wrapper with columns
        return h(this.tag as any, {
            class: 'o-masonry',
            style: {
                gridTemplateColumns: `repeat(${this.displayColumns}, 1fr)`,
                gap: this.gutterSize
            }
        }, columns)
    }
})