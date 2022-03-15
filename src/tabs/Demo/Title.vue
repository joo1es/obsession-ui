<template>
    <o-tabs v-model="active" closable lazy title-only>
        <o-tab>
            <template #title>
                只要热烈，都好过温存
            </template>
            1
        </o-tab>
        <o-tab title="几经冷漠，也不屑容忍" />
        <o-tab title="清风徐来，水波不兴" />
        <o-tab title="那个剧本，没有分生" />
    </o-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>