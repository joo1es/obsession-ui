import { defineComponent, type ExtractPropTypes, Transition, Teleport, ref, watch } from 'vue'
import { numericProp, addUnit, getMaxZIndex } from '../utils'

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
    },
    fullscreen: Boolean,
    background: String
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

        const zIndex = ref(1)

        watch(() => props.loading, () => {
            if (props.loading && props.fullscreen) {
                zIndex.value = getMaxZIndex()
                document.body.classList.add('o-prevent-scroll')
            } else if (props.fullscreen) {
                document.body.classList.remove('o-prevent-scroll')
            }
        })

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
                slots.default || props.fullscreen ? (
                    <Teleport to='body' disabled={!props.fullscreen}>
                        <Transition name='o-spin-transition'>
                            {
                                (!props.fullscreen || props.loading) ? (
                                    <div class='o-spin-wrapper' style={props.fullscreen ? {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: zIndex.value
                                    } : undefined}>
                                        {slots.default?.()}
                                        <Transition name='o-spin-transition'>
                                            {
                                                props.loading && (
                                                    <div class='o-spin-wrapper--icon' style={{ background: props.background }}>
                                                        {Spin}
                                                    </div>
                                                )
                                            }
                                        </Transition>
                                    </div>
                                ) : null
                            }        
                        </Transition>                
                    </Teleport>
                ) : Spin
            )
        }
    }
})