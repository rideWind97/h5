import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { mockRequest } from './api'
import style from './index.module.less'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { VariableSizeList } from 'react-window'
import { InfiniteScroll } from 'antd-mobile'

interface FeedLi {
  id: string
  model_type: string
  note_card: {
    interact_info: {
      liked: boolean
      liked_count: string
    }
    cover: {
      width: number
      url: string
      info_list: [
        {
          image_scene: string
          url: string
        },
        {
          url: string
          image_scene: string
        }
      ]
      url_pre: string
      url_default: string
      file_id: string
      height: number
    }
    type: string
    display_title?: string
    user: {
      nick_name: string
      avatar: string
      user_id: string
      nickname: string
    }
  }
  track_id: string
  ignore: boolean
}

interface SizeProps {
  [key: number]: number
}

interface RowRenderProps {
  index: number
  style: CSSProperties
}

function Home() {
  const [feeds, setFeeds] = useState<FeedLi[]>([])
  const [sizes, setSizes] = useState<SizeProps>({ 1: 50 }) // 根据索引记录列表的高度
  const [count, setCount] = useState(100) // 列表数量
  const listRef = useRef<any>()
  const [hasMore, setHasMore] = useState(true)

  // 根据索引获取Item的尺寸
  const getItemSize = useCallback(
    (index: number) => {
      return sizes[index] || 150
    },
    [sizes]
  )

  // 根据索引，设置Item高度
  const setItemSize = useCallback((index = 1, size = 10) => {
    setSizes((prevSize) => {
      return {
        ...prevSize,
        [index]: size
      }
    })
    // 根据索引，重置缓存位置。
    listRef.current.resetAfterIndex(index, false)
  }, [])

  const rowRender = useCallback(
    ({ index: rowIndex, style }: RowRenderProps) => {
      return (
        // <div index={rowIndex} style={style}>
        <div style={style}>
          <Row
            // style={style}
            index={rowIndex}
            key={rowIndex}
            setItemSize={setItemSize}
            itemData={feeds[rowIndex]}
            hasMore={hasMore}
            loadMore={loadMore}
            isLast={rowIndex === feeds.length - 1}
          />
        </div>
      )
    },
    [feeds]
  )

  async function loadMore(time: number) {
    const append = await mockRequest(time)

    setFeeds((vals) => {
      const arr = [...vals, ...append]
      setCount(arr.length)
      return arr
    })

    setHasMore(append.length > 0)
  }

  useEffect(() => {
    loadMore(0)
  }, [])

  return (
    <div className={style.wrap}>
      <div style={{ textAlign: 'center', width: '100%', fontSize: 24, marginBottom: 24 }}>小红书</div>

      <div className={style['feed-wrap']}>
        <VariableSizeList
          className='List'
          height={400} // 随便写
          width={366} // 随便写
          itemCount={count}
          itemSize={getItemSize}
          overscanCount={10}
          ref={listRef}
          style={{ height: '100%', width: '100%' }}
        >
          {rowRender}
        </VariableSizeList>
      </div>
    </div>
  )
}

interface RowProps {
  index: number
  setItemSize: (index?: number, size?: number) => void
  itemData: FeedLi
  loadMore: (time: number) => Promise<void>
  hasMore: boolean
  isLast: boolean
}

const Row = ({ index, setItemSize, itemData: item, loadMore, hasMore, isLast }: RowProps) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const handleLoad = () => {
    // 第一时间获取不太准确，必须晚一点，使用宏任务
    setTimeout(() => {
      const elementHeight = itemRef.current?.offsetHeight
      setItemSize(index, elementHeight)
    }, 0)
  }

  if (!item?.note_card) {
    return null
  }

  return (
    <section className={style['note-item']} ref={itemRef}>
      <Image className='feed-img' src={item.note_card.cover?.url_pre} onLoad={handleLoad} alt='图片' fit='contain' />

      <div className={style['footer']}>
        <div className={style['title']}>{item.note_card?.display_title}</div>
        <div className='author-wrapper'>
          <Link className='author' target='_self' to={`/red-book/${item.note_card?.user.nickname}`} rel='noreferrer'>
            <Image
              className='author-avatar'
              src={item.note_card?.user.avatar + '?imageView2/2/w/60/format/webp|imageMogr2/strip'}
              fit='contain'
            />
            <span className='name'>{item.note_card?.user.nickname}</span>
          </Link>

          <span className='like-wrapper like-active'>
            <span className='count'>{item.note_card?.interact_info.liked_count}</span>
          </span>
        </div>
      </div>

      {/* 在使用 InfiniteScroll 组件时，其内部会检测组件是否可见。
        可见时会调用 loadMore 来加载数据；不可见时，不会调用 loadMore（这是必要的，可以避免不必要的数据请求）。
        并且，该检查机制，在组件初次渲染以及每次重新渲染时都会进行，以确保正确加载数据。 */}
      {isLast && <InfiniteScroll loadMore={() => loadMore(1000)} hasMore={hasMore} />}
    </section>
  )
}

export default Home
