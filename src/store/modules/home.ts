// Copyright 2022 cbtpro
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

import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { TIME_FMT } from '../../config/index'

export const useHomeStore = defineStore({
  id: 'home',
  state: () => {
    return {
      now: Date.now()
    }
  },
  getters: {
    nowFmt(state) {
      return dayjs(state.now).format(TIME_FMT)
    },
  },
  actions: {
    updateDate() {
      this.now = dayjs(this.now).add(1, 'd').valueOf()
    },
  },
})