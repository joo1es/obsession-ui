<template>
    <o-space vertical>
        <o-input-number v-model="input0" controls="both" :precision="2" />
        <o-input-number v-model="input1" step-strictly :step="20" />
        <o-input-number v-model="input1" :controls="false"/>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input0 = ref<number>(0)
const input1 = ref<number>(0)
</script>