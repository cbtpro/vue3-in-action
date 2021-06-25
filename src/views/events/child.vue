<template>
  <div :class="$style.child">
    <button @click="test">触发事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEvents from '../../hook/use-events'

export default defineComponent({
  name: 'child',
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
.child {}
</style>