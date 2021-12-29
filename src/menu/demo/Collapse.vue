<template>
    <o-space vertical>
        激活项： {{ menuActive }}
        <o-button @click="collapse = !collapse">{{ collapse ? '展开' : '折叠' }}</o-button>
        <o-menu v-model="menuActive" :list="menuList" vertical :collapse="collapse" width="300px" />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeOutline, Accessibility, Cafe } from '@vicons/ionicons5'

const collapse = ref(true)

const menuActive = ref('1')
const menuList = [
    {
        title: '菜单一',
        index: '1',
        icon: HomeOutline,
        children: [
            {
                title: '菜单一-1',
                index: '3',
                icon: HomeOutline
            },
            {
                title: '菜单一-2',
                index: '4',
                icon: Accessibility,
                children: [
                    {
                        title: '菜单一-2-1',
                        index: '1-2-1',
                        icon: Cafe,
                        groupName: '分组一'
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