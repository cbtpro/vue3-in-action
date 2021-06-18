<template>
  <div :class="[$style['demo-list']]" @click="handler">demo-list{{store.state.home.systemTime}}</div>
</template>

<script lang="ts">
import {  defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'demo-list',
  setup() {
    const store = useStore()
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
