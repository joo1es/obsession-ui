<template>
    <o-space align="center">
        <o-tag size="small">
            Hello, world.
        </o-tag>
        <o-tag closable :icon="HomeOutline">
            Hello, world.
        </o-tag>
        <o-tag size="medium">
            Hello, world.
        </o-tag>
        <o-tag size="large">
            Hello, world.
        </o-tag>
    </o-space>
</template>

<script lang="ts" setup>
import { HomeOutline } from '@vicons/ionicons5'
</script>