<template>
    <o-upload auto-upload :upload="handleUpload" multiple drop />
</template>

<script lang="ts" setup>
import type { UploadFile } from '../index'

const handleUpload = (filterFiles: UploadFile[]) => new Promise<void>((resolve) => {
    setTimeout(() => {
        filterFiles.forEach(file => {
            file.status = 0
        })
        resolve()
    }, 300)
})
</script>