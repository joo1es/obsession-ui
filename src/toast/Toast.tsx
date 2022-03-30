import { createApp, defineComponent, ref, VNode, Transition, Teleport, App, CSSProperties } from 'vue'

import { getMaxZIndex } from '../utils'

export interface ToastOptions {
    dark?: boolean;
    message?: VNode | string;
    duration?: number;
    placement?: 'top' | 'bottom' | 'center',
    style?: string | CSSProperties,
    transition?: string
}

const Toast = (options: ToastOptions) => {
    const defaltOptions: ToastOptions = {
        duration: 3000,
        placement: 'bottom'
    }
    options = Object.assign(defaltOptions, options)
    const newDiv = document.createElement('div')
    document.body.appendChild(newDiv)
    const app = createApp(defineComponent({
        setup() {
            const show = ref(true)
            setTimeout(() => {
                show.value = false
            }, options.duration)
            return () => (
                <Teleport to="body">
                    <div class={{
                        'o-toast': true,
                        [`o-toast__${options.placement}`]: true
                    }} style={{
                        zIndex: getMaxZIndex()
                    }}>
                        <Transition name={options.transition || 'o-toast-fade'} appear onAfterLeave={() => {
                            app.unmount()
                            document.body.removeChild(newDiv)
                        }}>
                            <div style={options.style} class={{
                                'o-toast-message': true,
                                'o-toast-message__dark': options.dark
                            }} v-show={show.value}>
                                { options.message }
                            </div>
                        </Transition>
                    </div>
                </Teleport>
            )
        }
    }))
    app.mount(newDiv)
}

Toast.install = (app: App<Element>) => {
    app.config.globalProperties.$toast = Toast
}

const specToast = (color: string, icon: Component) => {
    return (message: string | VNode, options: Omit<ToastOptions, 'message'> = {}) => {
        Toast({
            ...options,
            message: 
                h('div', { class: 'wp-toast--spec' }, {
                    default: () => [h(Icon, {
                        color
                    }, {
                        default: () => h(icon)
                    }), message]
                })
        })
    }
}

Toast.success = specToast('var(--success-color)', CheckCircleFilled)
Toast.warning = specToast('var(--warning-color)', WarningFilled)
Toast.info = specToast('var(--primary-color)', InfoCircleFilled)
Toast.error = specToast('var(--danger-color)', CloseCircleFilled)

export default Toast
