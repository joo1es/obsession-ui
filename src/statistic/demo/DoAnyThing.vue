<template>
    <o-space :size="20" style="width: 200px;" vertical>
        <o-statistic
            label="全国人口"
            :label-style="{ color: 'blue' }"
            value="13"
            :value-style="{ fontWeight: 'bold', fontSize: '32px' }"
            prefix="约"
            suffix="亿人"
            vertical
        >
            <template #label>
                <o-icon>
                    <PaperClipOutlined />
                </o-icon>
                全国人口
            </template>
        </o-statistic>
        <o-statistic vertical align="center" :label-style="{ color: 'red', fontSize: '18px' }">
            <template #label>
                <o-icon>
                    <DeliveredProcedureOutlined />
                </o-icon>
                世界主要国家和地区
            </template>
            190
            <template #suffix>
                <o-icon color="red"><UpOutlined/></o-icon> 多个
            </template>
        </o-statistic>
        <o-statistic vertical align="end" reverse style="background-color: #f5f5f5; padding: 5px 15px 10px 15px;" value-style="color: green">
            <template #label>
                Pay for it Now!
            </template>
            300$
            <template #suffix>
                Off
            </template>
        </o-statistic>
    </o-space>
</template>

<script lang="ts" setup>
import { PaperClipOutlined, DeliveredProcedureOutlined, UpOutlined } from '@vicons/antd'
</script>