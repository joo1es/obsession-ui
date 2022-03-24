<template>
    <o-space vertical :wrap="false">
        <o-space>
            <o-switch v-model="relative" active-text="相对" inactive-text="不相对" width="70px"></o-switch>
            <o-radio-group v-model="mode">
                <o-radio value="left">居左</o-radio>
                <o-radio value="right">居右</o-radio>
                <o-radio value="alternate">居中</o-radio>
            </o-radio-group>
        </o-space>
        <o-timeline :mode="mode" :relative="relative">
            <o-timeline-item label="2019-05-12" line-color="var(--o-timeline-item-dot-color)">
                工程启动
            </o-timeline-item>
            <o-timeline-item label="2019-08-12" dot-color="orange" :line-color="finished ? 'var(--o-timeline-item-dot-color)' : ''" :loading="!finished">
                工程竣工
            </o-timeline-item>
            <o-timeline-item :dot-color="finished ? 'red' : 'gray'" :icon="HomeSharp">
                庆祝
                <template #label>
                    -
                </template>
            </o-timeline-item>
        </o-timeline>
        <o-button size="small" @click="finished = !finished">切换完成状态</o-button>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeSharp } from '@vicons/ionicons5'

const finished = ref(false)
const mode = ref<'left' | 'right' | 'alternate'>('left')
const relative = ref(false)
</script>