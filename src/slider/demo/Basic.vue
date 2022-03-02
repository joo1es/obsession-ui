<template>
    <o-slider v-model="data" />
    <o-slider v-model="data" reverse />
    <o-space>
        <o-slider v-model="data" vertical />
        <o-slider v-model="data" vertical reverse />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(60)
</script>