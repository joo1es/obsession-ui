// Vue 3.4 起全局 JSX 命名空间不再默认注册，需要显式引入，否则 TSX 中的
// JSX.IntrinsicElements 缺失，会报 TS7026 / TS7006。
/// <reference types="vue/jsx" />

import 'vue'

type EventHandler = (...args: any[]) => void

declare module 'vue' {
    interface ComponentCustomProps {
        id?: string;
        role?: string;
        tabindex?: number | string;
        onClick?: EventHandler;
        onTouchend?: EventHandler;
        onTouchmove?: EventHandler;
        onTouchstart?: EventHandler;
        onTouchcancel?: EventHandler;
    }
}