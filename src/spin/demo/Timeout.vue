<template>
    <o-button @click="onLoading">开启</o-button>
    <o-spin size="24px" text="加载中…" fullscreen :loading="loading" :timeout="3000" />
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'

const loading = ref(false)
const onLoading = () => {
    loading.value = true
    nextTick(() => {
        loading.value = false
    })
}
</script>