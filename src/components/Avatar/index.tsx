import { memo } from 'react'
import style from './index.module.less'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Avarta from '@/assets/images/Avarta.png'

interface Props {
  src?: string
  online?: boolean
  width?: string
  height?: string
  avatar?: string
  nolazy?: boolean
}

/**
 * @description 头像组件，显示头像，在线功能
 * @param {boolean} online - 在线状态
 * @param {string} width - 头像图片的width
 * @param {string} height - 头像图片的height
 * @param {string} src - 头像图片的地址
 */
function Avatar({ src, avatar, width = '48px', height = '48px', online = false, nolazy = false }: Props) {
  return (
    <div className={`${style.wrap} avatar`} style={{ height }}>
      <LazyLoadImage
        effect='blur'
        placeholderSrc={avatar || Avarta}
        width={width}
        height={height}
        src={src || Avarta}
        style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid #fff' }}
        visibleByDefault={nolazy}
      />
      <span className={style.online} style={{ display: online ? 'block' : 'none' }} />
    </div>
  )
}

export default memo(Avatar)
