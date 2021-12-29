<template>
    <o-button-group>
        <o-button class="test" :loading="loading" round @click="handleClick">
            {{ loading ? '加载中了' : '点我加载' }}
        </o-button>
        <o-button class="test" :loading="loading" @click="handleClick">
            {{ loading ? '加载中了' : '点我加载' }}
        </o-button>
        <o-button
            type="primary"
            :loading="loading"
            :icon="Desktop"
            @click="handleClick"
        />
    </o-button-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Desktop } from '@vicons/ionicons5'

const loading = ref(false)
const handleClick = () => {
    loading.value = !loading.value
    if (loading.value)
        setTimeout(() => {
            loading.value = false
        }, 3000)
}
</script>
