<template>
    <o-space vertical>
        <o-scroll-bar x-show>
            <div style="height: 400px; overflow: auto;">
                <div style="width: 200%;" :style="{ height: `${height}px` }"></div>
            </div>
        </o-scroll-bar>
        <o-button @click="height += 200">
            增加高度
        </o-button>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const height = ref(800)
</script>