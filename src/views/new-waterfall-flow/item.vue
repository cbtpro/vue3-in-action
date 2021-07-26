<template>
  <div ref="itemRef" v-if="isCompeleted" :class="$style.item" :style="itemStyle">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue'
import { WATERFALL_INFO_KEY } from './index.vue'

const STATUS_BEFORE_RENDER = 0
const STATUS_COMPLETE = 2

export default defineComponent({
  name: 'item',
  props: {
    index: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    
    // const currentInstance = getCurrentInstance()
    const waterfallInfo = <waterfall.info>inject(WATERFALL_INFO_KEY)
    const isCompeleted = computed(() => {
      return props.index <= waterfallInfo.currentProcessIndex
    })
    const status = ref(STATUS_BEFORE_RENDER)
    const {
      offsetTop,
      offsetLeft,
    } = waterfallInfo
    const top = ref(offsetTop)
    const left = ref(offsetLeft)
    const itemStyle = computed(() => {
      return {
        top: top.value + 'px',
        left: left.value + 'px',
      } as CSSProperties
    })
    watch(() => itemStyle, (value, oldValue) => {
      console.log('需要重绘')
      emit('re-process', props.index)
    })
    onBeforeUpdate(() => {

    })
    const test = () => {
      alert(1)
    }
    // onMounted(() => {
    //   nextTick(() => {
    //     // console.log(currentInstance)
    //     status.value = STATUS_COMPLETE
    //       emit('process-next', () => {
    //         return new Promise<void>((resolve, reject) => {
    //           // setTimeout(() => {
    //             resolve()
    //           // }, props.index * 1000)
    //         })
    //       })
    //   })
    // })
    onUpdated(() => {
      // console.log(props.index, itemStyle)
    })
    const itemRef = ref<HTMLDivElement>()
    watch(() => props.completed, (value, oldValue) => {
      if (value && value !== oldValue) {
        emit('process-next-item', () => {
            return new Promise<[number, HTMLDivElement]>((resolve, reject) => {
                // const {
                //   clientWidth,
                //   clientHeight,
                // } = <HTMLDivElement>itemRef.value
                console.log(`${props.index} 渲染完成，继续渲染下一个`)
                resolve([props.index, <HTMLDivElement>itemRef.value])
              // }, props.index * 1000)
            })
        })
      }
    })
    return {
      itemStyle,
      test,
      waterfallInfo,
      isCompeleted,
      itemRef,
    }
  },
})
</script>

<style module>
.item {
  position: absolute;
}
</style>