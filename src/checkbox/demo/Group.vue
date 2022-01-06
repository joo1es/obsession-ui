<template>
    <o-space vertical>
        <o-checkbox v-model="checkedAll" label="全选" :indeterminate="checked.length > 0" />
        <o-checkbox-group v-model="checked" size="large">
            <o-checkbox v-for="value in values" :key="value" :value="value" :label="value" />
        </o-checkbox-group>
        选中值：{{ checked.join(', ') }}
    </o-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const values = ref<string[]>(['1', '2', '3'])
const checked = ref<string[]>(['1'])
const checkedAll = computed<boolean>({
    get: () => checked.value.length === values.value.length,
    set: (value) => {
        if (value) {
            checked.value = [...values.value]
        } else {
            checked.value = []
        }
    }
})
</script>