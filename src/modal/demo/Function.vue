<template>
    <o-button @click="openDialog">函数调用</o-button>
</template>

<script lang="ts" setup>
import Dialog from '../../dialog'

const openDialog = () => Dialog({
    title: '危险',
    content: '你确定要这么做吗？',
    confirmProps: {
        type: 'danger'
    }
})
</script>