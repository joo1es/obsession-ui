<template>
    <o-menu v-model="menuActive" :list="menuList" vertical />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeTwotone } from '@vicons/antd'

const menuActive = ref('3')
const menuList = [
    {
        title: '菜单一',
        index: '1',
        icon: HomeTwotone,
        children: [
            {
                title: '菜单一-1',
                index: '3',
                icon: HomeTwotone,
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