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
import events from '../../utils/event'
import perf from '../../utils/perf'
import http from '../../utils/http'
import demoServices from '../../services/demo'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $events: typeof events;
    $http: typeof http;
    $perf: typeof perf;
    $demoServices: typeof demoServices;
  }
}