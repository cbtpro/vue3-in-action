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

import { DirectiveBinding, VNode } from 'vue'
import store from '../store'

const updateHandle = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode)  => {
  const roles: IUserRole[] = store.getters['authority/roles']
  const rolenames = roles.map(role => role.rolename)
  const {
    modifiers,
    value,
  } = binding
  const isAccordWith = rolenames.some(rolename => value === rolename)
  if (!isAccordWith) {
    if (modifiers['hidden']) {
      el.style.display = 'none'
    } else if (['BUTTON', 'INPUT'].indexOf(el.tagName) !== -1) {
      if (modifiers['display']) {
        el.style.display = ''
      } else if (modifiers['disabled']) {
        el.setAttribute('disabled', 'disabled')
      }
    } else {
      el.style.pointerEvents = 'none'
    }
    el.style.filter = 'grayscale(100%)'
    el.setAttribute('disabled', 'disabled')
  } else {
    console.log('移除禁用限制')
  }
}

export default {
  name: 'authority',
  created: updateHandle,
  mounted: updateHandle,
  updated: updateHandle,
}