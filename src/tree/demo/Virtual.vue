<template>
    <o-tree
        v-model:checked="checked"
        v-model:expends="expends"
        :list="treeList"
        virtual
        filterable
        :animation-max="300"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TreeListItemCustom } from '../interface'

const expends = ref<string[]>(['0', '1', '2', '3'])
const checked = ref<string[]>([])
const treeList = ref<TreeListItemCustom[]>([])

treeList.value = new Array(300).fill(0).map((item, index) => ({
    key: String(index),
    title: String(index),
    children: new Array(200).fill(0).map((it, i) => ({
        key: `${index}-${i}`,
        title: `${index}-${i}`
    }))
}))
</script>