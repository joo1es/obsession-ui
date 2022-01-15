<template>
    <o-space vertical>
        <o-button @click="disabled = !disabled">{{ disabled ? '不' : '' }}省略</o-button>
        <o-button @click="ellipsis = !ellipsis">{{ ellipsis ? '要' : '不要' }}省略号</o-button>
        <o-omit size="10px" :disabled="disabled" :ellipsis="ellipsis" style="width: 200px">
            <o-omit-item>
                <div class="block" />
            </o-omit-item>
            <o-omit-item omit>
                <div class="block" />
            </o-omit-item>
            <o-omit-item omit>
                <div class="block" />
            </o-omit-item>
            任意元素穿插
            <o-omit-item>
                <div class="block" />
            </o-omit-item>
        </o-omit>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
const ellipsis = ref(true)
</script>

<style lang="scss">
.block {
    height: 50px;
    background-color: #f5f5f5;
    border-radius: 5px;
}
</style>