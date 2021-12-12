import {
    defineComponent,
    ExtractPropTypes,
    PropType,
    computed,
    CSSProperties,
} from 'vue'

export interface SpaceItemStyle {
  common?: CSSProperties;
  [x: number]: CSSProperties;
}

export interface SpaceItemClass {
  common?: Record<string, boolean>;
  [x: number]: Record<string, boolean>;
}

export const spaceProps = {
    size: {
        type: [String, Number, Array] as PropType<
      string | number | [string | number, string | number]
    >,
        default: 10,
    },
    align: String as PropType<
    'start' | 'end' | 'center' | 'baseline' | 'stretch'
  >,
    justify: String as PropType<
    'start' | 'end' | 'center' | 'space-around' | 'space-between'
  >,
    vertical: Boolean,
    wrap: {
        type: Boolean,
        default: true,
    },
    itemStyle: {
        type: Object as PropType<SpaceItemStyle>,
        default: {},
    },
    itemClass: {
        type: Object as PropType<SpaceItemClass>,
        default: {},
    },
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>;

const getNumberPx = (thing: string | number) => {
    if (typeof thing === 'number' || !isNaN(Number(thing))) {
        return `${thing}px`
    }
    return thing
}

export default defineComponent({
    name: 'OSpace',
    props: spaceProps,
    setup(props, { slots }) {
        const sizeMap = computed<[string, string]>(() => {
            if (Array.isArray(props.size)) {
                return props.size.map((size) => getNumberPx(size)) as [string, string]
            }
            const px = getNumberPx(props.size)
            return [px, px]
        })
        const parentMarginBottom = computed(() => {
            if (sizeMap.value[1].startsWith('-')) {
                return ''
            }
            return `-${sizeMap.value[1]}`
        })
        const getAlign = (align?: string) => {
            if (!align) return
            if (align === 'start' || align === 'end') return `flex-${align}`
            return align
        }
        return () => (
            <div
                class={{
                    'o-space': true,
                    'o-space__vertical': props.vertical,
                    'o-space__wrap': props.wrap,
                }}
                style={
          {
              marginBottom: parentMarginBottom.value,
              alignItems: getAlign(props.align),
              justifyContent: getAlign(props.justify),
              '--o-space-x-gap': sizeMap.value[0],
              '--o-space-y-gap': sizeMap.value[0],
          } as CSSProperties
                }
            >
                {(slots.default?.() || []).map((vNode, index) => (
                    <div
                        class={{
                            'o-space-cell': true,
                            ...props.itemClass.common,
                            ...props.itemClass[index],
                        }}
                        style={{
                            ...props.itemStyle.common,
                            ...props.itemStyle[index],
                        }}
                    >
                        {vNode}
                    </div>
                ))}
            </div>
        )
    },
})
