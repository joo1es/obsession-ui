import { reactive, watch } from 'vue'

const lockBodyScrollList = reactive(new Set<symbol>())

watch(lockBodyScrollList, () => {
    if (lockBodyScrollList.size > 0) {
        document.body.classList.add('o-prevent-scroll')
    } else {
        document.body.classList.remove('o-prevent-scroll')
    }
})

export { lockBodyScrollList }