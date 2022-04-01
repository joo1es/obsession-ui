import { useResizeObserver } from '@vueuse/core'
import { useNamespace } from '../utils'
import {
    ref,
    defineComponent,
    ExtractPropTypes,
    PropType,
    Component,
    h,
    onMounted,
    CSSProperties
} from 'vue'
import Icon from '../icon'

export const noticeBarProps = {
    color: {
        type: String,
        default: 'var(--warning-color)'
    },
    background: {
        type: String,
        default: '#fffbe8'
    },
    text: String,
    icon: {
        type: Object as PropType<Component>
    },
    scrollable: Boolean,
    duration: {
        type: Number,
        default: 40000
    }
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>

export default defineComponent({
    name: 'ONoticeBar',
    props: noticeBarProps,
    setup(props) {
        const { basic, of, is } = useNamespace('notice-bar')
        const contentRef = ref<HTMLDivElement>()

        const contentWidth = ref(0)
        const getWidth = () => {
            if (!contentRef.value) return
            if (!props.scrollable) return
            const width = contentRef.value.offsetWidth
            contentWidth.value = width
        }

        onMounted(getWidth)
        useResizeObserver(contentRef, getWidth)

        return {
            basic,
            of,
            is,
            contentRef,
            contentWidth
        }
    },
    render() {
        return (
            <div
                class={[
                    this.basic,
                    {
                        [this.is('scrollable')]: this.scrollable
                    }
                ]}
                style={{
                    color: this.color,
                    background: this.background,
                    '--o-notice-bar-content-width': this.contentWidth ? `-${this.contentWidth}px` : '',
                    '--o-notice-bar-duration': `${this.duration / 1000}s`
                } as CSSProperties}
            >
                {
                    this.$slots.prefix && (
                        <div class={this.of('prefix')}>
                            { this.$slots.prefix() }
                        </div>
                    )
                }
                {
                    (this.$slots.icon || this.icon) && (
                        <div class={this.of('icon')}>
                            <Icon>
                                { this.$slots.icon?.() ?? h(this.icon as any) }
                            </Icon>
                        </div>
                    )
                }
                <div class={this.of('content')}>
                    {
                        this.scrollable ? (
                            <div class={this.of('text')}>
                                <span ref="contentRef">{ this.$slots.default?.() ?? this.text }</span>
                            </div>
                        ) : (
                            this.$slots.default?.() ?? this.text
                        )
                    }
                </div>
                {
                    this.$slots.suffix && (
                        <div class={this.of('suffix')}>
                            { this.$slots.suffix() }
                        </div>
                    )
                }
            </div>
        )
    }
})
