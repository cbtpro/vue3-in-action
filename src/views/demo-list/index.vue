<template>
  <div :class="[$style['demo-list']]" @click="handler">demo-list{{store.now}}</div>
</template>

<script lang="ts">
import {  defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useHomeStore } from '../../store';

export default defineComponent({
  name: 'demo-list',
  setup() {
    const store = useHomeStore()
    const router = useRouter()
    return {
      store,
      handler() {
        router.push({
          path: '/home',
        })
      },
    }
  },
})

</script>

<style module>
.demo-list {
  color: red;
}
</style>
