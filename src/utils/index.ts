/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
export const toThousands = (num: string | number = 0) => {
  return num.toString().replace(/\d+/, (n) => {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}

/**
 *
 * @param str
 * @param isLi 是否是金额厘 需要乘1000
 * @returns
 */
export const fixTableColumnsEmpty = (str: string | number | undefined | null, isLi = false) => {
  if (str || str === 0) {
    return isLi ? Number(str) / 1000 : str
  }
  return '--'
}

/** 获取URL指定参数 */
export function getQueryString(key: string) {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`)
  const result = window.location.search.slice(1).match(reg)
  return result ? decodeURIComponent(result[2]) : null
}

/** 格式化时间 15s => 00:15 */
export const formatTime = (seconds: number) => {
  let t = '00:00:00'
  if (seconds > -1) {
    const hours = Math.floor(seconds / 3600).toString()
    const minutes = Math.floor(Math.floor(seconds / 60) % 60).toString()
    const sec = Math.floor(seconds % 60).toString()
    t = `${hours === '0' ? '' : `${hours.padStart(2, '0')}:`}${minutes.padStart(2, '0')}:${sec.padStart(2, '0')}`
  }
  return t
}

// 文件下载
export const downloadFile = (url: string, name: string) => {
  return new Promise<void>((resolve, reject) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const exten = url.slice(Math.max(0, url.lastIndexOf('.') + 1))
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `${name}.${exten}`
        document.body.append(a)
        a.click()
        a.remove()
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}

const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction')
}

/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined'
}

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}

export const isServer = typeof window === 'undefined'

// 是否为图片节点
export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

// 获取到焦点元素滚动到可视区
export function activeElementScrollIntoView(activeElement: HTMLInputElement | HTMLTextAreaElement, delay = 0) {
  const editable = activeElement.getAttribute('contenteditable')

  // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
  if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' || editable === '' || editable) {
    setTimeout(function () {
      activeElement.scrollIntoView()
    }, delay)
  }
}

/** 获取手机端 */
export function getUserAgent() {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端

  if (isAndroid) {
    return 'Android'
  }

  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

  if (isIOS) {
    return 'IOS'
  }

  return 'unkonw'
}
