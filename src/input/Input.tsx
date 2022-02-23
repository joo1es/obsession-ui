import { useFocus } from '@vueuse/core'
import { ref, defineComponent, ExtractPropTypes, computed, Component, PropType, h } from 'vue'
import Icon from '../icon'
import { Close, EyeOutline as EyeOutlined, EyeOffOutline as EyeInvisibleOutlined } from '@vicons/ionicons5'
import { useAutoControl } from '../utils'

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
    tabindex: [String, Number],
    name: String,
    showPasswordIcon: {
        type: Boolean,
        default: true
    },
    resize: {
        type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
        default: 'vertical'
    }
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export default defineComponent({
    name: 'OInput',
    props: inputProps,
    emits: {
        'update:modelValue': (value: string) => typeof value === 'string'
    },
    setup(props, { emit }) {
        const inputElementRef = ref<HTMLInputElement | HTMLTextAreaElement>()
        const { focused } = useFocus({ target: inputElementRef })

        const inputRef = ref('')
        const input = useAutoControl(inputRef, props, 'modelValue', emit)

        const clearable = computed(() => !props.readonly && !props.disabled && input.value && props.clearable)

        const showPassword = ref(true)

        return {
            input,
            focused,
            inputElementRef,
            clearable,
            showPassword
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
        return (
            <div class={[
                'o-input',
                `o-input-${this.size}`,
                {
                    'o-input--disabled': this.disabled,
                    'o-input--focused': this.focused
                }
            ]}>
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
                                        <div class="o-input__clear-icon" onClick={() => {
                                            this.input = ''
                                        }}>
                                            <Icon>
                                                { this.$slots.clearIcon?.() || <Close /> }
                                            </Icon>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
})
