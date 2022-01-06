<template>
    <o-space vertical>
        <o-button @click="disabled = !disabled">禁用</o-button>
        <o-radio-group v-model="checked" :disabled="disabled" size="large">
            <o-radio v-for="value in values" :key="value" :value="value" :label="value" />
        </o-radio-group>
        选中值：{{ checked }}
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const values = ref<string[]>(['1', '2', '3'])
const checked = ref<string>('1')
const disabled = ref(false)
</script>