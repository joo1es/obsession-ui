<template>
  <o-space>
    <o-button :icon="TwitterOutlined"> Default </o-button>
    <o-button type="primary">
      <template #icon>
        <TagsTwotone />
      </template>
      Primary
    </o-button>
    <o-button type="success" :icon="MacCommandFilled" />
    <o-button type="warning" round :icon="NodeExpandOutlined" icon-position="right">
      Warning
    </o-button>
    <o-button type="danger" round :icon="MailOutlined" />
  </o-space>
</template>

<script lang="ts" setup>
import { TwitterOutlined, MacCommandFilled, NodeExpandOutlined, MailOutlined, TagsTwotone } from '@vicons/antd'
</script>
