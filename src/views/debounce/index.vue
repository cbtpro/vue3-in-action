<template>
  <div>
    <button @click="okHandle('peter')">测试debounce，请打卡控制台</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import usePref from '../../hook/use-perf'

const name = 'debounce'
export default defineComponent({
  name,
  setup() {
    const { debounce, } = usePref()
    const testDebounce = (name: string) => {
      console.log(name, Date.now())
    }
    const okHandle = debounce(testDebounce, 1000, true)
    return {
      okHandle,
    }
  },
})
</script>

<style>

</style>