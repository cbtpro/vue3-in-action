<template>
  <div :class="$style['shop-b']"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'shop-b',
})

</script>

<style module>
.shop-b {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: red;
}
</style>
