<template>
    <o-space vertical>
        激活项： {{ menuActive }}
        <o-button @click="collapse = !collapse">{{ collapse ? '展开' : '折叠' }}</o-button>
        <o-menu v-model="menuActive" :list="menuList" vertical :collapse="collapse" width="300px" />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeTwotone, ClockCircleTwotone, CloudTwotone } from '@vicons/antd'

const collapse = ref(true)

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
                icon: ClockCircleTwotone,
                children: [
                    {
                        title: '菜单一-2-1',
                        index: '1-2-1',
                        icon: CloudTwotone
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