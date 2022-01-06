import { defineComponent, ExtractPropTypes, PropType, computed, ref, watch } from 'vue'

import { ImageOutline, Alert } from '@vicons/ionicons5'
import Icon from '../icon'

import { getFirstLetter } from '../utils'

export const imageProps = {
    size: {
        type: [Number, String, Array] as PropType<number | string | [number | string, number | string]>
    },
    src: String,
    contain: {
        type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>
    },
    borderRadius: {
        type: String
    },
    background: {
        type: String,
        default: '#f5f5f5'
    },
    color: {
        type: String,
        default: ''
    },
    alt: String,
    title: String
}

export type ImageProps = ExtractPropTypes<typeof imageProps>

export default defineComponent({
    name: 'OImage',
    props: imageProps,
    setup(props, { slots }) {
        const size = computed((): [string, string] => {
            if (!props.size) return ['', '']
            if (typeof props.size === 'number' || !isNaN(Number(props.size))) {
                return [`${props.size}px`, `${props.size}px`]
            } if (typeof props.size === 'string') {
                return [props.size, props.size]
            } 
            return props.size.map(size => typeof size === 'number' || !isNaN(Number(size)) ? `${size}px` : size) as [string, string]
        })
        const loading = ref(true)
        const error = ref(false)
        watch(() => props.src, () => {
            loading.value = true
            error.value = false
            if (!props.src) {
                loading.value = false
                error.value = false
                return
            }
            const img = new Image()
            img.src = props.src
            img.onabort = () => {
                error.value = true
                loading.value = false
            }
            img.onerror = () => {
                error.value = true
                loading.value = false
            }
            img.onload = () => {
                error.value = false
                loading.value = false
            }
        }, {
            immediate: true
        })
        const title = computed(() => getFirstLetter(props.title || ''))
        return () => (
            <div class="o-image" style={{
                width: size.value[0],
                height: size.value[1],
                fontSize: `calc(${size.value[1]} / 2)`,
                borderRadius: props.borderRadius,
                background: props.background,
                color: props.color
            }}>
                {
                    loading.value ? (
                        slots.loading?.() || (
                            <Icon>
                                <ImageOutline />
                            </Icon>
                        )
                    ) : null
                }
                {
                    !loading.value && error.value ? (
                        slots.error?.() || (
                            title.value || (
                                <Icon>
                                    <Alert />
                                </Icon>
                            )
                        )
                    ) : null
                }
                {
                    !loading.value && !error.value ? (
                        props.src ? (
                            slots.default?.() || (
                                <img src={ props.src } style={{
                                    objectFit: props.contain
                                }} alt={ props.alt } />
                            )
                        ) : (
                            slots.empty?.() || (
                                title.value || (
                                    <Icon>
                                        <ImageOutline />
                                    </Icon>
                                )
                            )
                        )
                    ) : null
                }
            </div>
        )
    }
})
