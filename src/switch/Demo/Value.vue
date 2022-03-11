:::demo
```vue
<template>
    <o-switch v-model="data" :active-value="1" :inactive-value="0" :active-text="String(data)" :inactive-text="String(data)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(1)
</script>
```
:::