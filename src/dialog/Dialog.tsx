import { ref, createApp, VNode, App, defineComponent } from 'vue'

import Modal, { ModalProps } from '../modal'
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
    spaceProps?: Partial<SpaceProps> & Record<string, any>,
    cancelProps?: Partial<ButtonProps> & Record<string, any>,
    confirmProps?: Partial<ButtonProps> & Record<string, any>,
    footer?: (close?: () => void) => VNode | string
}

const openDialog = function Dialog(options?: DialogOptions, props?: Partial<ModalProps> & Record<string, any>) {
    return new Promise<void>((resolve, reject) => {
        const newDiv = document.createElement('div')
        document.body.appendChild(newDiv)
        const app = createApp(defineComponent({
            setup() {
                const show = ref(true)
                const confirmButtonRef = ref<InstanceType<typeof Button> | null>(null)
                return () => (
                    <Modal
                        width={300}
                        { ...props }
                        v-model={show.value}
                        v-slots={{
                            title: () => options?.title || '提示',
                            default: () => options?.content,
                            footer: () => options?.footer?.(() => {
                                show.value = false
                            }) || (options?.showFooter !== false ? (
                                <Space justify="end" { ...options?.spaceProps }>
                                    {
                                        options?.showCancel !== false ? (
                                            <Button onClick={() => {
                                                show.value = false
                                            }} {...options?.cancelProps}>
                                                { options?.cancelText || '取消' }
                                            </Button>
                                        ) : null
                                    }
                                    {
                                        options?.showConfirm !== false ? (
                                            <Button ref={confirmButtonRef} type="primary" onClick={() => {
                                                show.value = false
                                                resolve()
                                            }} {...options?.confirmProps}>
                                                { options?.confirmText || '确定' }
                                            </Button>
                                        ) : null
                                    }
                                </Space>
                            ) : null)
                        }}
                        onClose={() => {
                            reject()
                        }}
                        onAfterClose={() => {
                            document.body.removeChild(newDiv)
                            app.unmount()
                        }}
                        onAfterOpen={() => {
                            confirmButtonRef.value?.$el?.focus?.()
                        }}    
                    />
                )
            }
        }))
        app.mount(newDiv)
    })
}

openDialog.install = (app: App<Element>) => {
    app.config.globalProperties.$dialog = openDialog
}

export default openDialog
