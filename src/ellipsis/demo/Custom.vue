<template>
    <o-space vertical size="0">
        <o-ellipsis title="何必在意那一点点温存" :line="2">
            早知道伤心总是难免的<br>
            你又何苦一往情深<br>
            因为爱情总是难舍难分<br>
            何必在意那一点点温存<br>
        </o-ellipsis>
        <o-ellipsis :line="2" :tooltip="{
            placement: 'bottom',
            dark: false
        }">
            <template #title>
                何必在意那一点点温存
            </template>
            早知道伤心总是难免的<br>
            你又何苦一往情深<br>
            因为爱情总是难舍难分<br>
            何必在意那一点点温存<br>
        </o-ellipsis>
        <o-ellipsis :line="2" no-tooltip>
            <template #title>
                何必在意那一点点温存
            </template>
            早知道伤心总是难免的<br>
            你又何苦一往情深<br>
            因为爱情总是难舍难分<br>
            何必在意那一点点温存<br>
        </o-ellipsis>
    </o-space>
</template>

<script lang="ts">
</script>