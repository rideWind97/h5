/**
 * @description 渲染一个矩形
 * @param canvasDom
 */
export function renderRect(canvasDom: HTMLCanvasElement) {
  // 3、获取 canvas 上下文环境对象
  const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D

  // fillStyle 相当于 css3 的background-color
  ctx.fillStyle = 'green'
  ctx.fillRect(100, 100, 150, 100)
  // 参数 x，y，width，height
}

/**
 * @description 渲染两个矩形，并重叠
 * @param canvasDom
 */
export function renderTwoRect(canvasDom: HTMLCanvasElement) {
  const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D

  ctx.fillStyle = 'rgb(200,0,0)'
  ctx.fillRect(10, 10, 55, 50)

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillRect(30, 30, 55, 50)
}

/**
 * @description 渲染两个矩形，并重叠
 * @param canvasDom
 */
export function studyRectThreeApi(canvasDom: HTMLCanvasElement) {
  const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D

  // fillRect(x, y, width, height)
  // 绘制一个填充的矩形

  // strokeRect(x, y, width, height)
  // 绘制一个矩形的边框

  // clearRect(x, y, width, height)
  // 清除指定矩形区域，让清除部分完全透明

  ctx.fillRect(25, 25, 100, 100)
  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  // ctx.clearRect(45, 45, 60, 60)
  // ctx.strokeRect(50, 50, 50, 50)
  // ctx.strokeStyle = 'red'

  ctx.save()

  ctx.fillStyle = 'red'
  ctx.restore()

  ctx.fillRect(100, 100, 100, 100)
}

/**
 * @description 渲染两个矩形，并重叠
 * @param canvasDom
 */
export function renderPath(canvasDom: HTMLCanvasElement) {
  const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D

  // 绘制三角形
  // ctx.beginPath()
  // ctx.moveTo(110, 10) //起点 将笔触移动到指定的坐标 x 以及 y 上。
  // ctx.lineTo(160, 60)
  // ctx.lineTo(60, 60)
  // ctx.lineTo(110, 10)
  // // 解决锯齿
  // ctx.closePath()

  // // 颜色设置，必须放在绘制之前
  // ctx.strokeStyle = 'blue'
  // // 线宽设置，必须放在绘制之前
  // ctx.lineWidth = 10
  // ctx.stroke() //描边(绘制)
  // ctx.fillStyle = 'red'
  // ctx.fill()

  // 绘制笑脸
  // ctx.beginPath()
  // ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制
  // ctx.moveTo(110, 75)
  // ctx.arc(75, 75, 35, 0, Math.PI, false) // 口 (顺时针)
  // ctx.moveTo(65, 65)
  // ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
  // ctx.moveTo(95, 65)
  // ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
  // ctx.stroke()

  // const sanjiaoxing = new Path2D()
  // sanjiaoxing.moveTo(110, 10)
  // sanjiaoxing.lineTo(160, 60)
  // sanjiaoxing.lineTo(60, 60)
  // sanjiaoxing.lineTo(110, 10)
  // sanjiaoxing.closePath()

  // const weixiao = new Path2D()
  // weixiao.arc(110, 110, 50, 0, Math.PI * 2, true) // 绘制
  // weixiao.moveTo(145, 110)
  // weixiao.arc(110, 110, 35, 0, Math.PI, false) // 口 (顺时针)
  // weixiao.moveTo(85, 90)
  // weixiao.arc(80, 90, 5, 0, Math.PI * 2, true) // 左眼
  // weixiao.moveTo(145, 90)
  // weixiao.arc(140, 90, 5, 0, Math.PI * 2, true) // 右眼

  // ctx.stroke(weixiao)
  // ctx.stroke(sanjiaoxing)
  renderTextAnimation(ctx)
  renderTimeLine(ctx)
}

function renderTimeLine(ctx: CanvasRenderingContext2D) {
  function drawTimeLine(x: number, y: number, len: number, color: string) {
    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + len)
    ctx.stroke()
    ctx.restore()
  }

  function drawText(text: string, x: number, y: number, align: CanvasTextAlign) {
    ctx.save()
    ctx.beginPath()
    ctx.font = '12px PingFang SC'
    ctx.textAlign = align
    ctx.fillStyle = '#000'
    ctx.fillText(text, x, y - 5)
    ctx.restore()
  }

  const totalGapCount = 80
  const gapWidth = 10
  const gapCountPerSecond = 10

  for (let i = 0; i <= totalGapCount; i++) {
    let x = 30.5
    let len = 10
    let color = 'rgba(0, 0, 0, 0.6)'
    const y = 100

    // 此处 +0.5 的原因，
    // 线位置为奇数时，比如 1，将画笔中线对齐坐标轴线，必然有一半线宽在坐标轴线之外，这一半的线宽，如果不是整数，会被自动加满，使之正好对齐一个像素点，1px 就变成了 2px
    // 规则如下:
    //    若线宽为奇数，那么无论如何，线条的矩形区域都坐标都多出0.5像素，于是补满，整体多出了1像素。
    //    若线宽为偶数，那么无论如何，画笔中线总是对齐坐标的，线条宽度不会产生偏差。
    //    若当线宽为小数，那么无论如何，线条的矩形区域都坐标都存在小数，于是补满。整体也会多出1像素。
    x += i * gapWidth

    if (i % gapCountPerSecond === 0) {
      len = 20
      color = 'rgba(0, 0, 0)'

      const align = 'center'

      drawText(`${i}`, x, y, align)
    }

    drawTimeLine(x, y, len, color)
  }
}

function renderTextAnimation(ctx: CanvasRenderingContext2D) {
  let x = 50
  const y = 50
  let dx = 2

  function moveText() {
    requestAnimationFrame(moveText)
    ctx.clearRect(0, 0, 1000, 80)
    ctx.font = '30px Arial'
    ctx.fillText('Time line!', x, y)
    x += dx
    if (x > 1000 || x < 0) {
      dx = -dx
    }
  }

  moveText()
}

export function renderImg(canvasDom: HTMLCanvasElement) {
  const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, 500, 500)
  ctx.save()
  // 创建新 image 对象，用作图案
  const img = new Image()
  img.src = '/bgc.jpeg'

  img.onload = function () {
    // 创建图案
    const wid = img.width
    const hei = img.height
    const com = 0.15
    ctx.drawImage(img, 50, 50, wid * com, hei * com)
    // const ptrn = ctx.createPattern(img, 'no-repeat') as CanvasPattern
    // ctx.fillStyle = ptrn
    // ctx.fillRect(0, 0, 300, 300)
  }

  ctx.restore()

  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.shadowBlur = 2
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'

  ctx.font = '20px Times New Roman'
  ctx.fillStyle = 'Black'
  ctx.fillText('Sample String', 30, 30)
}
