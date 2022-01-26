<template>
  <div>now: {{now}}</div>
  <div>nowFmt: {{nowFmt}}</div>
  <button @click="updateDate">下一天</button>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHomeStore } from './store-use-pinia'
import HelloWorld from './components/HelloWorld.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const homeStore = useHomeStore()
    const { updateDate, } = homeStore
    const { now, nowFmt, } = storeToRefs(homeStore)
    return {
      now,
      nowFmt,
      updateDate,
    }
  },
})
</script>

<style>
html,
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
