<template>
  <div ref="containerRef" :class="$style['waterfall-flow']">
    <template
      v-for="(good, $index) in goods"
      :key="good.uuid"
    >
      <item
        ref="itemsRef"
        v-if="waterfallInfo.currentProcessIndex >= $index"
        :index="$index"
        :completed="status[$index]"
        @process-next-item="processNextItem"
        @re-process="reProcess"
      >
        <box :good="good" @load-completed="loadCompleted" :index="$index" />
      </item>
    </template>
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

    // 记录瀑布流的信息
    const boxWidth = 300
    const colsNum = Math.floor(document.documentElement.clientWidth / boxWidth)
    const waterfallInfo = reactive<waterfall.info>({
      boxWidth, // 每一个盒子的宽度
      colsNum, // 可以显示多少列
      viewWidth: boxWidth * colsNum, // 容器宽度
      colHeights: new Array(colsNum).fill(0), // 每一列的高度
      currentProcessIndex: 0,
      offsetTop: 0,
      offsetLeft: 0,
    })
    const getIndex = (min: number, array: number[]) => {
      return array.findIndex(x => x <= min)
    }
    const getMinHeight = (array: number[]) => {
      return Math.min.apply(null, array)
    }

    const processNextItem = async (task: () => Promise<[number, HTMLDivElement]>) => {
      const [index, item] = await task()
      const {
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
      } = item
      const colIndex = index % waterfallInfo.colsNum
      const minHeight = getMinHeight(waterfallInfo.colHeights)
      const minColIndex = getIndex(minHeight, waterfallInfo.colHeights)
      if (index < waterfallInfo.colsNum - 1) {
        waterfallInfo.offsetLeft = colIndex * waterfallInfo.boxWidth + item.offsetWidth
        waterfallInfo.offsetTop = waterfallInfo.offsetTop
        waterfallInfo.colHeights[colIndex] = waterfallInfo.colHeights[minColIndex]
      } else {
        waterfallInfo.colHeights[colIndex] = offsetHeight 
        waterfallInfo.offsetLeft = colIndex * waterfallInfo.boxWidth
        waterfallInfo.offsetTop = minHeight + item.offsetHeight
        waterfallInfo.colHeights[colIndex] = waterfallInfo.colHeights[colIndex] + offsetHeight
      }
      waterfallInfo.currentProcessIndex += 1
      console.log('process:', waterfallInfo.currentProcessIndex)
    }
    const reProcess = (index: number) => {
      console.log(index)
    }
    // 提供瀑布流信息
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
      // for (var i = 0; i < boxs.length; i++) {
      //   if (i < colsNum) {
      //     everyH[i] = (boxs[i].firstElementChild as HTMLElement).offsetHeight;
      //   } else {
      //     var minH = Math.min.apply(null, everyH);//获得最小的列的高度
      //     var minIndex = getIndex(minH, everyH); //获得最小列的索引
      //     getStyle((boxs[i].firstElementChild as HTMLElement), minH, (boxs[minIndex].firstElementChild as HTMLElement).offsetLeft, i);
      //     everyH[minIndex] += (boxs[i].firstElementChild as HTMLElement).offsetHeight;//更新最小列的高度
      //   }
      // }
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
    const loadCompleted = (i: number) => {
      status[i] = true
      // nextTick(() => {
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
      processNextItem,
      reProcess,
      goods,
      status,
      loadCompleted,
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
