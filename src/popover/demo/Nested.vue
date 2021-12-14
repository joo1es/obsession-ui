<template>
  <o-popover>
    <template #target>
      <o-button> 点我 </o-button>
    </template>
    <o-popover :to="false">
      <template #target>
        <o-button> 点我 </o-button>
      </template>
      <o-popover :to="false">
        <template #target>
          <o-button> 点我 </o-button>
        </template>
        <o-popover :to="false">
          <template #target>
            <o-button> 点我 </o-button>
          </template>
          没了
        </o-popover>
      </o-popover>
    </o-popover>
  </o-popover>
</template>
