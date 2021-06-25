<template>
  <div :class="$style.events">
    <parent>
      <child />
    </parent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Parent from './parent.vue'
import Child from './child.vue'

export default defineComponent({
  name: 'events',
  components: {
    Parent,
    Child,
  },
  setup() {
    return {}
  }
})
</script>

<style module>
.events {}
</style>