<template>
    <div style="background-color: #f5f5f5; padding: 10px; overflow: auto;">
        <o-cascader v-model:menus="menu" :props="{ key: 'name' }" use-radio @add="handleAdd" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CascaderMenuDisplay } from '../index'

const menu = ref([
    {
        id: 1,
        name: 'test',
        route: '/'
    },
    {
        id: 2,
        name: 'test2',
        route: '/',
        children: [
            {
                id: 1,
                name: 'test3',
                route: '/'
            },
            {
                id: 2,
                name: 'test4',
                route: '/'
            }
        ]
    },
    {
        id: 1,
        name: 'test33',
        route: '/'
    }
])

const handleAdd = ({ menus, parent }: CascaderMenuDisplay) => {
    if (!parent) {
        menus.push({
            name: 'test' + Math.random()
        })
        return
    }
    if (!parent.children) {
        parent.children = []
    }
    (parent.children as any).push({
        name: 'test' + Math.random()
    })
}
</script>