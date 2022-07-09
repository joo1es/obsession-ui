import {
    defineComponent,
    ExtractPropTypes,
    PropType,
    // TransitionGroup,
    ref,
    StyleValue,
    h,
    onBeforeUnmount,
    watch,
    nextTick
} from 'vue'
import { flatten } from '../utils'
import { TransitionGroup } from './Transition/TransitionGroup'

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
    },
    autoUpdate: {
        type: Boolean,
        default: true
    },
    base: {
        type: String as PropType<'first' | 'last'>,
        default: 'first'
    },
    count: {
        type: Number,
        default: 1
    },
    linear: Boolean
}

export type ScrollListProps = ExtractPropTypes<typeof scrollListProps>

export default defineComponent({
    name: 'OScrollList',
    props: scrollListProps,
    setup(props, { slots, expose }) {
        let slotBackup = JSON.stringify(slots.default?.())
        /**
         * update elements
         */
        const getSlotsElements = () => {
            const elements = slots.default?.() || []
            const flattenElements = flatten(elements).map(element => ({
                ...element,
                id: Symbol('id')
            }))
            if (props.base === 'last') {
                flattenElements.reverse()
            }
            return flattenElements
        }
        const slotsElements = ref(getSlotsElements())
        const updating = ref(false)
        const update = async() => {
            updating.value = true
            slotsElements.value = []
            await nextTick()
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    slotsElements.value = getSlotsElements()
                    resolve()
                }, 16)
            })
            await nextTick()
            updating.value = false
        }
        watch([() => props.base, () => props.reverse], () => {
            if (props.autoUpdate) update()
        })
        const scrollListRef = ref<{ $el: HTMLDivElement } | null>(null)
        const popList = () => {
            if (!props.play) return
            if (slotsElements.value.length < 2) return
            if (scrollListRef.value) {
                if (scrollListRef.value.$el.scrollHeight <= scrollListRef.value.$el.offsetHeight) return
            }
            const count = props.count > slotsElements.value.length ? slotsElements.value.length : props.count
            const pushTo = slotsElements.value.slice(0, count)
            slotsElements.value.splice(0, count)
            pushTo.forEach(child => {
                child.id = Symbol('id')
                slotsElements.value.push(child)
            })
        }
        const timer = ref<null | ReturnType<typeof setInterval>>(null)
        const end = () => {
            if (timer.value) clearInterval(timer.value)
        }
        const start = () => {
            end()
            timer.value = setInterval(popList, props.duration + props.animationDuration)
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
        expose({ update })
        return () => {
            if (props.autoUpdate) {
                const slotBackupMap = JSON.stringify(slots.default?.())
                if (slotBackupMap !== slotBackup) {
                    end()
                    slotBackup = slotBackupMap
                    update()
                    start()
                }
            }
            return (
                h(TransitionGroup, {
                    class: {
                        'o-scroll-list': true,
                        'o-scroll-list-reverse': props.reverse
                    },
                    name: updating.value ? 'o-scroll-fade' : props.reverse ? 'o-scroll-flip-reverse' : 'o-scroll-flip',
                    tag: props.tag,
                    style: {
                        height: !isNaN(Number(props.height)) ? `${props.height}px` : props.height
                    },
                    ref: scrollListRef,
                    onMouseenter: () => props.play && props.hoverToStop && end(),
                    onMouseleave: () => props.play && props.hoverToStop && start(),
                }, {
                    default: () => slotsElements.value.map((element, index) => (
                        <div class={{
                            'o-scroll-list__cell': true,
                            'linear': props.linear
                        }} style={{
                            '--duration': props.animationDuration / 1000 + 's',
                            paddingBottom: index !== slotsElements.value.length - 1 ? (!isNaN(Number(props.space)) ? `${props.space}px` : props.space) : ''
                        } as StyleValue} key={element.id}>
                            { element }
                        </div>
                    ))
                })
            )
        }
    }
})
