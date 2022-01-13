<template>
    <o-tree :list="list" draggable/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
    {
        key: '1',
        title: '展开',
        children: [{
            key: '1-1',
            title: '1-1'
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
</script>