<template>
    <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
        <o-rotate-album-3d v-slot="{ item }" :list="[1, 2, 3, 4]">
            {{ item }}
        </o-rotate-album-3d>
    </div>
</template>