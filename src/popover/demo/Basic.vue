<template>
  <o-popover :dark="dark" use-v-show>
    <template #target> 点我 </template>
    <o-button @click="dark = !dark">
      {{ dark ? '黑夜' : '白天' }}
    </o-button>
  </o-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dark = ref(false)
</script>
