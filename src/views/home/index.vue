<template>
  <div>{{name}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      name: 'peter',
    }
  },
})
</script>

<style module>
.home {
  width: 100vw;
  height: 100vh;
}
</style>