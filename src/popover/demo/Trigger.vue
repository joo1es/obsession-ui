<template>
  <o-space>
    <o-popover>
      <template #target>
        <o-button> 点击 Click </o-button>
      </template>
      你好
    </o-popover>
    <o-popover trigger="hover">
      <template #target>
        <o-button> 鼠标 Hover </o-button>
      </template>
      你好
    </o-popover>
    <o-popover trigger="focus">
      <template #target>
        <o-button> 聚焦 Focus </o-button>
      </template>
      你好
    </o-popover>
    <o-popover v-model="show" trigger="none">
      <template #target>
        <o-button @dblclick="show = !show"> 主动 None （双击触发） </o-button>
      </template>
      你好
    </o-popover>
  </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
