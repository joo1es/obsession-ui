<template>
    <o-grid :default-span="8">
        <o-grid-item>
            <o-tree
                ref="treeRef"
                v-model:checked="checked"
                :list="treeList"
                :props="{ key: 'node_id', title: 'node_name' }"
                :get-key="getKey"
                virtual
                filterable
            />
        </o-grid-item>
        <o-grid-item>
            <o-space vertical align="center" justify="center" style="height: 300px;">
                <o-button @click="handleAdd">添加</o-button>
                <o-button @click="handleDelete">减少</o-button>
            </o-space>
        </o-grid-item>
        <o-grid-item>
            已选中 {{ checked2.length }} / {{ treeList2.length }}
            <o-tree
                ref="treeRef2"
                v-model:checked="checked2"
                :list="treeList2"
                :props="{ key: 'node_id', title: 'node_name' }"
                :get-key="getKey"
                virtual
                filterable
            />
        </o-grid-item>
    </o-grid>
</template>

<script lang="ts" setup>
import tree from './tree.json'

import { ref } from 'vue'

import type { TreeListItemCustom } from '../interface'

const checked = ref<string[]>([])
const checked2 = ref<string[]>([])
const treeList = ref<TreeListItemCustom[]>(tree.groups)
const treeList2 = ref<TreeListItemCustom[]>([])

const treeRef = ref()
const treeRef2 = ref()

const handleAdd = () => {
    treeList2.value = Array.from(new Set([...treeList2.value, ...treeRef.value.getCheckedItems()]))
    checked.value = []
}

const handleDelete = () => {
    const treeListSet = new Set(treeList2.value)
    treeRef2.value.getCheckedItems().forEach((item: TreeListItemCustom) => {
        treeListSet.delete(item)
    })
    treeList2.value = Array.from(treeListSet)
    checked2.value = []
}

const getKey = (item: TreeListItemCustom) => item.union_node_id || item.node_id
</script>