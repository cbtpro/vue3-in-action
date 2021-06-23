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

export class Debounce {
  static use(action: Function, idle: number = 300, immediate: boolean = false) {
    let last: number | undefined
    return (...rest: any) => {
      if (last) window.clearTimeout(last)
      if (immediate) {
        if (!last) action.apply(this, rest)
        last = window.setTimeout(() => {
          last = undefined
        }, idle)
      } else {
        last = window.setTimeout(() => {
          action.apply(this, rest)
        }, idle)
      }
    }
  }
}

export class Throttle {
  static use(action: Function, idle: number = 300, immediate: boolean = true) {
    if (immediate) {
      let lastTime: number
      return (...rest: any) => {
        const now = Date.now()
        if(now - lastTime > idle) { 
          action.apply(this, rest)
          lastTime = now
        }
      }
    } else {
      let lastTime: number | undefined
      return (...rest: any) => {
        if (!lastTime) {
          action.apply(this, rest)
          lastTime = window.setTimeout(() => {
            if (lastTime) window.clearTimeout(lastTime)
            lastTime = undefined
          }, idle)
        }
      }
    }
  }
}

export default {
  Debounce,
  Throttle,
}