<template>
  <div>now: {{now}}</div>
  <div>nowFmt: {{nowFmt}}</div>
  <button @click="updateDate">下一天</button>
  <animation-time />
  <hello-world msg="Hello World!" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useHomeStore } from './store-use-pinia'
import HelloWorld from './components/HelloWorld.vue'
import { storeToRefs } from 'pinia'
import AnimationTime from './components/animation-time/index.vue';

const homeStore = useHomeStore()
const { updateDate, } = homeStore
const { now, nowFmt, } = storeToRefs(homeStore)
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
