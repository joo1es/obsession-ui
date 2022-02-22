<template>
    <o-button @click="onLoading">开启</o-button>
    <o-spin size="24px" text="加载中…" fullscreen :loading="loading" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const onLoading = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 3000)
}
</script>