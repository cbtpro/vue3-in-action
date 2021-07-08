<template>
  <div :class="$style.item" :style="itemStyle">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, nextTick, onBeforeUpdate, onMounted } from 'vue'

export default defineComponent({
  name: 'item',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const itemStyle = computed(() => {
      let top = 0
      let left = 0
      return {
        // position: 'absolute',
        // top: top + 'px',
        // left: left + 'px',
      } as CSSProperties
    })

    onBeforeUpdate(() => {

    })
    const test = () => {
      alert(1)
    }
    // onMounted(() => {
    //   nextTick(() => {
    //     nextFall()
    //   })
    // })
    return {
      itemStyle,
      test,
    }
  },
})
</script>

<style module>
.item {
  display: block;
}
</style>