<template>
  <div :class="$style['shop-a']" @click.stop="test"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'shop-a',
  setup() {
    const test = (e: MouseEvent) => {
      console.log(1)
    }
    return {
      test,
    }
  },
})

</script>

<style module>
.shop-a {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: yellow;
}
</style>
