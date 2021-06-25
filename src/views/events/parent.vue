<template>
  <div :class="$style.events">
    当前系统时间: {{now}}
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useEvents from '../../hook/use-events'

export default defineComponent({
  name: 'parent',
  setup() {
    const { $events } = useEvents()
    const now = ref(0)
    const testFn = (args: any) => {
      console.log('触发test事件，args：', args)
      now.value = args
    }
    $events.on('test',  testFn, { once: false, immediate: true })
    return {
      now,
    }
  }
})
</script>

<style module>
.parent {}
</style>