<template>
    <o-contain
        v-slot="{ getStyle }"
        background="url(https://images.unsplash.com/photo-1650171766529-c4cc0db06f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)"
        blur
        style="color: #fff; height: 500px"
        dev
    >
        <span :style="getStyle({ fontSize: '60px', top: 100, left: 100, width: 200, height: 200, padding: '20px' })">Hello, World.</span>
        <span :style="getStyle({ fontSize: '60px', top: 500, left: 500, width: 300, height: 200, padding: '20px' })">Hello, World.</span>
    </o-contain>
</template>

<script lang="ts" setup>
</script>