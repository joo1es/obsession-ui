import { h, Transition, TransitionGroup, defineComponent, PropType } from 'vue'

import type { ExtractPropTypes } from 'vue'

export const collapseTransitionProps = {
    appear: Boolean,
    group: Boolean,
    mode: String as PropType<'in-out' | 'out-in' | 'default'>,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    reverse: Boolean,
    duration: String,
    delay: String,
}

export type CollapseTransitionProps = ExtractPropTypes<
  typeof collapseTransitionProps
>;

export default defineComponent({
    name: 'CollapseTransition',
    props: {
        appear: Boolean,
        group: Boolean,
        mode: String as PropType<'in-out' | 'out-in' | 'default'>,
        onLeave: Function,
        onAfterLeave: Function,
        onAfterEnter: Function,
        width: Boolean,
        reverse: Boolean,
        duration: String,
        delay: String,
    },
    setup(props, { slots }) {
        function handleBeforeLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = `${el.offsetWidth}px`
            } else {
                el.style.maxHeight = `${el.offsetHeight}px`
            }
            void el.offsetWidth
        }
        function handleLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = '0'
            } else {
                el.style.maxHeight = '0'
            }
            void el.offsetWidth
            const { onLeave } = props
            if (onLeave) onLeave()
        }
        function handleAfterLeave(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = ''
            } else {
                el.style.maxHeight = ''
            }
            const { onAfterLeave } = props
            if (onAfterLeave) onAfterLeave()
        }
        function handleEnter(el: HTMLElement): void {
            el.style.transition = 'none'
            if (props.width) {
                const memorizedWidth = el.offsetWidth
                el.style.maxWidth = '0'
                void el.offsetWidth
                el.style.transition = ''
                el.style.maxWidth = `${memorizedWidth}px`
            } else if (props.reverse) {
                el.style.maxHeight = `${el.offsetHeight}px`
                void el.offsetHeight
                el.style.transition = ''
                el.style.maxHeight = '0'
            } else {
                const memorizedHeight = el.offsetHeight
                el.style.maxHeight = '0'
                void el.offsetWidth
                el.style.transition = ''
                el.style.maxHeight = `${memorizedHeight}px`
            }
            void el.offsetWidth
        }
        function handleAfterEnter(el: HTMLElement): void {
            if (props.width) {
                el.style.maxWidth = ''
            } else if (!props.reverse) {
                el.style.maxHeight = ''
            }
            props.onAfterEnter?.()
        }
        return () => {
            const type = props.group ? TransitionGroup : Transition
            return h(
        type as any,
        {
            name: props.width
                ? 'collapse-transition-width'
                : props.reverse
                    ? 'collapse-transition-reverse'
                    : 'collapse-transition',
            mode: props.mode,
            appear: props.appear,
            onEnter: handleEnter,
            onAfterEnter: handleAfterEnter,
            onBeforeLeave: handleBeforeLeave,
            onLeave: handleLeave,
            onAfterLeave: handleAfterLeave,
            style: {
                '--duration': props.duration || '',
                '--delay': props.delay || '',
                overflow: 'hidden',
            },
        },
        slots
            )
        }
    },
})