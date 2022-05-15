<template>
    <input v-model="filter" />
    <o-tree
        ref="treeRef"
        v-model:checked="checked"
        v-model:expands="expands"
        :list="treeList"
        :filter="filter"
        virtual
        filterable
        :animation-max="300"
        height="200px"
        auto-expands
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TreeListItemCustom } from '../interface'

const expands = ref<string[]>(['0', '1', '2', '3'])
const checked = ref<string[]>([])
const treeList = ref<TreeListItemCustom[]>([])

const filter = ref('')

treeList.value = new Array(300).fill(0).map((item, index) => ({
    key: String(index),
    title: String(index),
    children: new Array(200).fill(0).map((it, i) => ({
        key: `${index}-${i}`,
        title: `${index}-${i}`
    }))
}))
</script>