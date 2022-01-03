import { defineComponent, ExtractPropTypes, CSSProperties, PropType } from 'vue'

export const statisticProps = {
    label: {
        type: [String, Number]
    },
    labelStyle: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: ''
    },
    value: {
        type: [Number, String] as PropType<number | string>
    },
    valueStyle: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: ''
    },
    prefix: {
        type: [Number, String] as PropType<number | string>
    },
    suffix: {
        type: [Number, String] as PropType<number | string>
    },
    prefixStyle: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: ''
    },
    suffixStyle: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: ''
    },
    vertical: {
        type: Boolean,
        default: false
    },
    reverse: {
        type: Boolean,
        default: false
    },
    align: String as PropType<'start' | 'end' | 'center' | 'baseline' | 'stretch'>,
    justify: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>
}

export type StatisticProps = ExtractPropTypes<typeof statisticProps>

const getAlign = (align?: string) => {
    if (!align) return
    if (align === 'start' || align === 'end') return `flex-${align}`
    return align
}

export default defineComponent({
    name: 'OStatistic',
    props: statisticProps,
    setup(props, { slots }) {
        return () => {
            const Label = slots.label || props.label ? (
                <div class="o-statistic__label" style={props.labelStyle}>
                    { slots.label?.() || props.label }
                </div>
            ) : null
            const Value = (
                <div class="o-statistic__value" style={props.valueStyle}>
                    {
                        slots.prefix || props.prefix ? (
                            <div class="o-statistic__prefix" style={props.prefixStyle}>
                                { slots.prefix?.() || props.prefix }
                            </div>
                        ) : null
                    }
                    { slots.default?.() || slots.value?.() || props.value }
                    {
                        slots.suffix || props.suffix ? (
                            <div class="o-statistic__suffix" style={props.suffixStyle}>
                                { slots.suffix?.() || props.suffix }
                            </div>
                        ) : null
                    }
                </div>
            )
            return (
                <div class={{
                    'o-statistic': true,
                    'o-statistic__vertical': props.vertical,
                    'o-statistic__reverse': props.reverse
                }} style={{
                    alignItems: getAlign(props.align),
                    justifyContent: getAlign(props.justify)
                }}>
                    { slots.top?.() }
                    {
                        !props.reverse ? ( <>{ Label }{ Value }</> ) : ( <>{ Value }{ Label }</> )
                    }
                    { slots.bottom?.() }
                </div>
            )
        }
    }
})