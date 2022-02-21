import { defineComponent, type ExtractPropTypes } from 'vue'
import { numericProp, addUnit } from '../utils'

const CircularIcon = (
    <svg class={'o-spin__circular'} viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
    </svg>
)

export const spinProps = {
    size: numericProp,
    color: String,
    vertical: Boolean,
    textSize: numericProp,
    textColor: String,
    text: String,
    loading: {
        type: Boolean,
        default: true
    }
}

export type SpinProps = ExtractPropTypes<typeof spinProps>;

export default defineComponent({
    name: 'OSpin',
    props: spinProps,
    setup(props, { slots }) {
        const renderText = () => {
            if (slots.text || props.text) {
                return (
                    <span
                        class={'o-spin__text'}
                        style={{
                            fontSize: addUnit(props.textSize),
                            color: props.textColor ?? props.color
                        }}
                    >
                        {slots.text?.() || props.text}
                    </span>
                )
            }
        }

        return () => {
            const Spin = (
                <div class={[
                    'o-spin',
                    {
                        'o-spin--vertical': props.vertical
                    }
                ]} style={{
                    fontSize: addUnit(props.size),
                    color: props.color
                }}>
                    <span class={'o-spin__spinner'}>
                        {CircularIcon}
                    </span>
                    { renderText() }
                </div>
            )
            return (
                slots.default ? (
                    <div class='o-spin-wrapper'>
                        { slots.default() }
                        {
                            props.loading && (
                                <div class='o-spin-wrapper--icon'>
                                    { Spin }
                                </div>
                            )
                        }
                    </div>
                ) : Spin
            )
        }
    }
})