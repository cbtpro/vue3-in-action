<template>
  <div>
    <ul>
      <li v-for="router in routers" :key="router.path">
        <router-link :to="router.path">{{router?.meta?.title || router.path}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()
    return {
      name: 'peter',
      routers: router.options.routes,
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