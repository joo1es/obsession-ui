<template>
  <o-space>
    <o-button :icon="Desktop"> Default </o-button>
    <o-button type="primary">
      <template #icon>
        <Triangle />
      </template>
      Primary
    </o-button>
    <o-button type="success" :icon="TabletLandscape" />
    <o-button type="warning" round :icon="Navigate" icon-position="right">
      Warning
    </o-button>
    <o-button type="danger" round :icon="Magnet" />
  </o-space>
</template>

<script lang="ts" setup>
import { Desktop, TabletLandscape, Navigate, Magnet, Triangle } from '@vicons/ionicons5'
</script>
