import { useScroll } from '@vueuse/core'
import { addUnit, useNamespace, useScrollParent } from '../utils'
import {
    computed,
    CSSProperties,
    defineComponent,
    PropType,
    ref,
    Transition,
    type ExtractPropTypes
} from 'vue'
import { ChevronUp } from '@vicons/ionicons5'
import Icon from '../icon'

export const backTopProps = {
    distance: {
        type: Number,
        default: 400
    },
    smooth: Boolean,
    transitionName: {
        type: String,
        default: 'o-back-top-transition'
    },
    height: {
        type: [Number, String],
        default: 80
    },
    position: {
        type: String as PropType<CSSProperties['justify-content']>,
        default: 'center'
    },
    parent: {
        type: Object as PropType<Window | HTMLElement | SVGElement | null>
    }
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>

export default defineComponent({
    name: 'OBackTop',
    props: backTopProps,
    setup(props) {
        const { basic, of } = useNamespace('back-top')
        const scrollRef = ref<HTMLElement | HTMLBodyElement>()

        const parentRef = useScrollParent(scrollRef)

        const parentRefComputed = computed(() => {
            const parent = props.parent ?? parentRef.value
            if (parent && parent !== document.body) {
                return parent
            }
            return window
        })
        const { y } = useScroll(parentRefComputed)

        const toTop = () => {
            parentRefComputed.value.scrollTo?.({
                top: 0,
                behavior: props.smooth ? 'smooth' : undefined
            })
        }
        
        return {
            basic,
            scrollRef,
            y,
            of,
            toTop
        }
    },
    render() {
        return (
            <div ref="scrollRef" class={this.basic} style={{
                height: addUnit(this.height),
                justifyContent: this.position
            }}>
                <Transition name={this.transitionName}>
                    <div class={this.of('button')} onClick={this.toTop} v-show={this.y >= this.distance}>
                        {
                            this.$slots.default?.() ?? <Icon><ChevronUp /></Icon>
                        }
                    </div>
                </Transition>
            </div>
        )
    }
})