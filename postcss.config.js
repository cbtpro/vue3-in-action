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

module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应我们设计稿的宽度，一般指retina（一个点两个像素），宽度750
      viewportHeight: 812, // 视窗的高度，对应我们设计稿的高度，可以不配置
      unitPrecision: 5, // 指定`px`转化成视窗单位值的小数位数（很多时候不能整除）
      viewportUnit: 'vw', // 指定需要转换的视窗单位 建议'vw'
      selectorBlackList: ['ignore'], // 指定不需要转换的类
      exclude: [], // 指定不要转换的文件，数组内应该是正则表达式
      minPixelVaule: 1, // 小于或者等于1px不转换为视窗单位
      mediaQuery: false , // 允许在媒体查询中转换'px'
      landscape: false,  // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的视窗单位
      landscapeWidth: 1134 // 横屏时使用的视窗宽度
    }
  }
}