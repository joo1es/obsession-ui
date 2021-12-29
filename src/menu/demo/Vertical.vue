<template>
    <o-menu v-model="menuActive" :list="menuList" vertical />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeOutline } from '@vicons/ionicons5'

const menuActive = ref('3')
const menuList = [
    {
        title: '菜单一',
        index: '1',
        icon: HomeOutline,
        children: [
            {
                title: '菜单一-1',
                index: '3',
                icon: HomeOutline,
                groupName: '分组一'
            }
        ]
    },
    {
        title: '菜单二',
        index: '2'
    }
]
</script>