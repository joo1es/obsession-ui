<template>
    <o-modal v-model="show" width="400px" title="对话框">
        这里是内容
        <template #footer>
            <o-space justify="end">
                <o-button @click="show = !show">
                    取消
                </o-button>
                <o-button type="primary" @click="show2 = !show2">
                    确认
                </o-button>
                <o-modal v-model="show2" width="300px" :show-close="false">
                    确认要确认吗？
                    <template #footer>
                        <o-button type="danger" block @click="show2 = false; show = !show">
                            确认
                        </o-button>
                    </template>
                </o-modal>
            </o-space>
        </template>
    </o-modal>
    <o-button @click="show = !show">显示模态框</o-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const show2 = ref(false)
</script>