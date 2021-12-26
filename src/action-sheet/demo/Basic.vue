<template>
    <o-space>
        <o-button @click="show = true">显示组件</o-button>
        <o-button @click="show2 = true">显示“对话框”样式组件</o-button>
    </o-space>
    <o-action-sheet
        v-model="show"
        description="这是一段描述"
        from="bottom"
        :list="[
            {
                title: '收藏',
                icon: StarOutlined
            },
            {
                title: '设为特别关注',
                description: '首页优先显示 TA 的内容',
                icon: PullRequestOutlined,
                click: (record, done) => done()
            }
        ]"
    />
    <o-action-sheet
        v-model="show2"
        description="这是一段描述"
        type="dialog"
        :handler="false"
        :list="[
            {
                title: '收藏',
                icon: StarOutlined,
                disabled: true
            },
            {
                title: '设为特别关注',
                description: '首页优先显示 TA 的内容',
                icon: PullRequestOutlined
            }
        ]"
    />
</template>

<script lang="ts" setup>
import { StarOutlined, PullRequestOutlined } from '@vicons/antd'
import { ref } from 'vue'

const show = ref(false)
const show2 = ref(false)
</script>