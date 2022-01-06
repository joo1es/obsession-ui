<template>
    <o-space>
        <o-radio label="20px" size="small" border-radius="20px" />
        <o-radio label="30%" border-radius="30%">
            <template #checked>
                <SearchOutline />
            </template>
        </o-radio>
        <o-radio label="0" size="large" border-radius="0" />
    </o-space>
</template>

<script lang="ts" setup>
import { SearchOutline } from '@vicons/ionicons5'
</script>