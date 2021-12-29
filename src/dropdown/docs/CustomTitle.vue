<template>
    <o-dropdown :list="list" @click="index = $event.title">
        <template #title="{ title }">
            标题-{{ title }}
        </template>
        <o-button>
            {{ index || '下拉' }}
        </o-button>
    </o-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeOutline } from '@vicons/ionicons5'

const list = [
    {
        index: 1,
        icon: HomeOutline,
        title: '注销'
    },
    {
        index: 2,
        title: '选项',
        children: [
            { index: '2-1', title: '选项一', groupName: '分组' },
            { index: '2-2', title: '选项二', groupName: '分组二', divided: true }
        ]
    }
]
const index = ref('')
</script>