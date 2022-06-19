<template>
    <o-masonry
        :cols="3"
        :gutter="30"
    >
      <div v-for="(item, index) in 30" :key="index">Item: {{index + 1}}</div>
    </o-masonry>
</template>

<script lang="ts" setup>

</script>