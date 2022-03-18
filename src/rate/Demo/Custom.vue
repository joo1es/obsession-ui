<template>
    <o-rate style="--o-rate-active-color: red; --o-rate-size: 24px; --o-rate-gap: 2px;">
        <template #text="{ rate, active }">
            现在是 {{ active || rate }} 分
        </template>
    </o-rate>
</template>