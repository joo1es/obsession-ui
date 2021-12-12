<template>
  <o-grid :default-span="1" :gap="[10, 15]" :cols="4">
    <o-grid-item :row-span="2" class="auto" name="13232323" />
    <o-grid-item :offset="1" />
    <o-grid-item />
    <o-grid-item />
    <o-grid-item />
    <o-grid-item />
  </o-grid>
</template>

<style lang="scss" scoped>
:deep(.o-grid-item) {
  color: #fff;
  background-color: #469;
  height: 30px;
  border-radius: 5px;
  &.auto {
    height: auto;
  }
}
</style>
