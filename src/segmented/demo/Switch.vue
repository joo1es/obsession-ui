<template>
    <o-segmented v-model="active" :options="['我', '实际上', '不允许', { label: 'Click', value: '点击', disabled: true }]" switch  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref('我')
</script>