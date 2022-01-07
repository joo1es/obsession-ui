import CollapseTransition from '../collapse-transition'
import { defineComponent, onMounted, PropType } from 'vue'

export default defineComponent({
    props: {
        isDelete: Boolean,
        keyIs: [String, Number, Symbol] as PropType<string | number | symbol>,
        done: {
            type: Function as PropType<() => void>,
            required: true
        },
        leave: {
            type: Function as PropType<() => void>,
            required: true
        },
        level: Number
    },
    setup(props, { slots }) {
        onMounted(() => {
            if (props.isDelete) {
                props.done()
            }
        })
        const handleAfterEnter = () => {
            if (props.isDelete) {
                props.leave()
            } else {
                props.done()
                props.leave()
            }
        }
        return () => (
            <CollapseTransition
                on-after-enter={handleAfterEnter}
                appear
                reverse={props.isDelete}
            >
                { slots.default?.() }
            </CollapseTransition>
        )
    }
})