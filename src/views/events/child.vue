<template>
  <div :class="$style.events">
    <button @click="test">触发事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEvents from '../../hook/use-events'

export default defineComponent({
  name: 'parent',
  setup() {
    const { $events } = useEvents()
    const test = () => {
      $events.emit('test', Date.now())
    }
    return {
      test,
    }
  }
})
</script>

<style module>
.parent {}
</style>