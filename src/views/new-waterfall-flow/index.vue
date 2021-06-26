<template>
  <div ref="containerRef" :class="$style['waterfall-flow']">
    <item
      ref="itemsRef"
      v-for="(good, $index) in goods"
      :key="good.uuid"
      :index="$index"
      :completed="status[$index]"
      @process-next="processNext"
    >
      <box :good="good" @completed="completed" :index="$index" />
    </item>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUpdated, provide, reactive, ref, useCssModule, watch } from 'vue'
import usePerf from '../../hook/use-perf'
import Item from './item.vue'
import Box from './box.vue'
import img1 from '@/assets/images/1.jpg'
import img2 from '@/assets/images/2.jpg'
import img3 from '@/assets/images/3.jpg'
import img4 from '@/assets/images/4.jpg'
import img5 from '@/assets/images/5.jpg'
import img6 from '@/assets/images/6.jpg'
import img7 from '@/assets/images/7.jpg'
import img8 from '@/assets/images/8.jpg'
import img9 from '@/assets/images/9.jpg'
import img10 from '@/assets/images/10.jpg'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
]

export const WATERFALL_INFO_KEY = 'WATERFALL_INFO_KEY'

export default defineComponent({
  name: 'waterfall-flow',
  components: {
    Item,
    Box,
  },
  setup() {
    const containerRef = ref<HTMLDivElement>()
    const itemsRef = ref<HTMLDivElement[]>([])
    const $style = useCssModule();

    // 当前正在渲染的索引
    const waterfallInfo = reactive<waterfall.info>({
      boxWidth: 816,
      colsNum: Math.floor(document.documentElement.clientWidth / 816),
      viewWidth: 816 * 2,
      colHeights: [],
      currentProcessIndex: 0
    })
    const processNext = async (task: () => Promise<void>) => {
      await task()
      waterfallInfo.currentProcessIndex += 1
      console.log('process:', waterfallInfo.currentProcessIndex)
    }
    provide(WATERFALL_INFO_KEY, waterfallInfo)
    const currentProcessIndexs = ref<number[]>([])

    const goods = ref<IGood[]>([])
    watch(() => goods, () => {
      const lastIndex = currentProcessIndexs.value[currentProcessIndexs.value.length - 1]
      currentProcessIndexs.value = [lastIndex + 1, lastIndex + 2, lastIndex + 3, lastIndex + 4]
    })

    const requestData = () => {
      return new Promise<IGood[]>((resolve, reject) => {
        setTimeout(() => {
          const result: IGood[] = new Array(10).fill(0)
            .map((v, i) => {
              const goodName = Date.now() + i + ''
              const good: IGood = {
								uuid: goodName,
								name: goodName,
								title: `商品${goodName}`,
								src: images[i],
                href: 'https://www.baidu.com',
								price: Math.random() * 18,
              }
              return good
            })
          resolve(result)
        }, 800)
      })
    }
    
    /**
     * 瀑布流主函数
     * @param  wrap	[Str] 外层元素的ID
     * @param  box 	[Str] 每一个box的类名
     */
    function PBL() {
      //	1.获得外层以及每一个box
      var wrap = <HTMLDivElement>containerRef.value;
      var boxs = getClass(wrap);
      if (boxs.length === 0) return
      //	2.获得屏幕可显示的列数
      var boxW = (boxs[0].firstElementChild as HTMLElement).offsetWidth;
      var colsNum = Math.floor(document.documentElement.clientWidth / boxW);
      wrap.style.width = boxW * colsNum + 'px';//为外层赋值宽度
      //	3.循环出所有的box并按照瀑布流排列
      var everyH = [];//定义一个数组存储每一列的高度
      for (var i = 0; i < boxs.length; i++) {
        if (i < colsNum) {
          everyH[i] = (boxs[i].firstElementChild as HTMLElement).offsetHeight;
        } else {
          var minH = Math.min.apply(null, everyH);//获得最小的列的高度
          var minIndex = getIndex(minH, everyH); //获得最小列的索引
          getStyle((boxs[i].firstElementChild as HTMLElement), minH, (boxs[minIndex].firstElementChild as HTMLElement).offsetLeft, i);
          everyH[minIndex] += (boxs[i].firstElementChild as HTMLElement).offsetHeight;//更新最小列的高度
        }
      }
    }
    /**
     * 设置加载样式
     * @param  box 	[obj] 设置的Box
     * @param  top 	[Num] box的top值
     * @param  left 	[Num] box的left值
     * @param  index [Num] box的第几个
     */
    var getStartNum = 0;//设置请求加载的条数的位置
    function getStyle(box: HTMLElement, top: number, left: number, index: number) {
      if (getStartNum >= index) return
      box.style.position = 'absolute'
      box.style.top = top + 'px'
      box.style.left = left + 'px'
      // box.style.opacity = '0'
      // $(box).stop().animate({
      //   "opacity" : "1"
      // }, 999);
      getStartNum = index;//更新请求数据的条数位置
    }
    /**
     * 获取最小列的索引
     * @param  minH	 [Num] 最小高度
     * @param  everyH [Arr] 所有列高度的数组
     */
    function getIndex(minH: number, everyH: number[]): number {
      let i = 0
      for (let index in everyH) {
        if (everyH[index] == minH)
          i = Number(index)
      }
      return i
    }
    const nextFall = (data: IGood[] = []) => {
      goods.value = goods.value.concat(data)
    }
    /**
     * 获取类元素
     * @param  warp		[Obj] 外层
     * @param  className	[Str] 类名
     */
    function getClass(wrap: HTMLElement) : HTMLCollection {
      return wrap.children
    }
    /**
     * 获得最后一个box所在列的高度
     */
    function getLastH() {
      var wrap = <HTMLDivElement>containerRef.value
      var boxs = getClass(wrap)
      return (boxs[boxs.length - 1] as HTMLElement).offsetTop
          + (boxs[boxs.length - 1] as HTMLElement).offsetHeight
    }
    /**
     * 数据请求检验
     */
    function getCheck() {
      var documentH = document.documentElement.clientHeight
      var scrollH = document.documentElement.scrollTop || document.body.scrollTop
      return documentH + scrollH >= getLastH() ? true : false;
    }
    async function getNextPage() {
      const data: IGood[] = await requestData()
      nextFall(data)
    }
    // const debounce =  (action: Function, idle: number = 300) =>{
    //   let last: number
    //   return (...rest: any) =>{
    //     if (last) window.clearTimeout(last)
    //     last = window.setTimeout(() =>{
    //         action.apply(this, rest)
    //     }, idle)
    //   }
    // }
    // const throttle = (action: Function, idle: number = 300) =>{
    //   var lastTime = 0
    //   return (...rest: any) => {
    //     var now = Date.now()
    //     if(now - lastTime > idle) { 
    //       action.apply(this, rest)
    //       lastTime = now
    //     }
    //   }
    // }
    onUpdated(() => {
      setTimeout(() => {
        // PBL()
      }, 1000)
    })
    const { Throttle } = usePerf()
    onMounted(() => {
      nextTick(() => {
        getNextPage()
        //设置滚动加载
        window.onscroll = new Throttle().use(async function () {
          console.log('onscroll')
          //校验数据请求
          if (getCheck()) {
            const data: IGood[] = await requestData()
            nextFall(data)
          }
        }, 800)
      })
    })
    const status = reactive<boolean[]>([])
    const completed = (i: number) => {
      status[i] = true
      // nextTick(() => {
      //   debugger
      //   const {
      //     clientWidth,
      //     clientHeight,
      //   } = itemsRef.value[i]
      //   console.log(
      //     clientWidth,
      //     clientHeight,
      //   )
      //   console.log(itemsRef.value[i])
      // })
    }
    return {
      containerRef,
      itemsRef,
      waterfallInfo,
      processNext,
      goods,
      status,
      completed,
    }
  },
})
</script>

<style module>
.waterfall-flow {
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
}
</style>
