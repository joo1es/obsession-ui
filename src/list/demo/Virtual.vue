<template>
    <o-list v-slot="{ item }" style="max-height: 150px;" :finished="finished" :items="items" :load="handleLoad" virtual>
        <div :key="item.key" style="display: flex; align-items: center; justify-content: center;" :style="{ height: `${item.height}px` }">
            {{ item.key }}
        </div>
    </o-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const finished = ref(false)
const items = ref(new Array(30).fill(0).map((item, index) => ({
    height: Math.random() * 30 + 50,
    key: index + 1
})))
const handleLoad = () => new Promise<void>(resolve => {
    setTimeout(() => {
        new Array(30).fill(0).forEach(() => {
            items.value.push({
                height: Math.random() * 30 + 50,
                key: items.value.length + 1
            })
        })
        if (items.value.length >= 150) finished.value = true
        resolve()
    }, 1000)
})
</script>