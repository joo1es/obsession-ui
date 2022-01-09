<template>
    <o-virtual-list v-slot="{ item }" style="height: 300px" :item-size="50" :items="list" item-resizable>
        <div class="auto-item" :style="{ height: item.height + 'px' }">
            {{ item.key }}
        </div>
    </o-virtual-list>
</template>

<script lang="ts" setup>
const list = new Array(10000).fill(0).map((item, index) => ({
    height: Math.random() * 30 + 50,
    key: index + 1
}))
</script>

<style scoped>
.auto-item {
    min-height: 50px;
}
</style>