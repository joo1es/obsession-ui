<template>
    <o-upload :model-value="list" multiple drop preset="card" />
</template>

<script lang="ts" setup>
const list = [
    {
        name: 'a.jpg',
        url: 'https://avatars.githubusercontent.com/u/26594629?v=4'
    },
    {
        name: 'b.jpg'
    },
    {
        name: 'c.jpg',
        status: 2
    },
    {
        name: 'd.jpg',
        status: 3
    }
]
</script>