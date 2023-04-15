<!--
 Copyright 2023 chenbitao
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
<template>
  <div class="container">
    <div :style="no0Styles" class="time-block">0123456789</div>
    <div :style="no1Styles" class="time-block">0123456789</div>
    <div class="time-split"><span class="split">:</span></div>
    <div :style="no2Styles" class="time-block">0123456789</div>
    <div :style="no3Styles" class="time-block">0123456789</div>
    <div class="time-split"><span class="split">:</span></div>
    <div :style="no4Styles" class="time-block">0123456789</div>
    <div :style="no5Styles" class="time-block">0123456789</div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  onUnmounted
} from "vue"

let time = ref<string>('000000');

const no0Styles = computed(() => {
  const [offset] = time.value;
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})
const no1Styles = computed(() => {
  const offset = time.value[1];
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})
const no2Styles = computed(() => {
  const offset = time.value[2];
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})

const no3Styles = computed(() => {
  const offset = time.value[3];
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})

const no4Styles = computed(() => {
  const offset = time.value[4];
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})

const no5Styles = computed(() => {
  const offset = time.value[5];
  return {
    top: -1 * Number.parseInt(offset, 10) + 'em',
  };
})

const tick = () => {
  const now = new Date()
  const hours = now.getHours();
  const hoursStr = hours < 10 ? Number.parseInt(`0${hours}`, 10) : hours;
  const minutes = now.getMinutes();
  const minutesStr = minutes < 10 ? Number.parseInt(`0${minutes}`, 10) : minutes;
  const seconds = now.getSeconds()
  const secondsStr = seconds < 10 ? Number.parseInt(`0${seconds}`, 10) : seconds;
  const timeStr = `${hoursStr}${minutesStr}${secondsStr}`
  time.value = timeStr;
}

let timer = ref<number | null>(null);
const start = () => {
  tick();
  timer.value = window.setTimeout(() => {
    start();
  }, 1000);
}
onMounted(() => {
  start();
});

onUnmounted(() => {
  if (timer.value) {
    window.clearTimeout(timer.value);
  }
});
</script>

<style lang="postcss" scoped>
.container {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8em;
  height: 1em;
  transform: translate(-50%, -50%);
  /* border: 1px gray solid; */
  overflow: hidden;

.time-split,
.time-block {
  float: left;
  position: relative;
  width: 1em;
  line-height: 1em;
  text-align: center;
  word-wrap: break-word;
  transition: top 0.5s;
  top: 0em;
}
}

</style>
