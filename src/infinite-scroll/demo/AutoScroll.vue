<template>
    <o-infinite-scroll style="height: 300px;" auto hover-to-stop>
        <div v-for="i in 30" :key="i">
            {{ i }}
        </div>
    </o-infinite-scroll>
</template>