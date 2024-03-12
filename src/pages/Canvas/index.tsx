/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react'
import { renderImg, renderPath, renderRect, renderTwoRect, studyRectThreeApi } from './canvas'
import style from './index.module.less'

function Test() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDraggingRef = useRef(false)

  // const canvasInit = () => {
  //   const canvasDom = canvasRef.current as HTMLCanvasElement

  //   // 使用canvas渲染一些图形
  //   // renderRect(canvasDom)
  //   // renderTwoRect(canvasDom)
  //   // studyRectThreeApi(canvasDom)
  //   renderPath(canvasDom)
  //   // renderImg(canvasDom)
  // }

  function dragEnd() {
    isDraggingRef.current = false
  }

  // useEffect(() => {
  //   const canvasDom = canvasRef.current as HTMLCanvasElement

  //   renderPath(canvasDom)

  //   const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D
  //   const img = new Image()
  //   img.src = '/bgc.jpeg'

  //   img.onload = function () {
  //     // 创建图案
  //     const wid = img.width
  //     const hei = img.height
  //     const com = 0.15
  //     ctx.drawImage(img, 0, 0, wid * com, hei * com)
  //     // const ptrn = ctx.createPattern(img, 'no-repeat') as CanvasPattern
  //     // ctx.fillStyle = ptrn
  //     // ctx.fillRect(0, 0, 300, 300)
  //   }

  //   function draw(x: number, y: number) {
  //     ctx.clearRect(0, 0, 1000, 500)
  //     const wid = img.width
  //     const hei = img.height
  //     const com = 0.15
  //     ctx.drawImage(img, x, y, wid * com, hei * com)
  //   }

  //   function dragStart(e: any) {
  //     e.preventDefault()
  //     isDraggingRef.current = true
  //   }

  //   function drag(e: any) {
  //     if (isDraggingRef.current) {
  //       draw(e.offsetX, e.offsetY)
  //     }
  //   }

  //   canvasDom.addEventListener('mousedown', dragStart)
  //   canvasDom.addEventListener('mousemove', drag)
  //   canvasDom.addEventListener('mouseup', dragEnd)
  //   canvasDom.addEventListener('touchstart', dragStart)
  //   canvasDom.addEventListener('touchmove', drag)
  //   canvasDom.addEventListener('touchend', dragEnd)

  //   return () => {
  //     canvasDom.removeEventListener('mousedown', dragStart)
  //     canvasDom.removeEventListener('mousemove', drag)
  //     canvasDom.removeEventListener('mouseup', dragEnd)
  //     canvasDom.removeEventListener('touchstart', dragStart)
  //     canvasDom.removeEventListener('touchmove', drag)
  //     canvasDom.removeEventListener('touchend', dragEnd)
  //   }
  // }, [])

  useEffect(() => {
    const canvasDom = canvasRef.current as HTMLCanvasElement

    renderPath(canvasDom)
  }, [])

  return (
    <div>
      <h1>canvas page</h1>
      <div>
        <canvas ref={canvasRef} width='1000' height='500' className={style['canvas-wrap']} />
      </div>
    </div>
  )
}

export default memo(Test)
