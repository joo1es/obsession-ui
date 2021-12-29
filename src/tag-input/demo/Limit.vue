<template>
    <o-tag-input v-model="tags" :max="3" :limit="5" clearable :delimiter="[',']" trim />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref<string[]>(['1', '2', '3', '4'])
</script>