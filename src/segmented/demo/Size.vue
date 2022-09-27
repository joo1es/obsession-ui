<template>
    <o-space vertical>
        <o-segmented :options="['小', '小小', '小小小', { label: '小小小小', value: '小小小小', disabled: true }]"  size="small" />
        <o-segmented :options="['默认', '默认认', '默认认认', { label: '默认认认', value: '默认认认', disabled: true }]"  />
        <o-segmented :options="['大', '大大', '大大大', { label: '大大大大', value: '大大大大', icon: HomeOutline, disabled: true }]"  size="large" />
    </o-space>
</template>

<script lang="ts" setup>
import { HomeOutline } from '@vicons/ionicons5'
</script>