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
import MapContainer from '@/views/custom-map//map-container.vue'
import MapContainerInner from '@/views/custom-map/map-container-inner.vue'
import Shops from '@/views/custom-map/shops/index.vue'
import useApi from '../../api/use-api'
import useHttp from '../../api/use-http'
import useDemoService from './use-demo-service'

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
          const response = await request<ITest>({
          url: '/index/test',
        })
        console.log('testApi: ', response.data.now)
      } catch (error) {
        console.log(error)
      }
    }
    testApi()

    const { http } = useHttp()
    const testHttp = async () => {
      try {
        const response = await http<ITest>({
          url: '/index/test',
        })
        console.log('testUseHttp', response.data.now)
      } catch (error) {
        console.log(error)
      }
    }
    testHttp()
    const { queryTest } = useDemoService()
    const testUseDemoService = async () => {
      const response = await queryTest({
        id: '1',
      })
      console.log('测试use-demo-services：', response.data.now)
    }
    testUseDemoService()
    return {
      name: 'peter',
    }
  },
  created() {
    this.testHttp()
  },
  mounted() {
    console.log('测试插件$perf:', this.$perf)
    console.log('测试插件$http:', this.$http)
  },
  methods: {
    async testHttp() {
      try {
        const re = await this.$demoServices.test<ITest>()
        console.log('测试this.$demoServices.test', re.data.now)
        const response = await this.$http<ITest>({
          method: 'get',
          url: '/index/test'
        })
        console.log('testHttp:', response.data.now)
      } catch (error) {
        console.log(error)
      } finally {
        // 收尾操作
      }
    },
  },
});
</script>

<style module>
.map {
  width: 80vw;
  height: 80vh;
}
</style>
