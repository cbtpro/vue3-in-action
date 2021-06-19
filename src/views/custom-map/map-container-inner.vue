// Copyright 2021 cbtpro
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

<template>
  <div ref="mapRef" :class="$style['map-container-inner']">
    <img :src="t5" alt="">
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
} from 'vue'
import t5 from '../../assets/t5.jpg'

export default defineComponent({
  name: 'map-container-inner',
  setup() {
    const mapRef = ref<HTMLDivElement>()
    const getMapInfo = () => {
      const mapElement = <HTMLDivElement>mapRef.value
      const view = <HTMLDivElement>mapElement.offsetParent
      const {
        clientWidth: viewWidth,
        clientHeight: viewHeight,
      } = view
      const {
        clientWidth: mapWidth,
        clientHeight: mapHeight,
      } = mapElement
      return {
        size: {
          width: mapWidth,
          height: mapHeight,
        },
        center: {
          top: (mapHeight - viewHeight) / 2,
          left: (mapWidth - viewWidth) / 2,
          x: mapWidth / 2,
          y: mapHeight / 2,
        },
        range: {
          startX: 0,
          startY: 0,
          endX: mapWidth - viewWidth,
          endY: mapHeight - viewHeight,
        },
      }
    }
    let startX = 0;
    let startY = 0;
    let x = 0;
    let y = 0;
    const touchstartHandle = function(e: TouchEvent) {
      console.log('trigger touchstart')
      const mapDiv = <HTMLDivElement>mapRef.value
      startX = e.targetTouches[0].pageX;
      startY = e.targetTouches[0].pageY;
      x = mapDiv.offsetLeft;
      y = mapDiv.offsetTop;
    }
    const touchmoveHandle = function(e: TouchEvent) {
      console.log('trigger touchmove')
      const mapDiv = <HTMLDivElement>mapRef.value

      const mapInfo = getMapInfo()
      var movex = e.targetTouches[0].pageX - startX;
      var movey = e.targetTouches[0].pageY - startY;
      let left = x + movex
      let top = y + movey
      const {
        range: {
          startX: mapStartX,
          startY: mapStartY,
          endX: mapEndX,
          endY: mapEndY,
        },
      } = mapInfo
      console.log(mapInfo)
      console.log(top, left)
      if (left > mapStartX) {
        left = mapStartX
      }
      if (top > mapStartY) {
        top = mapStartY
      }
      if (left < -mapEndX) {
        left = -mapEndX
      }
      if (top < -mapEndY) {
        top = -mapEndY
      }
      mapDiv.style.left = left + 'px';
      mapDiv.style.top = top + 'px';
      e.preventDefault();
    }
    const touchendHandle = function(e: TouchEvent) {
      console.log('touchend')
    }
    const mousedownHandle = function(e: MouseEvent) {
      console.log('down')
    }
    const mousemoveHandle = function(e: MouseEvent) {
      console.log('move')
    }
    const mouseupHandle = function(e: MouseEvent) {
      console.log('up')
    }
    const bindOperatorEvent = () => {
      const mapDiv = <HTMLDivElement>mapRef.value
      mapDiv.addEventListener('touchstart', touchstartHandle);
      mapDiv.addEventListener('touchmove', touchmoveHandle)
      mapDiv.addEventListener('touchend', touchendHandle)
  
      mapDiv.addEventListener('mousedown', mousedownHandle)
      mapDiv.addEventListener('mousemove', mousemoveHandle)
      mapDiv.addEventListener('mouseup', mouseupHandle)

      mapDiv.addEventListener('pointerdown', mousedownHandle)
      mapDiv.addEventListener('pointermove', mousemoveHandle)
      mapDiv.addEventListener('pointerup', mouseupHandle)
    }
    const initMap = () => {
      const mapInfo = getMapInfo()
      const mapDiv = <HTMLDivElement>mapRef.value
      const {
        center: {
          x,
          y,
          top,
          left,
        },
      } = mapInfo
      mapDiv.style.top = -top + 'px'
      mapDiv.style.left = -left + 'px'
    }
    const loadHandle = () => {
      initMap()
      bindOperatorEvent()
    }
    const init = () => {
      window.addEventListener('load', loadHandle)
    }
    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    const unBindOperaterEvent = () => {
      window.removeEventListener('load', loadHandle)
    }
    const destoryOperatorEvent = () => {
      const mapDiv = <HTMLDivElement>mapRef.value
      mapDiv.removeEventListener('touchstart', touchstartHandle);
      mapDiv.removeEventListener('touchmove', touchmoveHandle)
      mapDiv.removeEventListener('touchend', touchendHandle)
      mapDiv.removeEventListener('mousedown', mousedownHandle)
      mapDiv.removeEventListener('mousemove', mousemoveHandle)
      mapDiv.removeEventListener('mouseup', mouseupHandle)
    }
    onBeforeUnmount(() => {
      unBindOperaterEvent()
      destoryOperatorEvent()
    })
    return {
      mapRef,
      t5,
    }
  },
})

</script>

<style module>
.map-container-inner {
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;

  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
</style>
