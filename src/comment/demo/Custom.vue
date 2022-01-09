<template>
    <o-comment
        :avatar="{
            src: 'https://avatars.githubusercontent.com/u/76929557?v=4',
            size: 30
        }"
        :indent="2"
    >
        车站曾经是小酒馆……
        <template #author>
            <o-space size="3" align="center">
                <a href="#">牛脚书生</a><o-icon style="vertical-align: middle" color="green"><CheckmarkCircle /></o-icon> @ <a href="#">其他人</a>
            </o-space>
        </template>
        <template #actions>
            <span class="comment-time">
                3天前
            </span>
            ·
            <span style="cursor: pointer;">
                回复
            </span>
        </template>
    </o-comment>
</template>

<script lang="ts" setup>
import { CheckmarkCircle } from '@vicons/ionicons5'
</script>