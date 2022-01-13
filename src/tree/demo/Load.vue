<template>
    <o-tree :list="list" :on-remote="handleOnRemote"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TreeListItemCustom } from '../interface'

const list = ref<TreeListItemCustom[]>([
    {
        key: '1',
        title: '展开',
        children: [{
            key: '1-1',
            title: '1-1',
            remote: true
        }, {
            key: '1-2',
            title: '1-2',
            children: [{
                key: '1-2-1',
                title: '1-2-1'
            }, {
                key: '1-2-2',
                title: '1-2-2',
                disabled: true
            }]
        }]
    }
])
const handleOnRemote = () => new Promise((reslove) => {
    setTimeout(() => {
        reslove([{
            key: '1-1-1',
            title: '1-1-1',
            children: [{
                key: '1-1-1-1',
                title: '1-1-1-1'
            }]
        }])
    }, 500)
})
</script>