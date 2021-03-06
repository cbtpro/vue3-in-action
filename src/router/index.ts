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

import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {},
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '主页',
    },
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/demo-list',
    name: 'demo-list',
    meta: {
      title: 'demo列表',
    },
    component: () => import('../views/demo-list/index.vue'),
  },
  {
    path: '/custom-map',
    name: 'custom-map',
    meta: {
      title: 'map',
    },
    component: () => import('../views/custom-map/index.vue'),
  },
  {
    path: '/waterfall-flow',
    name: 'waterfall-flow',
    meta: {
      title: '新瀑布流',
    },
    component: () => import('../views/new-waterfall-flow/index.vue'),
  },
  {
    path: '/waterfall-flow1',
    name: 'waterfall-flow1',
    meta: {
      title: '瀑布流',
    },
    component: () => import('../views/waterfall-flow/index.vue'),
  },
  {
    path: '/events',
    name: 'events',
    meta: {
      title: '事件总线',
    },
    component: () => import('../views/events/index.vue'),
  },
  {
    path: '/postcss',
    name: 'postcss',
    meta: {
      title: 'css预处理器',
    },
    component: () => import('../views/postcss/index.vue'),
  },
  {
    path: '/insection-observer',
    name: 'insection-observer',
    meta: {
      title: 'inserction-observer',
    },
    component: () => import('../views/insection-observer/index.vue'),
  },
  {
    path: '/authority',
    name: 'authority',
    meta: {
      title: 'authority',
    },
    component: () => import('../views/authority/index.vue'),
  },
  {
    path: '/star',
    name: 'star',
    meta: {
      title: '星星背景',
    },
    component: () => import('../views/star/index.vue'),
  },
  {
    path: '/swiper-demo',
    name: 'swiper-demo',
    meta: {
      title: 'swiper-demo',
    },
    component: () => import('../views/swiper-demo/index.vue'),
  },
  {
    path: '/debounce',
    name: 'debounce',
    meta: {
      title: 'debounce',
    },
    component: () => import('../views/debounce/index.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})