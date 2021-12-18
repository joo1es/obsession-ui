<template>
  <o-g :default-span="1" :gap="[10, 15]" :cols="4">
    <o-gi v-for="number in 20" :key="number" />
  </o-g>
</template>

<style lang="scss" scoped>
:deep(.o-grid-item) {
  color: #fff;
  background-color: #f5f5f5;
  height: 30px;
  border-radius: 5px;
}
</style>
