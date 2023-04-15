// Copyright 2021 peter
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

class Event {
  private events: eventLib.Event[] = []
  private content: any
  constructor() {
  }
  on(name: string | symbol, fn: Function, options: { immediate?: boolean, once?: boolean } = {}) {
    if(!fn || typeof fn !== 'function') {
      throw new Error('fn必须是一个有效的Function');
    }
    const {
      immediate = false,
      once = false
    } = options
    const event = this.findEventByName(name)
    if (!event) {
      if (immediate) {
        fn.apply(this.content)
        if (once) return
      }
      this.events.push({
        name,
        fn,
        immediate,
        once,
      })
    }
  }
  emit(name: string | symbol, ...rest: unknown[]) {
    const event = this.findEventByName(name)
    if (!event) {
      console.warn('事件', name, '没有注册过')
      return
    }
    const {
      fn,
      immediate,
      once,
    } = event
    fn.apply(undefined, rest)
    if (once) {
      this.removeEventByName(name)
      return
    }

  }
  findEventByName(name: string | symbol) {
    return this.events.find(event => event.name === name)
  }
  removeEventByName(name: string | symbol) {
    const index = this.events.findIndex(item => item.name === name)
    if (index >= 0) {
      this.removeEventByIndex(index)
    }
  }
  removeEvent(event: eventLib.Event) {
    let index = this.events.indexOf(event)
    if (index >= 0) {
      this.removeEventByIndex(index)
      return
    }
    index = this.events.findIndex(item => item.name === event.name)
    if (index >= 0) {
      this.removeEventByIndex(index)
      return
    }
  }
  removeEventByIndex(index: number) {
    this.events.splice(index, 1)
  }
}

export default new Event()