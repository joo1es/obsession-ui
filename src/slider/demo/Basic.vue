<template>
    <o-space vertical>
        <o-slider v-model="data"/>
        <o-slider v-model="data" reverse />
        <o-space>
            <o-slider v-model="data" vertical :marks="{ 30: '30%', 50: 'middle', 80: '80%' }" />
            <o-slider v-model="data" vertical reverse :marks="{ 0: '', 30: '30%', 50: 'middle', 80: '80%' }" />
        </o-space>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(60)
</script>