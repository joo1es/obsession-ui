<template>
    <o-space vertical>
        <o-segmented v-model="active" :options="['什么', '刮风', '下雨', { value: '都不怕', disabled: true, icon: HomeOutline }]" />
        <o-segmented v-model="active" :options="['什么', '刮风', '下雨', { value: '都不怕', icon: HomeOutline }]" block />
    </o-space>
</template>
<script lang="ts" setup>
import { HomeOutline } from '@vicons/ionicons5'
import { ref } from 'vue'

const active = ref('什么')
</script>