<template>
    <o-comment
        author="牛脚书生"
        :avatar="{
            src: 'https://avatars.githubusercontent.com/u/76929557?v=4'
        }"
        bottom-line
    >
        车站曾经是小酒馆……
        <template #actions>
            <span>
                <o-icon style="vertical-align: middle;"><CaretUp /></o-icon>
                置顶
            </span>
            ·
            <span class="comment-time">
                3天前
            </span>
            ·
            <span style="cursor: pointer;">
                回复
            </span>
        </template>
        <template #comment>
            <o-comment
                author="牛脚书生"
                :avatar="{
                    src: 'https://avatars.githubusercontent.com/u/76929557?v=4'
                }"
                left-line
                bottom-line
            >
                你说明天要走更远，<br>
                不想人生留下遗憾。<br>
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
            <o-comment
                author="牛脚书生"
                :avatar="{
                    src: 'https://avatars.githubusercontent.com/u/76929557?v=4'
                }"
                top-line
            >
                小的地方人更有尊严，<br>
                活出个样子给自己看。<br>
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
    </o-comment>
</template>

<script lang="ts" setup>
import { CaretUp } from '@vicons/ionicons5'
</script>