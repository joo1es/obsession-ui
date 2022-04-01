<template>
    <o-notice-bar :icon="Notifications">
        <o-ellipsis>
            荼蘼还没凋零 提醒我 紧紧抱着你
            世界还在下雨 嘲笑着 晴天的远行
            你说我逃不过的死亡就是被人遗忘
            我说你是我人生路上最明媚的忧伤
            <template #title>
                <div>
                    荼蘼还没凋零 提醒我 紧紧抱着你
                </div>
                <div>
                    世界还在下雨 嘲笑着 晴天的远行
                </div>
                <div>
                    你说我逃不过的死亡就是被人遗忘
                </div>
                <div>
                    我说你是我人生路上最明媚的忧伤
                </div>
            </template>
        </o-ellipsis>
    </o-notice-bar>
</template>

<script lang="ts" setup>
import { Notifications } from '@vicons/ionicons5'
</script>