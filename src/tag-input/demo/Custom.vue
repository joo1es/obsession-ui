<template>
    <o-tag-input v-model="tags" clearable :delimiter="[',']" :space-props="{ size: 5 }">
        <template #tag="{ tag, close }">
            <span :style="{ lineHeight: 'var(--o-taginput-line-height)' }" @click="close">{{ tag }},</span>
        </template>
    </o-tag-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref<string[]>([])
</script>