<template>
    <o-menu v-model="menuActive" :list="menuList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeTwotone, ApiTwotone, TagTwotone } from '@vicons/antd'

const menuActive = ref('1')
const menuList = [
    {
        title: '菜单一',
        index: '1',
        icon: HomeTwotone,
        children: [
            {
                title: '菜单一-1',
                index: '3',
                icon: HomeTwotone
            },
            {
                title: '菜单一-2',
                index: '4',
                icon: ApiTwotone,
                children: [
                    {
                        title: '菜单一-2-1',
                        index: '1-2-1',
                        icon: TagTwotone
                    },
                    {
                        title: '菜单一-2-1',
                        index: '1-1-2'
                    }
                ]
            }
        ]
    },
    {
        title: '菜单二',
        index: '2'
    }
]
</script>