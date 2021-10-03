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

import Star from './Star'
import t5 from '../../../assets/t5.jpg'

export default class {
  constructor() { }
  init(el: HTMLCanvasElement) {
    const canvas: HTMLCanvasElement = el
    // 画布
    // const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)
    const hue = 217
    const stars: Star[] = []
    const maxStars = 1200 // 星星数量
    // 创建星星
    const canvas2 = document.createElement('canvas')
    const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
    canvas2.width = 100
    canvas2.height = 100
    const half = canvas2.width / 2
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
    gradient2.addColorStop(0.025, '#eee')
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
    gradient2.addColorStop(1, 'transparent')

    ctx2.fillStyle = gradient2
    ctx2.beginPath()
    ctx2.arc(half, half, half, 0, Math.PI * 2)
    ctx2.fill()
    // End cache

    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star({
        maxStars: 1200,
        canvas: canvas,
        ctx: ctx,
        starCanvas: canvas2,
      }))
    }

    function drawImage(ctx: CanvasRenderingContext2D, src: string) {
      const image = new Image()
      image.onload = (e) => {
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)
      }
      image.src = src
    }
    function animation() {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.5 // 尾巴
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
      ctx.fillRect(0, 0, w, h)
      drawImage(ctx, t5)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw()
      }
      window.requestAnimationFrame(animation)
    }
    animation()
  }
}