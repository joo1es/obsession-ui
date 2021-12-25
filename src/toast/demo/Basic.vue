<template>
    <o-space>
        <o-button @click="tip">
            白色提示
        </o-button>
        <o-button @click="tip(true)">
            黑色提示
        </o-button>
        <o-button @click="tip2">
            VNode
        </o-button>
        <o-button @click="tip3">
            自定义色彩
        </o-button>
    </o-space>
</template>

<script lang="ts" setup>
import Toast from '../Toast'
import { h } from 'vue'

const tip = (dark = false) => Toast({
    dark,
    message: '这是一个提示'
})

const tip2 = () => Toast({
    message: h('span', {
        style: {
            fontSize: '20px',
            lineHeight: 2
        }
    }, '超级大提示'),
    placement: 'center'
})

const tip3 = () => Toast({
    message: '上传成功',
    placement: 'top',
    style: {
        color: 'green'
    }
})
</script>