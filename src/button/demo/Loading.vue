<template>
  <o-space>
    <o-button class="test" :loading="loading" @click="handleClick">
      {{ loading ? '加载中了' : '点我加载' }}
    </o-button>
    <o-button
      type="primary"
      :loading="loading"
      :icon="DribbbleCircleFilled"
      @click="handleClick"
    />
  </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DribbbleCircleFilled } from '@vicons/antd'

const loading = ref(false)
const handleClick = () => {
    loading.value = !loading.value
    if (loading.value)
        setTimeout(() => {
            loading.value = false
        }, 3000)
}
</script>
