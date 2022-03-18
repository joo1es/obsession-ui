<template>
    <o-rate :model-value="5" :max="8" show-text readonly>
        <template #text="{ rate }">
            现在是 {{ rate }} / 8
        </template>
    </o-rate>
</template>