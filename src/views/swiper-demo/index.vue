<template>
  <div :class="$style.swiper">
    <swiper
      :initial-slide="2"
      :slides-per-view="1"
      :space-between="50"
      :loop="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
    </swiper>
    <div ref="swiperRef" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
      </div>
    </div>
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :speed="600"
      :parallax="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      class="mySwiper"
    >
      <template v-slot:container-start>
        <div
          class="parallax-bg"
          :style="{
            'background-image': 'url(https://swiperjs.com/demos/images/nature-1.jpg)',
          }"
          data-swiper-parallax="-23%"
        ></div>
      </template>
      <swiper-slide>
        <div class="title" data-swiper-parallax="-300">Slide 1</div>
        <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            第一个
          </p>
        </div> </swiper-slide
      ><swiper-slide>
        <div class="title" data-swiper-parallax="-300">Slide 2</div>
        <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            第二个
          </p>
        </div> </swiper-slide
      ><swiper-slide>
        <div class="title" data-swiper-parallax="-300">Slide 3</div>
        <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            第三个
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Parallax, Pagination, Navigation } from 'swiper'

SwiperCore.use([Parallax, Pagination, Navigation])

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './style.css'

export default defineComponent({
  name: 'swiper-demo',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper: SwiperCore) => {
      console.log(swiper);
    };
    const onSlideChange = (swiper: SwiperCore) => {
      console.log('slide change');
      console.log('realIndex', swiper.realIndex);
      console.log('activeIndex', swiper.activeIndex);
    };
    const swiperRef = ref<HTMLDivElement>()
    const initSwiper = () => {
      const swiperInstance = new SwiperCore(<HTMLDivElement>swiperRef.value, {
        initialSlide: 5,
        speed: 400,
        spaceBetween: 100,
        loop: true,
        on: {
          slideChange(swiper) {
            console.log(swiper.realIndex)
          },
        },
      })
    }
    onMounted(() => {
      initSwiper()
    })
    return {
      onSwiper,
      onSlideChange,
      swiperRef,
    };
  },
});
</script>

<style lang="postcss" module>
.swiper {
}
</style>
