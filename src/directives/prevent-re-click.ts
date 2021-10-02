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
import { DirectiveBinding } from 'vue'

export default {
  name: 'prevent-re-click',
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('click', () => {
      if (!el.style.pointerEvents) {
        el.style.pointerEvents = 'none'
        setTimeout(() => {
          el.style.pointerEvents = ''
        }, binding.value || 3000)
      }
    })
  },
  beforeUnmount(el: HTMLElement) {
  }
}
