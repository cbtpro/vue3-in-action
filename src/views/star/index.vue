<template>
  <div :class="$style.star">
    <canvas ref="demo1Ref" :class="$style.demo1" width="400" height="400"></canvas>
    <canvas ref="demo2Ref" :class="$style.demo2" id="canvas" width="400" height="400"></canvas>
    <canvas ref="demo3Ref" id="canvas1" width="400" height="400"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Star from '../../components/background/star'
import canvasFn from './star_1'
import Star1 from './star'

export default defineComponent({
  name: 'star',
  setup() {
    const demo1Ref = ref<HTMLCanvasElement>()
    const initStar1 = () => {

    const canvas: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)

    const canvas2 = document.createElement('canvas')
    const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
      const star1 = new Star1(w, h, ctx, ctx2, canvas2)
      star1.draw()
    }
    onMounted(() => {
      const star = new Star().init(<HTMLCanvasElement>demo1Ref.value)
      canvasFn()
      initStar1()
    })
    return {
      demo1Ref,
    }
  },
})
</script>

<style lang="postcss" module>
.star {
  width: 375px;
  height: 100vh;
  background-color: #e7e7e7;
}
.demo1 {
  width: 100%;
  height: 300px;
  background-color: #efef66;
}
.demo2 {
  width: 100%;
  height: 300px;
  background-color: grey;
}
.demo3 {
  /* width: 400px;
  height: 400px; */
  background-color: #00ff61;
}
</style>
