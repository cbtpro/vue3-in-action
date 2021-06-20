<template>
  <shop-a :class="$style['shop-a']" />
  <shop-b :class="$style['shop-b']"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShopA from './shop-a.vue'
import ShopB from './shop-b.vue'

export default defineComponent({
  name: 'shops',
  components: {
    ShopA,
    ShopB,
  },
})

</script>

<style module>
.shops {}
.shop-a {
  left: 300px;
  top : 150px;
}
.shop-b {
  top: 500px;
  left: 100px;
}
</style>
