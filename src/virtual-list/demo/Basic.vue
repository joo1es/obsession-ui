<template>
    <o-space vertical>
        <o-space>
            <o-button @click="to1000">滚动到 index 为 1000 的位置</o-button>
            <o-button @click="to5000">滚动到 key 为 5000 的位置</o-button>
            <o-button @click="toTop">平滑滚动到最上方</o-button>
        </o-space>
        <o-virtual-list ref="listRef" v-slot="{ item, index }" style="height: 300px" :item-size="50" :items="list">
            <div class="item">
                key: {{ item.key }} / index: {{ index }}
            </div>
        </o-virtual-list>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = new Array(10000).fill(0).map((item, index) => ({
    key: index + 1
}))

const listRef = ref()

const to1000 = () => {
    if (!listRef.value) return
    listRef.value.scrollTo({
        index: 1000
    })
}

const to5000 = () => {
    if (!listRef.value) return
    listRef.value.scrollTo({
        key: 5000
    })
}

const toTop = () => {
    if (!listRef.value) return
    listRef.value.scrollTo({
        position: 'top',
        behavior: 'smooth'
    })
}
</script>

<style scoped>
.item {
    height: 50px;
}
</style>