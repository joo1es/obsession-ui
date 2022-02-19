<template>
    <o-space vertical>
        <o-progress :percentage="percentage" indeterminate />
        <o-progress :percentage="percentage" indeterminate align="end" />
        <o-progress :percentage="percentage" type="grid" :color="{ '0%': 'orange', '100%': 'red' }" border-radius="0" indeterminate />
        <o-space :size="20">
            <o-progress :percentage="percentage" :color="['orange', 'red']" type="vertical" indeterminate />
            <o-progress :percentage="percentage" :color="['orange', 'red']" type="vertical" indeterminate align="end" />
            <o-progress :color="{ '0%': 'orange', '100%': 'red' }" type="circle" :size="100" indeterminate />
        </o-space>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(50)
</script>