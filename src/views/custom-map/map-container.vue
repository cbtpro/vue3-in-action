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
  <div :class="$style['map-container']">
    <background-chessboard>
      <slot name="default"></slot>
    </background-chessboard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackgroundChessboard from '../../components/Background/Chessboard.vue'

export default defineComponent({
  name: 'map-container',
  components: {
    BackgroundChessboard,
  },
})

</script>

<style module>
.map-container {
  width: 100%;
  height: 100%;
  /* overflow: scroll; */
  overflow: hidden;
  position: relative;
}
.map-container::-webkit-scrollbar {
  display: none;
}
</style>