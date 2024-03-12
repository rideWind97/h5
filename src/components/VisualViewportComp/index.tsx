import * as React from 'react'

interface VisualViewportComponentProps {
  className?: string
  style?: React.CSSProperties
}

interface VisualViewportComponentState {
  visualViewport: VisualViewport | null
  windowInnerWidth: number
  windowInnerHeight: number
}

function isMobile() {
  const flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  return flag
}

const mo = function (e) {
  e.preventDefault()
}
export function stop() {
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, { passive: false }) //禁止页面滑动
}

export function move() {
  document.body.style.overflow = '' //出现滚动条
  document.removeEventListener('touchmove', mo, { passive: false })
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default class VisualViewportComponent extends React.Component<{}, VisualViewportComponentState> {
  state: VisualViewportComponentState = {
    visualViewport: null,
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight
  }

  componentDidMount() {
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('resize', this.onVisualViewportChange)
      window.visualViewport.addEventListener('scroll', this.onVisualViewportChange)
    }
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.removeEventListener('resize', this.onVisualViewportChange)
      window.visualViewport.removeEventListener('scroll', this.onVisualViewportChange)
    }
    window.removeEventListener('resize', this.onResize)
  }

  onVisualViewportChange = (e: Event) => {
    this.setState({
      visualViewport: (e.target as VisualViewport) || window.visualViewport
    })
  }

  onResize = () => {
    this.setState({
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight
    })
  }

  getStyles() {
    const { visualViewport, windowInnerWidth, windowInnerHeight } = this.state

    // 开启 3D Transform，让 fixed 的子元素相对于容器定位
    // 同时自身也设置为 fixed，以便在非放大情况下不需要频繁移动位置
    const styles: React.CSSProperties = {
      position: 'fixed',
      maxWidth: 440,
      ...(this.props.style || {})
    }

    // 支持 VisualViewport API 情况下直接计算
    if (visualViewport != null) {
      // 需要针对 iOS 越界弹性滚动的情况进行边界检查
      styles.left =
        Math.max(0, Math.min(document.documentElement.scrollWidth - visualViewport.width, visualViewport.offsetLeft)) +
        'px'

      // 需要针对 iOS 越界弹性滚动的情况进行边界检查
      styles.top =
        Math.max(0, Math.min(document.documentElement.scrollHeight - visualViewport.height, visualViewport.offsetTop)) +
        'px'

      styles.width = visualViewport.width + 'px'
      styles.height = visualViewport.height + 'px'
    } else {
      // 不支持 VisualViewport API 情况下（如 iOS 8~12）
      styles.top = '0'
      styles.left = isMobile() ? 0 : '34%'
      styles.width = windowInnerWidth + 'px'
      styles.height = windowInnerHeight + 'px'
    }

    return styles
  }

  render() {
    return (
      <div className={'visual-viewport ' + (this.props.className || '')} style={this.getStyles()}>
        {this.props.children}
      </div>
    )
  }
}
