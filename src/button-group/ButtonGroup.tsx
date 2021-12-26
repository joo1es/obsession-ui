import { defineComponent } from 'vue'

export default defineComponent({
    name: 'OButtonGroup',
    setup(props, { slots }) {
        return () => (
            <div class="o-button-group">
                { slots.default?.() }
            </div>
        )
    }
})