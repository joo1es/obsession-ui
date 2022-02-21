<template>
    <div style="overflow: auto">
        <o-pull-refresh style="height: 300px" :refresh="refresh" wheel-refresh>
            使用 touch 下拉或者使用鼠标滚轮向上滚动
        </o-pull-refresh>
    </div>
</template>

<script lang="ts" setup>
const refresh = () => new Promise<void>(resolve => {
    setTimeout(resolve, 3000)
})
</script>