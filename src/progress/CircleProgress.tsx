import {
    watch,
    computed,
    defineComponent,
    type PropType,
    type CSSProperties,
    type ExtractPropTypes,
} from 'vue'

import { getSizeStyle } from '../utils'

let uid = 0

const format = (rate: string | number) => Math.min(Math.max(+rate, 0), 100)

function getPath(clockwise: boolean, viewBoxSize: number) {
    const sweepFlag = clockwise ? 1 : 0
    return `M ${viewBoxSize / 2} ${viewBoxSize / 2
        } m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`
}

export type CircleStartPosition = 'top' | 'right' | 'bottom' | 'left'

const circleProps = {
    text: String,
    size: [Number, String],
    fill: {
        type: String,
        default: 'none'
    },
    rate: {
        type: [Number, String],
        default: 100
    },
    speed: {
        type: [Number, String],
        default: 0
    },
    color: [String, Object] as PropType<string | Record<string, string>>,
    clockwise: {
      type: Boolean,
      default: true as const
    },
    layerColor: String,
    currentRate: {
        type: Number,
        default: 0
    },
    strokeWidth: {
        type: [Number, String],
        default: 40
    },
    strokeLinecap: String as PropType<CanvasLineCap>,
    startPosition: {
        type: String as unknown as PropType<CircleStartPosition>,
        default: 'top',
    },
    indeterminate: Boolean
}



export type CircleProps = ExtractPropTypes<typeof circleProps>

export default defineComponent({
    name: 'OProgressCircle',
    props: circleProps,
    emits: ['update:currentRate'],
    setup(props, { emit, slots }) {
        const id = `o-circle-${uid++}`

        const viewBoxSize = computed(() => +props.strokeWidth + 1000)

        const path = computed(() => getPath(props.clockwise, viewBoxSize.value))

        const svgStyle = computed(() => {
            const ROTATE_ANGLE_MAP: Record<CircleStartPosition, number> = {
                top: 0,
                right: 90,
                bottom: 180,
                left: 270,
            }

            const angleValue = ROTATE_ANGLE_MAP[props.startPosition]
            if (angleValue) {
                return {
                    transform: `rotate(${angleValue}deg)`,
                }
            }
        })

        let rafId: number | undefined

        watch(
            () => props.rate,
            rate => {
                const startTime = Date.now()
                const startRate = props.currentRate
                const endRate = format(rate)
                const fixedEndRate = Number(endRate.toFixed(4))
                const duration = Math.abs(
                    ((startRate - endRate) * 1000) / +props.speed
                )

                const animate = () => {
                    const now = Date.now()
                    const progress = Math.min((now - startTime) / duration, 1)
                    const rate = progress * (endRate - startRate) + startRate
                    const fixedRate = Number(rate.toFixed(4))

                    emit('update:currentRate', fixedRate)

                    if (endRate > startRate ? fixedRate < fixedEndRate : fixedRate > fixedEndRate) {
                        rafId = requestAnimationFrame(animate)
                    }
                }

                if (props.speed) {
                    if (rafId) {
                        cancelAnimationFrame(rafId)
                    }
                    rafId = requestAnimationFrame(animate)
                } else {
                    emit('update:currentRate', endRate)
                }
            },
            { immediate: true }
        )

        const renderHover = () => {
            const PERIMETER = 3140
            const { strokeWidth, currentRate, strokeLinecap } = props
            const offset = (PERIMETER * currentRate) / 100
            const color = typeof props.color === 'object' ? `url(#${id})` : props.color

            const style = {
                stroke: color,
                strokeWidth: `${+strokeWidth + 1}px`,
                strokeLinecap,
                strokeDasharray: `${offset}px ${PERIMETER}px`,
            } as CSSProperties

            return (
                <path
                    d={path.value}
                    style={style}
                    class={'o-progress-circle__hover'}
                    stroke={color}
                />
            )
        }

        const renderLayer = () => {
            const style = {
                fill: props.fill,
                stroke: props.layerColor,
                strokeWidth: `${props.strokeWidth}px`,
            }

            return <path class={'o-progress-circle__layer'} style={style} d={path.value} />
        }

        const renderGradient = () => {
            const { color } = props

            if (typeof color !== 'object') {
                return
            }

            const Stops = Object.keys(color)
                .sort((a, b) => parseFloat(a) - parseFloat(b))
                .map((key, index) => (
                    <stop key={index} offset={key} stop-color={color[key]} />
                ))

            return (
                <defs>
                    <linearGradient id={id} x1="100%" y1="0%" x2="0%" y2="0%">
                        {Stops}
                    </linearGradient>
                </defs>
            )
        }

        const renderText = () => {
            if (slots.default && !props.indeterminate) {
                return <div class={'o-progress-circle__text'}>{slots.default()}</div>
            }
            if (props.text) {
                return <div class={'o-progress-circle__text'}>{props.text}</div>
            }
        }

        return () => (
            <div class={[
                'o-progress-circle',
                {
                    'o-progress-circle__circular': props.indeterminate
                }
            ]} style={getSizeStyle(props.size)}>
                <svg
                    viewBox={`0 0 ${viewBoxSize.value} ${viewBoxSize.value}`}
                    style={svgStyle.value}
                >
                    {renderGradient()}
                    {renderLayer()}
                    {renderHover()}
                </svg>
                {renderText()}
            </div>
        )
    },
})
