<template>
    <o-space :size="20" style="width: 200px;" vertical>
        <o-statistic label="全国人口" value="13" prefix="约" suffix="亿人" vertical/>
        <o-statistic vertical align="center">
            <template #label>
                世界主要国家和地区
            </template>
            190
            <template #suffix>
                多个
            </template>
        </o-statistic>
        <o-statistic vertical align="end" reverse>
            <template #label>
                世界主要国家和地区
            </template>
            190
            <template #suffix>
                多个
            </template>
        </o-statistic>
    </o-space>
</template>