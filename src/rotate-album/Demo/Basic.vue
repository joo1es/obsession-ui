<template>
    <div style="height: 150px; padding: 30px 50px; display: flex; align-items: center; justify-content: center;">
        <o-rotate-album v-slot="{ item }" :list="[1, 2, 3, 4]" show-path path-color="#000">
            <div style="background: #000; color: #fff; width: 50px; height: 100px; display: flex; align-items: center; justify-content: center;">
                {{ item }}
            </div>
        </o-rotate-album>
    </div>
</template>