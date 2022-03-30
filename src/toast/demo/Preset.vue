<template>
    <o-space>
        <o-button @click="tip()">
            成功
        </o-button>
        <o-button @click="tip1()">
            警告
        </o-button>
        <o-button @click="tip2()">
            信息
        </o-button>
        <o-button @click="tip3()">
            错误
        </o-button>
    </o-space>
</template>

<script lang="ts" setup>
import Toast from '../Toast'

const tip = () => Toast.success('我成功了！')
const tip1 = () => Toast.warning('我被警告了了！')
const tip2 = () => Toast.info('信息呢？')
const tip3 = () => Toast.error('出错了！')
</script>
