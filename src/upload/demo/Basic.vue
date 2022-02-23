<template>
    <o-upload v-model="files" auto-upload :delete="handleDelete" :upload="handleUpload" multiple :limit="1" accept=".jpg,.png,.webp">
        <template #description>
            允许的文件格式 .jpg,.png,.webp
        </template>
    </o-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFile } from '../index'

const files = ref<UploadFile[]>()

const handleDelete = () => new Promise<void>((resolve) => {
    setTimeout(() => {
        console.log('删除了文件')
        resolve()
    }, 300)
})

const handleUpload = (filterFiles: UploadFile[]) => new Promise<void>((resolve) => {
    const timer = setInterval(() => {
        filterFiles.forEach(file => {
            if (!file.progress && file.progress !== 0) {
                file.progress = 0
            } else {
                file.progress += 1
            }
        })
    }, 15)
    setTimeout(() => {
        filterFiles.forEach(file => {
            file.status = 0
        })
        resolve()
        console.log('上传了文件')
        clearInterval(timer)
    }, 1500)
})
</script>