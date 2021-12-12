<template>
  <o-space>
    <o-button :icon="Add"> Default </o-button>
    <o-button type="primary">
      <template #icon>
        <AccumulationSnow />
      </template>
      Primary
    </o-button>
    <o-button type="success" :icon="MacOption" />
    <o-button type="warning" round :icon="Cad" icon-position="right">
      Warning
    </o-button>
    <o-button type="danger" round :icon="MailAll" />
  </o-space>
</template>

<script lang="ts" setup>
import { Add, AccumulationSnow, Cad, MacOption, MailAll } from '@vicons/carbon'
</script>
