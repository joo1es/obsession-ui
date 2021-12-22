import { reactive, watch } from 'vue'

const lockBodyScrollList = reactive(new Set<symbol>())

watch(lockBodyScrollList, () => {
    if (lockBodyScrollList.size > 0) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

export { lockBodyScrollList }