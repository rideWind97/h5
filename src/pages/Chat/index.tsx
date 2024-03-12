import style from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { Popover, TextArea, TextAreaRef } from 'antd-mobile'
import Avatar from '@/components/Avatar'
import { IconChatSend, IconChatSendActive, IconNoMessage } from '@/components/Icon'
import Empty from '@/components/Empty'
import EmojiPicker from 'emoji-picker-react'
import { GlobalContextProps, globalContext } from '@/layout'
import VisualViewportComp, { move, stop } from '@components/VisualViewportComp'
import useVisualViewport from '@/hooks/useVisualViewport'

function Conversation() {
  const { userAgent }: GlobalContextProps = useContext(globalContext)
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const textAreaRef = useRef<TextAreaRef>(null)
  const viewport = useVisualViewport()
  const [scrollTop, setScrollTop] = useState(0)

  const handleFocus = () => {
    textAreaRef.current?.focus()
  }

  return (
    <div className={style.wrap} style={{ height: viewport.height, top: scrollTop }}>
      <div className={style.header}>
        <i
          className={`iconfont icon-Line_Backarrow`}
          style={{ color: '#000', fontSize: 24 }}
          onClick={() => navigate(-1)}
        />
        <Avatar width='36px' height='36px' online />

        <div className={style.userInfo}>
          <div className={style.name}>zhangsan</div>
          <div className={style.online}>Active now</div>
        </div>
      </div>

      <div className={style.content} onClick={() => setShowPicker(false)}>
        <Empty icon={<IconNoMessage />} desc='No new message yet' />
      </div>

      <div className={style['option-wrap']}>
        <div className='chat-input'>
          <TextArea
            placeholder='Send message...'
            value={value}
            onChange={(val) => {
              setValue(val)
            }}
            rows={1}
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{ padding: '6px 16px', border: 'none' }}
            onClick={() => {
              setShowPicker(false)
            }}
            ref={textAreaRef}
            onBlur={() => {
              setScrollTop(0)
              move()
            }}
            onFocus={() => {
              stop()
              setTimeout(() => {
                setScrollTop(viewport.height - window.innerHeight)
              }, 100)
            }}
          />
        </div>
        <div className={style['options']}>
          <Popover content={<PopoverContent />} trigger='click' placement='top'>
            <i className='iconfont icon-Line_Pic fz16px' style={{ marginRight: 16, color: '#86909C' }} />
          </Popover>

          {!showPicker ? (
            <i
              className='iconfont icon-Line_Emoji fz20px'
              style={{ color: '#86909C', marginLeft: 16 }}
              onClick={() => {
                setShowPicker(true)
                setScrollTop(0)
              }}
            />
          ) : (
            <i
              className='iconfont icon-Line_Keyboard fz20px'
              style={{ color: '#86909C', marginLeft: 16 }}
              onClick={() => {
                setShowPicker(false)
                handleFocus()
              }}
            />
          )}

          <span style={{ flex: 1, textAlign: 'right' }}>
            <span
              onClick={() => {
                if (value) {
                  setValue('')
                }
              }}
            >
              {value ? <IconChatSendActive /> : <IconChatSend />}
            </span>
          </span>
        </div>

        <div style={{ height: showPicker ? 252 : 0, transition: 'all 0.5s' }}>
          <EmojiPicker
            autoFocusSearch={false}
            searchDisabled={false}
            emojiStyle='native'
            skinTonesDisabled={false}
            lazyLoadEmojis={true}
            width={'100%'}
            height={'100%'}
            onEmojiClick={({ emoji }) => {
              setValue((value) => value + emoji)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function PopoverContent() {
  return (
    <div>
      <div className={style['popover-item-icon']}>
        <i className='iconfont icon-menu_pic' style={{ marginRight: 8, color: '#86909C' }} />
        Albums
      </div>
      <div className={style['popover-item-icon']}>
        <i className='iconfont icon-menu_photo' style={{ marginRight: 8, color: '#86909C' }} />
        Take a photo
      </div>
      <div className={style['popover-item-icon']}>
        <i className='iconfont icon-menu_video' style={{ marginRight: 8, color: '#86909C' }} />
        Take a video
      </div>
    </div>
  )
}

// function Index() {
//   return (
//     <VisualViewportComp>
//       <Conversation />
//     </VisualViewportComp>
//   )
// }

// export default Index
export default Conversation
