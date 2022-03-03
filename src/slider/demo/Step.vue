<template>
    <o-slider v-model="data" :marks="{ 30: '30%', 50: 'middle', 80: '80%' }" :show-tip="true" :step="10"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(20)
</script>