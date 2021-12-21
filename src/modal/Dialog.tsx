import { ref, createApp, VNode } from 'vue'

import Modal, { ModalProps } from './Modal'
import Button, { ButtonProps } from '../button'
import Space, { SpaceProps } from '../space'

export interface DialogOptions {
    title?: VNode | string,
    content?: VNode | string,
    cancelText?: string | VNode,
    confirmText?: string | VNode,
    showFooter?: boolean,
    showCancel?: boolean,
    showConfirm?: boolean,
    spaceProps?: Partial<SpaceProps>,
    cancelProps?: Partial<ButtonProps>,
    confirmProps?: Partial<ButtonProps>
}

export default function Dialog(options?: DialogOptions, props?: Partial<ModalProps>) {
    return new Promise<void>((resolve, reject) => {
        const newDiv = document.createElement('div')
        document.body.appendChild(newDiv)
        const app = createApp({
            setup() {
                const show = ref(true)
                return () => (
                    <Modal { ...props } v-model={show.value} v-slots={{
                        title: () => options?.title || '提示',
                        default: () => options?.content,
                        footer: () => options?.showFooter !== false ? (
                            <Space justify="end" { ...options?.spaceProps }>
                                {
                                    options?.showCancel !== false ? (
                                        <Button onClick={() => {
                                            show.value = false
                                            reject()
                                        }}>
                                            { options?.cancelText || '取消' }
                                        </Button>
                                    ) : null
                                }
                                {
                                    options?.showConfirm !== false ? (
                                        <Button type="primary" onClick={() => {
                                            show.value = false
                                            resolve()
                                        }} {...options?.cancelProps}>
                                            { options?.confirmText || '确定' }
                                        </Button>
                                    ) : null
                                }
                            </Space>
                        ) : null
                    }} onClose={() => {
                        document.body.removeChild(newDiv)
                    }}></Modal>
                )
            }
        })
        app.mount(newDiv)
    })
}