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

import originAxios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from '../config'

const axios = originAxios.create({
  baseURL: BASE_URL,
  timeout: 20000,
})

axios.interceptors.response.use(
  <T>(response: AxiosResponse<IResponseData<T>>): Promise<any> => {
    return Promise.resolve(response.data)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default function http<T>(config: AxiosRequestConfig) {
  return axios(config) as unknown as IResponseData<T>
}