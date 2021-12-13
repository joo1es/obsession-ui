<template>
  <o-collapse v-model="active">
    <o-collapse-item title="面板一" :name="0"> 面板一的内容 </o-collapse-item>
    <o-collapse-item title="面板二" :name="1"> 面板二的内容 </o-collapse-item>
  </o-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref<number>(0)
</script>
