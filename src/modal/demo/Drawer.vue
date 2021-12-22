<template>
    <o-modal v-model="show" width="400px" title="对话框" :type="type" from="bottom">
        类型是{{ type }} <o-button @click="type = type === 'drawer' ? 'dialog' : 'drawer'">切换</o-button>
        <template #footer>
            <o-space justify="end">
                <o-button @click="show = !show">
                    取消
                </o-button>
                <o-button type="primary" @click="show = !show">
                    确认
                </o-button>
            </o-space>
        </template>
    </o-modal>
    <o-button @click="show = !show">从下往上拉</o-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const type = ref<'drawer' | 'dialog'>('drawer')
const show = ref(false)
</script>