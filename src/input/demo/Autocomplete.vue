<template>
    <o-space vertical>
        <o-input
            v-model="input"
            placeholder='请输入'
            clearable
            autocomplete
            :autocomplete-list="[{ value: '可以' }, { value: '接收' }, {value: '一个'}, {value:'列表'}]"
        />
        <o-input
            v-model="input"
            placeholder='请输入'
            clearable
            autocomplete
            :autocomplete-list="getList"
        />
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref<string>()

const getList = () => new Promise<{value: string, label?: string}[]>((resolve) => {
    setTimeout(() => {
        resolve([{value: '也可以是一个'}, {value: 'async', label: '异步'}, {value: 'Promise'}])
    }, 1000)
})
</script>
