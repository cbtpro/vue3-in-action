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

export default class Star {
  maxStars: number = 1200
  ctx: CanvasRenderingContext2D
  canvas2: HTMLCanvasElement

  orbitRadius: number
  radius: number
  orbitX: number
  orbitY: number
  timePassed: number
  speed: number
  alpha: number
  constructor(config: {
    maxStars: 1200
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    starCanvas: HTMLCanvasElement
  }) {
    const {
      maxStars,
      canvas,
      ctx,
      starCanvas,
    } = config
    this.maxStars = maxStars
    this.ctx = ctx
    this.canvas2 = starCanvas
  
    const w = canvas.width
    const h = canvas.height

    this.orbitRadius = this.random(this.maxOrbit(w, h))
    this.radius = this.random(60, this.orbitRadius) / 12
    // 星星大小
    this.orbitX = w / 2
    this.orbitY = h / 2
    this.timePassed = this.random(0, maxStars)
    this.speed = this.random(this.orbitRadius) / 1000000
    // 星星移动速度
    this.alpha = this.random(2, 10) / 10
  }
  random(min: number, max: number = min) {
    if (min > max) {
      const hold = max
      max = min
      min = hold
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  maxOrbit(x: number, y: number) {
    const max = Math.max(x, y)
    const diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2
    // 星星移动范围，值越大范围越小，
  }
  draw() {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
    const twinkle = this.random(10)

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    this.ctx.globalAlpha = this.alpha
    this.ctx.drawImage(
      this.canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    )
    this.timePassed += this.speed
  }
}