import { useTransition, TransitionPresets } from '@vueuse/core'
import { ref, defineComponent, ExtractPropTypes, computed, nextTick, watch } from 'vue'

export const countToProps = {
    from: {
        type: Number,
        default: 0
    },
    to: {
        type: Number,
        default: 0
    },
    precision: Number,
    duration: {
        type: Number,
        default: 500
    },
    format: Boolean,
    formatNumber: {
        type: Number,
        default: 3
    },
    formatString: {
        type: String,
        default: ','
    },
    appear: {
        type: Boolean,
        default: true
    }
}
export type CountToProps = ExtractPropTypes<typeof countToProps>

const formatNumber = (nStr: string | number, splitNumber = 3, formatString = ',') => {
    nStr = String(nStr)
    const x = nStr.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? '.' + x[1] : ''
    const rgx = new RegExp(`(\\d+)(\\d{${splitNumber}})`)
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + formatString + '$2')
    }  
    return x1 + x2 
}

export default defineComponent({
    name: 'OCountTo',
    props: countToProps,
    setup(props) {
        const count = ref(props.from)
        watch(() => props.to, () => {
            count.value = props.to
        })
        if (props.appear) {
            nextTick(() => {
                count.value = props.to
            })
        } else {
            (() => {
                count.value = props.to
            })()
        }
        const countShow = useTransition(count, {
            duration: props.duration,
            transition: TransitionPresets.easeInOutCubic
        })
        const countShowPrecision = computed(() => {
            const count = countShow.value === props.to ? props.to : countShow.value.toFixed(props.precision)
            return props.format ? formatNumber(count, props.formatNumber, props.formatString) : count
        })
        return {
            countShow,
            countShowPrecision
        }
    },
    render() {
        return (
            <>
                { this.countShowPrecision }
            </>
        )
    }
})
