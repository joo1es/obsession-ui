<template>
    <o-list style="max-height: 150px; overflow: auto;" :load="handleLoad" :finished="finished">
        <div v-for="i in number" style="height: 30px; display: flex; align-items: center; justify-content: center;">
            {{ i }}
        </div>
    </o-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const finished = ref(false)
const number = ref(20)
const handleLoad = () => new Promise<void>(resolve => {
    setTimeout(() => {
        number.value += 20
        if (number.value === 100) finished.value = true
        resolve()
    }, 1000)
})
</script>