<template>
    <o-space vertical :size="[0, 10]">
        <o-tag-input v-model="tags" clearable readonly />
        <o-tag-input v-model="tags" clearable disabled />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref<string[]>(['标签1', '标签2', '标签3'])
</script>