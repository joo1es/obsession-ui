<template>
    <o-space vertical>
        <o-space>
            <o-switch v-model="reverse" active-text="倒序" inactive-text="正序" width="55px"></o-switch>
            <o-switch v-model="relative" active-text="相对" inactive-text="不相对" width="70px"></o-switch>
            <o-switch v-model="horizontal" active-text="横向" inactive-text="纵向" width="70px"></o-switch>
        </o-space>
        <o-timeline :reverse="reverse" :relative="relative" :horizontal="horizontal">
            <o-timeline-item label="2019-05-12">
                工程启动
            </o-timeline-item>
            <o-timeline-item label="2019-08-12">
                工程竣工
            </o-timeline-item>
            <o-timeline-item label="2019-05-12">
                庆祝
            </o-timeline-item>
        </o-timeline>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const reverse = ref(false)
const relative = ref(false)
const horizontal = ref(false)
</script>