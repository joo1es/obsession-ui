import { useNamespace } from '../utils'
import { defineComponent, ExtractPropTypes, PropType } from 'vue'
import Icon from '../icon'

export const resultProps = {
    message: String,
    description: String,
    icon: {
        type: String as PropType<string>,
        default: '✋'
    }
}

export type ResultProps = ExtractPropTypes<typeof resultProps>

export default defineComponent({
    name: 'OResult',
    props: resultProps,
    setup() {
        const { basic, of } = useNamespace('result')

        return {
            basic,
            of
        }
    },
    render() {
        return (
            <div class={this.basic}>
                <div class={this.of('icon')}>
                    <Icon>
                        {this.$slots.icon?.() || this.icon}
                    </Icon>
                </div>
                {
                    (this.$slots.message || this.message) && (
                        <div class={this.of('message')}>
                            { this.$slots.message?.() || this.message }
                        </div>
                    )
                }
                {
                    (this.$slots.description || this.description) && (
                        <div class={this.of('description')}>
                            {this.$slots.description?.() || this.description }
                        </div>
                    )
                }
                { this.$slots.suffix?.() }
            </div>
        )
    }
})
