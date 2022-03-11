<template>
    <o-switch v-model="data" :active-value="1" :inactive-value="0" width="200" border-radius="4" active-color="orange" style="--o-switch-button-width: 50px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(1)
</script>