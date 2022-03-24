import { useFocus } from '@vueuse/core'
import { ref, defineComponent, ExtractPropTypes, computed, Component, PropType, h, watch } from 'vue'
import Icon from '../icon'
import { Close, EyeOutline as EyeOutlined, EyeOffOutline as EyeInvisibleOutlined } from '@vicons/ionicons5'
import { useAutoControl } from '../utils'
import Popover from '../popover'
import Spin from '../spin'

export type AutocompleteList = {
    value: string,
    label?: string
} & Record<string, any>

export const inputProps = {
    modelValue: {
        type: String,
        default: undefined
    },
    type: String,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: {
        type: String,
        default: '请输入'
    },
    rows: Number,
    clearable: Boolean,
    suffix: Object as PropType<Component>,
    prefix: Object as PropType<Component>,
    maxlength: Number,
    showWordSize: Boolean,
    size: {
        type: String as PropType<'small' | 'default' | 'medium' | 'large'>,
        default: 'default'
    },
    autofocus: Boolean,
    tabindex: {
        type: [String, Number]
    },
    name: String,
    showPasswordIcon: {
        type: Boolean,
        default: true
    },
    resize: {
        type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
        default: 'vertical'
    },
    min: Number,
    max: Number,
    step: Number,
    autocomplete: Boolean,
    autocompleteList: {
        type: [Array, Function] as PropType<AutocompleteList[] | ((keyword: string) => Promise<AutocompleteList[]>)>
    }
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export default defineComponent({
    name: 'OInput',
    props: inputProps,
    emits: {
        'update:modelValue': (value: string) => ((void value, true)),
        'blur': (e: Event) => ((void e, true)),
        'change': (e: Event) => ((void e, true)),
        'focus': (e: Event) => ((void e, true)),
        'clear': (e: MouseEvent) => ((void e, true))
    },
    setup(props, { emit }) {
        const inputElementRef = ref<HTMLInputElement | HTMLTextAreaElement>()
        const { focused } = useFocus({ target: inputElementRef })

        const inputRef = ref('')
        const input = useAutoControl(inputRef, props, 'modelValue', emit)

        const clearable = computed(() => !props.readonly && !props.disabled && input.value && props.clearable)

        const showPassword = ref(true)

        const autocompleteListMap = ref<AutocompleteList[]>([])
        const autocompleteLoading = ref(false)
        const autocompleteActive = ref(-1)

        watch([input, focused], async() => {
            if (!focused.value) return
            if (props.autocomplete && !props.disabled && !props.readonly) {
                try {
                    autocompleteLoading.value = true
                    if (!props.autocompleteList) {
                        autocompleteListMap.value = []
                    } else if (Array.isArray(props.autocompleteList)) {
                            if (!input.value) {
                                autocompleteListMap.value = props.autocompleteList
                            } else {
                                const regExp = new RegExp(input.value.trim(), 'i')
                                autocompleteListMap.value = props.autocompleteList.filter(item => regExp.test(item.label || '') || regExp.test(item.value))
                            }
                        } else {
                            const inputingIs = input.value
                            const result = await props.autocompleteList(input.value || '')
                            if (inputingIs === input.value) {
                                autocompleteListMap.value = result
                            }
                        }
                } finally {
                    autocompleteActive.value = -1
                    autocompleteLoading.value = false
                }
            }
        }, {
            immediate: true
        })

        const onFocus = (event: Event) => {
            emit('focus', event)
        }

        const focusedTimeout = ref(focused.value)
        let timer: ReturnType<typeof setTimeout> 
        watch(focused, () => {
            if (timer) clearTimeout(timer)
            if (focused.value) {
                focusedTimeout.value = true
            } else {
                timer = setTimeout(() => {
                    focusedTimeout.value = false
                }, 50)
            }
        })

        return {
            input,
            focused,
            inputElementRef,
            clearable,
            showPassword,
            autocompleteListMap,
            autocompleteLoading,
            autocompleteActive,
            focusedTimeout,
            onFocus
        }
    },
    render() {
        const InputElement = this.type !== 'textarea' ? (
            <input
                v-model={this.input}
                ref='inputElementRef'
                class="o-input--field"
                type={this.type === 'password' ? this.showPassword ? 'password' : undefined : this.type}
                readonly={this.readonly || this.disabled}
                placeholder={this.placeholder}
                maxlength={this.maxlength}
                autocomplete={'off'}
                autofocus={this.autofocus}
                tabindex={this.tabindex}
                name={this.name}
                onBlur={e => this.$emit('blur', e)}
                onFocus={e => this.$emit('focus', e)}
                onChange={e => this.$emit('change', e)}
            />
        ) : (
            <textarea
                v-model={this.input}
                ref='inputElementRef'
                class="o-input--textarea"
                style={{
                    resize: this.resize || 'vertical'
                }}
                rows={this.rows}
                readonly={this.readonly || this.disabled}
                placeholder={this.placeholder}
                maxlength={this.maxlength}
                autofocus={this.autofocus}
                tabindex={this.tabindex}
                name={this.name}
                onBlur={e => this.$emit('blur', e)}
                onFocus={e => this.$emit('focus', e)}
                onChange={e => this.$emit('change', e)}
            />
        )
        const Size = this.showWordSize && (
            <div class="o-input--size">
                { this.input?.length || 0 } {
                    this.maxlength && (
                        `/ ${this.maxlength}`
                    )
                }
            </div>
        )
        const Input = (
            <div class={[
                'o-input',
                `o-input-${this.size}`,
                {
                    'o-input--disabled': this.disabled,
                    'o-input--focused': this.focused
                }
            ]} {...this.$attrs} onKeydown={e => {
                if (!this.autocomplete || this.disabled || this.readonly) return
                if (e.code === 'ArrowDown') {
                    if (this.autocompleteActive === this.autocompleteListMap.length - 1) {
                        this.autocompleteActive = 0
                        return
                    }
                    this.autocompleteActive += 1
                }
                if (e.code === 'ArrowUp') {
                    if (this.autocompleteActive <= 0) {
                        this.autocompleteActive = this.autocompleteListMap.length - 1
                        return
                    }
                    this.autocompleteActive -= 1
                }
                if (e.code === 'Enter' && this.autocompleteActive >= 0) {
                    this.input = this.autocompleteListMap[this.autocompleteActive].value
                    this.focused = false
                }
            }}>
                {
                    (this.prefix || this.$slots.prefix) && (
                        <div class="o-input--prefix">
                            {
                                this.$slots.prefix?.() || (
                                    this.prefix && <Icon>{h(this.prefix)}</Icon>
                                )
                            }
                        </div>
                    )
                }
                <div class="o-input--element">
                    {InputElement}
                    {Size}
                </div>
                {
                    (this.clearable || (this.showPasswordIcon && this.type === 'password') || this.suffix || this.$slots.suffix) && (
                        <div class="o-input--suffix">
                            {
                                this.$slots.suffix?.() || (
                                    this.suffix && <Icon>{h(this.suffix)}</Icon>
                                )
                            }
                            {
                                this.showPasswordIcon && this.type === 'password' && (
                                    <div class="o-input__password">
                                        <div class="o-input__password-icon" onClick={() => {
                                            this.showPassword = !this.showPassword
                                        }}>
                                            <Icon>
                                                {
                                                    !this.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined/>
                                                }
                                            </Icon>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.clearable && (
                                    <div class="o-input__clear">
                                        <div class="o-input__clear-icon" onClick={(ev) => {
                                            this.input = ''
                                            this.$emit('clear', ev)
                                        }}>
                                            <Icon>
                                                { this.$slots.clearIcon?.() || <Close /> }
                                            </Icon>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.$slots.suffix?.() || (
                                    this.suffix && <Icon>{h(this.suffix)}</Icon>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
        return (
            this.autocomplete && !this.disabled && !this.readonly ? (
                <Popover
                    placement={'bottom'}
                    width={'target'}
                    v-model={this.focusedTimeout}
                    trigger="none"
                    class="o-autocomplete"
                >
                    {{
                        target: () => Input,
                        default: () => (
                            !this.autocompleteLoading ? (
                                this.autocompleteListMap.length === 0 ? (
                                    <div class="o-autocomplete-empty">
                                        暂无数据
                                    </div>
                                ) : (
                                    this.autocompleteListMap.map((item, index) => (
                                        this.$slots.autocompleteItem?.({ input: this.input, ...item }) || (
                                            <div
                                                class={[
                                                    'o-autocomplete-cell',
                                                    {
                                                        'o-autocomplete-cell--active': this.autocompleteActive === index
                                                    }
                                                ]}
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    this.input = item.value
                                                }}
                                                key={item.value}
                                            >
                                                { item.label || item.value }
                                            </div>
                                        )
                                    ))
                                )
                            ) : (
                                <div class="o-autocomplete-empty">
                                    <Spin size="24" />
                                </div>
                            )
                        )
                    }}
                </Popover>
            ) : Input
        )
    }
})

