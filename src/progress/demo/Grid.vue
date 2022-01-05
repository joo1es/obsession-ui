<template>
    <o-space vertical>
        <o-space>
            <o-button @click="percentage += 10">+10</o-button>
            <o-button @click="percentage -= 10">-10</o-button>
        </o-space>
        <div style="max-width: 400px">
            <o-progress :percentage="percentage" type="grid" :color="{ '0%': 'orange', '100%': 'red' }" border-radius="0" />
        </div>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(50)
</script>