import { useScroll } from '@vueuse/core'
import { addUnit, useNamespace, useScrollParent } from '../utils'
import {
    computed,
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
        // 这里刻意用 string，而不是 CSSProperties['justify-content']。
        // 后者指向 csstype 的 Property.JustifyContent，当 csstype 在依赖树里存在
        // 嵌套副本（@vue/runtime-dom 需要 ^3.2.3，css-render 需要 ~3.0.5）时，
        // 声明文件无法命名该类型，会报 TS2742；同时公开类型与历史版本保持一致。
        type: String as PropType<string | undefined>,
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