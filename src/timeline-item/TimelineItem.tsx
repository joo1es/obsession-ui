import Icon from '../icon'
import Spin from '../spin'
import { useNamespace } from '../utils'
import { PropType, Component, ExtractPropTypes, defineComponent, inject, h, CSSProperties } from 'vue'
import { TimelineProps } from '../timeline'

export const timelineItemProps = {
    label: String,
    dotColor: String,
    lineColor: String,
    icon: Object as PropType<Component>,
    loading: Boolean
}

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>

export default defineComponent({
    name: 'OTimelineItem',
    props: timelineItemProps,
    setup() {
        const { basic, of, is } = useNamespace('timeline-item')
        const timelineProps = inject<TimelineProps>('wpTimelineProps')

        return {
            basic,
            of,
            is,
            timelineProps
        }
    },
    render() {
        const Label = (
            <div class={this.of('label')}>
                { this.timelineProps?.relative && (this.$slots.label?.() ?? this.label) }
            </div>
        )
        const Line = (
            <div class={this.of('line')}>
                {
                    this.icon || this.loading ? (
                        <div class={this.of('icon', this.of('line'))}>
                            {
                                this.loading ? (
                                    <Spin color="var(--o-timeline-item-dot-color)" />
                                ) : <Icon>{h(this.icon as any)}</Icon>
                            }
                        </div>
                    ) : (
                        <div class={this.of('dot', this.of('line'))} />
                    )
                }
                <div class={this.of('self', this.of('line'))} />
            </div>
        )
        const Content = (
            <div class={this.of('content')}>
                {this.$slots.default?.()}
                {
                    !this.timelineProps?.relative && (
                        <div class={this.of('label', this.of('content'))}>
                            { this.$slots.label?.() ?? this.label }
                        </div>
                    )
                }
            </div>
        )
        return (
            <div class={[
                this.basic,
                this.is(this.timelineProps?.mode || 'left'),
                {
                    [this.is('relative')]: this.timelineProps?.relative
                }
            ]} style={{
                '--o-timeline-item-dot-color': this.dotColor || '',
                '--o-timeline-item-line-color': this.lineColor || ''
            } as CSSProperties}>
                { (this.timelineProps?.relative || this.timelineProps?.mode === 'alternate') && Label }
                { Line }
                { Content }
            </div>
        )
    }
})
