import {
    defineComponent,
    ExtractPropTypes,
    PropType,
    TransitionGroup,
    ref,
    StyleValue,
    h,
    onBeforeUnmount,
    watch
} from 'vue'
import { flatten } from '../utils'

export const scrollListProps = {
    height: {
        type: [Number, String] as PropType<number | string>,
        default: 'auto'
    },
    tag: {
        type: String,
        default: 'div'
    },
    duration: {
        type: Number,
        default: 2000
    },
    animationDuration: {
        type: Number,
        default: 400
    },
    hoverToStop: {
        type: Boolean,
        default: true
    },
    space: {
        type: [Number, String] as PropType<number | string>
    },
    play: {
        type: Boolean,
        default: true
    },
    reverse: {
        type: Boolean,
        default: false
    }
}

export type ScrollListProps = ExtractPropTypes<typeof scrollListProps>

export default defineComponent({
    name: 'OScrollList',
    props: scrollListProps,
    setup(props, { slots }) {
        let slotBackup = JSON.stringify(slots.default?.())
        const getSlotsElements = () => {
            const elements = slots.default?.() || []
            return flatten(elements).map(element => ({
                ...element,
                id: Symbol('id')
            }))
        }
        const slotsElements = ref(getSlotsElements())
        const popList = () => {
            if (slotsElements.value.length < 2) return
            const firstChild = slotsElements.value.shift()
            if (firstChild) {
                firstChild.id = Symbol('id')
                slotsElements.value.push(firstChild)
            }
        }
        const timer = ref<null | ReturnType<typeof setInterval>>(null)
        const end = () => {
            if (timer.value) clearInterval(timer.value)
        }
        const start = () => {
            end()
            timer.value = setInterval(popList, props.duration)
        }
        watch(() => props.play, () => {
            if (props.play) {
                start()
            } else {
                end()
            }
        }, {
            immediate: true
        })
        /**
         * 解决 chrome 浏览器返回页面时动画加速的问题
         */
        const stopWhileHidden = () => {
            if (!props.play) return
            if (document.visibilityState === 'visible') {
                start()
            } else {
                end()
            }
        }
        window.addEventListener('visibilitychange', stopWhileHidden)
        onBeforeUnmount(() => {
            end()
            window.removeEventListener('visibilitychange', stopWhileHidden)
        })
        return () => {
            const slotBackupMap = JSON.stringify(slots.default?.())
            if (slotBackupMap !== slotBackup) {
                end()
                slotBackup = slotBackupMap
                slotsElements.value = getSlotsElements()
                start()
            }
            return (
                h(TransitionGroup, {
                    class: {
                        'o-scroll-list': true,
                        'o-scroll-list-reverse': props.reverse
                    },
                    name: props.reverse ? 'o-scroll-flip-reverse' : 'o-scroll-flip',
                    tag: props.tag,
                    style: {
                        height: !isNaN(Number(props.height)) ? `${props.height}px` : props.height
                    },
                    onMouseenter: () => props.play && props.hoverToStop && end(),
                    onMouseleave: () => props.play && props.hoverToStop && start()
                }, {
                    default: () => (
                        slotsElements.value.map((element, index) => (
                            <div class={{
                                'o-scroll-list__cell': true
                            }} style={{
                                '--duration': props.animationDuration / 1000 + 's',
                                marginBottom: index !== slotsElements.value.length - 1 ? (!isNaN(Number(props.space)) ? `${props.space}px` : props.space) : ''
                            } as StyleValue} key={element.id}>
                                { element }
                            </div>
                        ))
                    )
                })
            )
        }
    }
})
