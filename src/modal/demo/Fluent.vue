<template>
    <o-modal v-model="show" width="400px" title="对话框" :overlay="{
        background: 'rgba(225, 225, 225, 0.376)',
        blur: true,
        useVShow: true
    }">
        这里是内容
        <template #footer>
            <o-space justify="end">
                <o-button @click="show = !show">
                    取消
                </o-button>
                <o-button type="primary" @click="show2 = !show2">
                    确认
                </o-button>
                <o-modal v-model="show2" width="300px" :show-close="false" no-overlay>
                    确认要确认吗？
                    <template #footer>
                        <o-button type="danger" block @click="show = false">
                            确认
                        </o-button>
                    </template>
                </o-modal>
            </o-space>
        </template>
    </o-modal>
    <o-button @click="show = !show"> 一个Fluent风格的对话框 </o-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const show2 = ref(false)
</script>
