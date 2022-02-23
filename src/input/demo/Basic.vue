<template>
    <o-space vertical>
        <o-input v-model="input" placeholder='请输入' clearable :prefix="Search" />
        <o-input readonly />
        <o-input disabled />
    </o-space>
</template>

<script lang="ts" setup>
import { Search } from '@vicons/ionicons5'
import { ref } from 'vue'

const input = ref<string>()
</script>