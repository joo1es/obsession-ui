<template>
  <o-button @click="show = !show">点我</o-button>
  <collapse-transition>
    <div v-if="show">
      <o-button>出现我</o-button>
    </div>
  </collapse-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
