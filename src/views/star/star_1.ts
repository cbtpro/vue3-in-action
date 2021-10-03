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

import t5 from '../../assets/T5.jpg'

export default function canvasFn() {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
  // const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const w = (canvas.width = window.innerWidth)
  const h = (canvas.height = window.innerHeight)

  const hue = 217
  const stars: Star[] = []
  const maxStars = 1200 // 星星数量
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
  function random(min: number, max: number = min) {
    if (min > max) {
      const hold = max
      max = min
      min = hold
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function maxOrbit(x: number, y: number) {
    const max = Math.max(x, y)
    const diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2
    // 星星移动范围，值越大范围越小，
  }
  function drawImage(ctx: CanvasRenderingContext2D, src: string) {
    const image = new Image()
    image.onload = (e) => {
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)
    }
    image.src = src
  }
  class Star {
    orbitRadius: number
    radius: number
    orbitX: number
    orbitY: number
    timePassed: number
    speed: number
    alpha: number
    constructor() {
      this.orbitRadius = random(maxOrbit(w, h))
      this.radius = random(60, this.orbitRadius) / 12
      // 星星大小
      this.orbitX = w / 2
      this.orbitY = h / 2
      this.timePassed = random(0, maxStars)
      this.speed = random(this.orbitRadius) / 1000000
      // 星星移动速度
      this.alpha = random(2, 10) / 10
    }
    draw() {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
      const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
      const twinkle = random(10)

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05
      }

      ctx.globalAlpha = this.alpha
      ctx.drawImage(
        canvas2,
        x - this.radius / 2,
        y - this.radius / 2,
        this.radius,
        this.radius
      )
      this.timePassed += this.speed
    }
  }

  for (let i = 0; i < maxStars; i++) {
    stars.push(new Star())
  }

  function animation() {
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 0.5 // 尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
    // 清理画布
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