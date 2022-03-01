<template>
    <o-button id="test" @click="show = !show">显示</o-button>
    <o-image-preview v-model:show="show" v-model:index="index" :images="images"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PreviewImage } from '../interface'

const index = ref(0)

const show = ref(false)
const images = ref<PreviewImage[]>([
    {
        src: 'https://avatars.githubusercontent.com/u/76929557?v=4',
        element: '#test'
    },
    {
        src: 'https://github.githubassets.com/images/modules/signup/gc_banner_light.png',
        points: [
            {
                position: [100, 100],
                description: '这是第二张图'
            }
        ]
    }
])
</script>