<template>
    <O-overlay v-model="show" />
    <O-button @click="show = !show">显示遮罩</O-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>