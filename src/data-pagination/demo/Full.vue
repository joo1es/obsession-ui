<template>
    <o-space vertical>
        <o-button @click="disabled = !disabled">{{ disabled ? '启用' : '禁用' }}</o-button>
        <o-data-pagination :layout="['total', 'sizes', 'prev', 'pager', 'next', 'jumper']" :sizes="[10, 50, 100, 200]" :total="300" :disabled="disabled" />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>