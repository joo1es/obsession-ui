import { defineComponent, PropType, ref, ExtractPropTypes, computed, nextTick, CSSProperties } from 'vue'

import Tag, { TagProps } from '../tag'

import Icon from '../icon'
import Space, { SpaceProps } from '../space'
import { Close } from '@vicons/ionicons5'

import { useFocus } from '@vueuse/core'
import { useAutoControl } from '../utils'

export const tagInputProps = {
    modelValue: {
        type: Array as PropType<string[]>,
        default: undefined
    },
    clearable: Boolean,
    tagProps: {
        type: Object as PropType<Partial<TagProps> & Record<string, any>>,
        default: () => ({})
    },
    placeholder: {
        type: String,
        default: '请输入标签'
    },
    allowRepeat: Boolean,
    delimiter: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    readonly: Boolean,
    disabled: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'medium' | 'large'>,
        default: 'default'
    },
    spaceProps: {
        type: Object as PropType<Partial<SpaceProps> & Record<string, any>>,
        default: () => ({})
    },
    max: Number,
    trim: Boolean,
    limit: Number,
    keyboardDelete: {
        type: Boolean,
        default: true
    },
    beforePush: {
        type: Function as PropType<(text: string) => string | void>
    }
}

export type TagInputProps = ExtractPropTypes<typeof tagInputProps>

export default defineComponent({
    name: 'OTagInput',
    props: tagInputProps,
    emits: {
        'update:modelValue': (value: string[]) => Array.isArray(value)
    },
    setup(props, { slots, emit }) {
        const valueRef = ref<string[]>([])
        const value = useAutoControl(valueRef, props, 'modelValue', emit, {
            passive: true,
            deep: true
        })
        const inputingTag = ref('')
        const inputRef = ref<HTMLDivElement | null>(null)

        /**
         * Bind foucs of inputRef
         */
        const { focused } = useFocus({
            target: inputRef
        })

        /**
         * A RegExp to find string to be delimiter.
         */
        const regExp = computed(() => new RegExp(`[${props.delimiter.join('')}]$`))

        /**
         * @param clear 是否清除已经输入的内容
         * 
         * Add a tag
         */
        const tagPush = (clear = true) => {
            let text = inputingTag.value
            if (props.trim) {
                text = text.trim()
            }
            if (!value.value) {
                value.value = []
            }
            if (text && (props.allowRepeat || !value.value.includes(text))) {
                if (props.beforePush) {
                    const newText = props.beforePush(text)
                    if (typeof newText === 'string') {
                        if (newText) value.value.push(newText)
                    } else {
                        value.value.push(text)
                    }
                } else {
                    value.value.push(text)
                }
                
            }
            if (clear) {
                if (inputRef.value?.innerText) inputRef.value.innerText = ''
                inputingTag.value = ''
            }
        }

        const active = ref('')

        /**
         * Tag Map, used when max is vaild
         */
        const tagsMap = computed(() => {
            let finalValue: string[] = []
            if (!value.value) return []
            if (props.max) {
                finalValue = value.value?.slice(0, props.max)
            } else {
                finalValue = value.value
            }
            const final = finalValue.map((tag, index) => ({
                tag,
                index,
                close: () => {
                    value.value?.splice(index, 1)
                },
                active: active.value === tag
            }))
            if (props.max && props.max < value.value.length) final.push({
                tag: `${value.value.length - props.max}+`,
                index: -1,
                close: () => {},
                active: Boolean(props.limit && props.limit <= value.value.length)
            })
            return final
        })

        const notLimited = computed(() => !props.limit || (!value.value || value.value.length < props.limit))
        return () => (
            <div
                class={{
                    'o-taginput': true,
                    'o-taginput-disabled': props.disabled,
                    [`o-taginput-${props.size}`]: true,
                    'focus': focused.value
                }}
                onClick={() => {
                    if (!focused.value && !props.disabled && !props.readonly && notLimited.value) {
                        inputRef.value?.focus()
                    }
                }}
                onKeydown={e => {
                    if (!props.keyboardDelete || props.disabled || props.readonly || !notLimited.value) return
                    /**
                     * press Enter to copy value to input
                     */
                    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && active.value && inputRef.value) {
                        inputRef.value.innerText = active.value
                        inputingTag.value = active.value
                        active.value = ''
                        nextTick(() => {
                            if (!inputRef.value) return
                            inputRef.value.focus()
                            const selection = window.getSelection()
                            const range = document.createRange()
                            range.selectNodeContents(inputRef.value)
                            if (!selection) return
                            selection.removeAllRanges()
                            selection.addRange(range)
                        })
                    }
                    /**
                     * press Delete to delete choosed one
                     */
                    if ((e.code === 'Delete' || e.code === 'Backspace') && active.value) {
                        if (!value.value) return
                        const index = value.value.indexOf(active.value)
                        if (index > -1) {
                            value.value.splice(index, 1)
                            active.value = ''
                            nextTick(() => {
                                inputRef.value?.focus()
                            })
                        }
                    }
                }}
            >
                <div class="o-taginput__content">
                    <Space size={[10, 5]} align="center" { ...props.spaceProps }>
                        {
                            tagsMap.value.map(tag => (
                                    <div
                                        class={{
                                            'o-taginput__tag': true,
                                            'active': tag.active,
                                        }}
                                        onClick={() => {
                                            if (!props.keyboardDelete || props.disabled || props.readonly || tag.index === -1 || !notLimited.value) return
                                            if (active.value !== tag.tag) {
                                                active.value = tag.tag
                                            } else {
                                                active.value = ''
                                            }
                                        }}
                                        onMousedown={e => {
                                            if (props.disabled || props.readonly || tag.index === -1) return
                                            /**
                                             * press Middle button to remove an item
                                             */
                                            if (e.button === 1) {
                                                e.preventDefault()
                                                if (!value.value) return
                                                value.value.splice(tag.index, 1)
                                            }
                                        }}
                                    >
                                        {
                                            slots.tag?.(tag) || (
                                                <Tag
                                                    
                                                    size={props.size}
                                                    closable={!props.readonly && !props.disabled && tag.index !== -1}
                                                    { ...props.tagProps }
                                                    onClose={(e: Event) => {
                                                        e.stopPropagation()
                                                        if (!value.value) return
                                                        value.value.splice(tag.index, 1)
                                                    }}
                                                >
                                                    { tag.tag }
                                                </Tag>
                                            )
                                        }
                                    </div>
                                ))
                        }
                        <div
                            key="inputRef"
                            ref={inputRef}
                            class={{
                                'o-taginput__content-input': true,
                                'blank': !inputingTag.value
                            }}
                            style={{
                                '--o-taginput-placehoder': `'${props.placeholder || ' '}'`,
                                minWidth: `${props.placeholder.length || 1}em`,
                                '-webkit-user-modify': !props.readonly && !props.disabled && notLimited.value ? 'read-write-plaintext-only' : undefined,
                                '-moz-user-modify': !props.readonly && !props.disabled && notLimited.value ? 'read-write-plaintext-only' : undefined
                            } as unknown as CSSProperties}
                            onInput={(e) => {
                                const text = (e.target as HTMLDivElement).innerText
                                active.value = ''
                                if (regExp.value.test(text)) {
                                    inputingTag.value = text.substring(0, text.length - 1)
                                    tagPush()
                                    nextTick(() => {
                                        inputRef.value?.focus()
                                    })
                                } else {
                                    inputingTag.value = text
                                }
                            }}
                            onBlur={() => {
                                if (!inputingTag.value) return
                                tagPush()
                            }}
                            contenteditable={!props.readonly && !props.disabled && notLimited.value ? 'true' : 'false'}
                            onKeydown={e => {
                                /**
                                 * press Enter to push a value
                                 */
                                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                                    e.preventDefault()
                                    if (!inputingTag.value) return
                                    e.stopPropagation()
                                    tagPush()
                                    nextTick(() => {
                                        inputRef.value?.focus()
                                    })
                                }
                                /**
                                 * press Delete to make a tag active
                                 */
                                if (e.code === 'Backspace' || e.code === 'Delete') {
                                    if (!props.keyboardDelete || props.disabled || props.readonly || !notLimited.value) return
                                    if (active.value) return
                                    e.stopPropagation()
                                    if (!value.value) return
                                    if (!inputingTag.value && value.value.length > 0) {
                                        active.value = value.value[value.value.length - 1]
                                    }
                                }
                            }}
                        />
                    </Space>
                </div>
                {
                    props.clearable && value.value && value.value.length > 0 && !props.readonly && !props.disabled ? (
                        <div class="o-taginput__clear">
                            <div class="o-taginput__clear-icon" onClick={() => {
                                value.value = []
                            }}>
                                <Icon>
                                    { slots.closeIcon?.() || <Close /> }
                                </Icon>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
})
