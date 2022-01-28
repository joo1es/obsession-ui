<template>
    <o-upload :model-value="list" :show-button="false" multiple drop disabled>
        <template #description>
            已上传文件：
        </template>
    </o-upload>
</template>

<script lang="ts" setup>
const list = [
    {
        name: 'a.jpg',
        url: '#'
    },
    {
        name: 'b.jpg'
    }
]
</script>