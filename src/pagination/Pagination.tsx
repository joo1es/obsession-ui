import { useAutoControl } from '../utils'
import {
    ref,
    reactive,
    computed,
    defineComponent,
    type ExtractPropTypes,
    PropType
} from 'vue'
import { ChevronForward, ChevronBack } from '@vicons/ionicons5'

import Button from '../button'
import Dropdown, { type DropdownRecord } from '../dropdown'

export const paginationProps = {
    page: Number,
    total: {
        type: Number,
        default: 1
    },
    size: {
        type: String as PropType<'small' | 'default' | 'mini' | 'large'>,
        default: 'default'
    },
    sizeMap: Function as PropType<(page: number) => string>
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export default defineComponent({
    name: 'OPagination',
    props: paginationProps,
    emits: {
        'update:page': (page: number) => typeof page === 'number'
    },
    setup(props, { emit }) {
        const input = ref<HTMLInputElement | null>(null)
        const inputing = ref<number | string>('')

        const pageRefDefault = ref(1)
        const pageRef = useAutoControl(pageRefDefault, props, 'page', emit)
        
        const show = reactive({
            popover: false,
            input: false
        })
        
        const actions = computed<DropdownRecord[]>(() => {
            const final: DropdownRecord[] = []
            if (props.total > 100) return final
            for (let i = 1; i <= props.total; i++) {
                final.push({
                    title: props.sizeMap ? props.sizeMap?.(i) : `第 ${i} 页`,
                    index: i,
                    disabled: pageRef.value === i
                })
            }
            return final
        })
        
        const onSelect = (action: DropdownRecord) => {
            pageRef.value = Number(action.index)
        }
        
        const onInput = () => {
            inputing.value = pageRef.value || 0
            setTimeout(() => {
                if (!input.value) return
                input.value?.focus?.()
                input.value?.select?.()
            }, 200)
        }
        
        const changeTo = () => {
            inputing.value = Number(inputing.value.toString().replace(/[^0-9]/g,''))
            if (inputing.value >= 1 && inputing.value <= props.total) {
                pageRef.value = Number(inputing.value)
                show.popover = false
            } else {
                input.value?.classList?.add('o-pagination__main-input-animation')
                setTimeout(() => {
                    input.value?.classList?.remove('o-pagination__main-input-animation')
                }, 500)
            }
        }

        return {
            input,
            show,
            inputing,
            actions,
            pageRef,
            onSelect,
            onInput,
            changeTo
        }
    },
    render() {
        return (
            <div class={{
                'o-pagination': true,
                [`o-pagination-${this.size}`]: true
            }}>
                <Button
                    icon={ChevronBack}
                    size={this.size}
                    disabled={!this.pageRef || this.pageRef <= 1}
                    onClick={() => {
                        this.pageRef = (this.pageRef ?? 0) - 1
                    }}
                />
                <Dropdown
                    v-model={this.show.popover}
                    popover={{
                        trigger: 'click',
                        popoverClass: {
                            'o-pagination-popover': true,
                            [`o-pagination-${this.size}`]: true
                        },
                        arrow: true
                    }}
                    onClick={this.onSelect}
                    list={this.actions}
                >
                    {
                        !this.show.popover ? (
                            <Button
                                size={this.size}
                                class='o-pagination__main-button'
                                onClick={this.onInput}
                            >
                                {
                                    this.$slots.page?.({
                                        page: this.pageRef,
                                        total: this.total
                                    }) || (
                                        <>
                                            <b>{this.pageRef}</b>
                                            <i>/</i>
                                            {this.total}
                                        </>
                                    )
                                }
                            </Button>
                        ) : (
                            <input
                                ref="input"
                                v-model={this.inputing}
                                class='o-pagination__main-input'
                                onClick={e => e.stopPropagation()}
                                onKeyup={e => {
                                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                                        e.preventDefault()
                                        this.changeTo()
                                    }
                                }}
                            />
                        )
                    }
                </Dropdown>
                <Button
                    icon={ChevronForward}
                    size={this.size}
                    disabled={!this.pageRef || this.pageRef >= this.total}
                    onClick={() => {
                        this.pageRef = (this.pageRef ?? 0) + 1
                    }}
                />
            </div>
        )
    }
})