<template>
    <o-space vertical>
        <o-space>
            <o-button @click="percentage += 10">+10</o-button>
            <o-button @click="percentage -= 10">-10</o-button>
        </o-space>
        <o-progress :percentage="percentage" />
        <o-space :size="20">
            <o-progress :percentage="percentage" :color="['orange', 'red']" type="vertical" />
            <o-progress :percentage="percentage" :size="40" type="vertical" align="center" appear/>
            <o-progress :percentage="percentage" :size="20" type="vertical" align="end" :show-text="false" />
        </o-space>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(50)
</script>