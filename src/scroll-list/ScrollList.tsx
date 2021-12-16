import {
    defineComponent,
    ExtractPropTypes,
    PropType,
    TransitionGroup,
    ref,
    StyleValue,
    h,
    onBeforeUnmount
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
            setTimeout(() => {
                if (firstChild) slotsElements.value.push(firstChild)
            }, props.animationDuration)
        }
        const timer = ref<null | ReturnType<typeof setInterval>>(null)
        const end = () => {
            if (timer.value) clearInterval(timer.value)
        }
        const start = () => {
            end()
            timer.value = setInterval(popList, props.duration)
        }
        start()
        onBeforeUnmount(end)
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
                    class: 'o-scroll-list',
                    name: 'o-scroll-flip',
                    tag: props.tag,
                    style: {
                        height: !isNaN(Number(props.height)) ? `${props.height}px` : props.height
                    },
                    onMouseenter: () => props.hoverToStop && end(),
                    onMouseleave: () => props.hoverToStop && start()
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