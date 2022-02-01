<template>
    <o-space vertical>
        <o-space>
            <o-button @click="percentage += 90">+10</o-button>
            <o-button @click="percentage -= 10">-10</o-button>
        </o-space>
        <o-space>
            <o-progress :percentage="percentage" type="circle" :size="100" appear>
                <template v-if="percentage > 100">
                    爆表了
                </template>
                <template v-else>
                    ~ {{ percentage }}%
                </template>
            </o-progress>
            <o-progress :percentage="percentage" type="circle" :color="{ '0%': 'orange', '100%': 'red' }" :size="100" appear :clockwise="false">
                <template v-if="percentage > 100">
                    爆表了
                </template>
                <template v-else>
                    ~ {{ percentage }}%
                </template>
            </o-progress>
        </o-space>
    </o-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(50)
</script>