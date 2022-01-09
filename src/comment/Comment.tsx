import {
    defineComponent,
    inject,
    computed,
    type PropType,
    provide,
    ref,
    toRef,
    type CSSProperties,
    type ExtractPropTypes
} from 'vue'
import { addUnit } from '../utils'
import Avatar, { AvatarProps } from '../avatar'

import './index.scss'

export const commentProps = {
    indent: Number,
    indentSize: {
        type: [Number, String],
        default: 'auto'
    },
    avatar: {
        type: [Boolean, Object] as PropType<false | ( Partial<AvatarProps> & Record<string, any> )>,
        default: () => ({})
    },
    author: String,
    content: String,
    leftLine: Boolean,
    topLine: Boolean,
    bottomLine: Boolean
}

export type CommentProps = ExtractPropTypes<typeof commentProps>

export default defineComponent({
    name: 'OComment',
    inheritAttrs: false,
    props: commentProps,
    emits: {
        click: (e: Event) => {
            void e
            return true
        }
    },
    setup(props) {
        const indent = props.indent === undefined ? inject('indent', ref(0)) : toRef(props, 'indent')
        provide('indent', computed(() => ( indent.value || 0 ) + 1))
        const avatarSize = computed(() => {
            if (!props.avatar || !props.avatar.size) return ['50px', '50px']
            if (Array.isArray(props.avatar.size)) {
                return [addUnit(props.avatar.size[0]), addUnit(props.avatar.size[1])]
            }
            return [addUnit(props.avatar.size), addUnit(props.avatar.size)]
        })
        const indentSizeMap = computed(() => {
            if (props.indentSize === 'auto') {
                if (!props.avatar || !props.avatar.size) return '50px'
                return avatarSize.value[0]
            } 
            return addUnit(props.indentSize)
        })
        const indentArray = computed(() => new Array(indent.value).fill(''))
        return {
            indent,
            avatarSize,
            indentSizeMap,
            indentArray
        }
    },
    render() {
        return (
            <>
                <div
                    class="o-comment"
                    style={{
                        '--o-comment-indent-size': this.indentSizeMap,
                        '--o-comment-avatar-width': this.avatarSize[0],
                        '--o-comment-avatar-height': this.avatarSize[1]
                    } as CSSProperties}
                    onClick={e => this.$emit('click', e)}
                    {...this.$attrs}
                >
                    {
                        this.indent ? (
                            <div class="o-comment-indents">
                                {
                                    this.indentArray.map((indent, index) => (
                                        index === this.indentArray.length - 1 && this.leftLine ?
                                        (
                                            <div class="o-comment-indent">
                                                <div class="o-comment-vertical-line" />
                                                <div class="o-comment-horizontal-line" />
                                            </div>
                                        ) :
                                        <div class="o-comment-indent"/>
                                    ))
                                }
                            </div>
                        ) : null
                    }
                    {
                        this.$slots.avatar?.() || (
                            this.avatar ? (
                                <div class="o-comment-avatar">
                                    {
                                        this.topLine ? (
                                            <div class="o-comment-top-vertical-line" />
                                        ) : null
                                    }
                                    <Avatar size={50} {...this.avatar} />
                                    {
                                        this.bottomLine ? (
                                            <div class="o-comment-bottom-vertical-line" />
                                        ) : null
                                    }
                                </div>
                            ) : null
                        )
                    }
                    <div class="o-comment-body">
                        <div class="o-comment-content">
                            <div class="o-comment-author">
                                { this.$slots.author?.() || this.author }
                            </div>
                            <div class="o-comment-plain">
                                { this.$slots.default?.() || this.content }
                            </div>
                        </div>
                        {
                            this.$slots.actions ? (
                                <div class="o-comment-actions">
                                    { this.$slots.actions?.() }
                                </div>
                            ) : null
                        }
                        <div class="o-comment-bottom" />
                    </div>
                </div>
                { this.$slots.comment?.() }
            </>
        )
    }
})