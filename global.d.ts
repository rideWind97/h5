declare module '*.scss'
declare module '*.svg'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'
declare module '*.mp3'

declare module 'moment' {
  import { Dayjs } from 'dayjs'

  namespace moment {
    type Moment = Dayjs
  }
  export = moment
  export as namespace moment
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
  VITE_INSPECT: boolean
}

interface VisualViewport extends EventTarget {
  width: number
  height: number
  scale: number
  offsetTop: number
  offsetLeft: number
  pageTop: number
  pageLeft: number
}

// eslint-disable-next-line
declare global {
  interface Window {
    visualViewport?: VisualViewport
  }
}
