<!--
 Copyright 2021 peter
 
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
  <div :class="$style['map']">
    <map-container>
      <map-container-inner>
        <shops />
      </map-container-inner>
    </map-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from './map-container.vue'
import MapContainerInner from './map-container-inner.vue'
import Shops from './shops/index.vue'
import useApi from '../../api/use-api'

export default defineComponent({
  name: 'custom-map',
  components: {
    MapContainer,
    MapContainerInner,
    Shops,
  },
  setup() {
    const { request } = useApi()
    const testApi = async () => {
        try {
          const response = await request({
          url: '/api/index/test',
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    testApi()
    return {
      name: 'peter',
    }
  },
});
</script>

<style module>
.map {
  width: 80vw;
  height: 80vh;
}
</style>
