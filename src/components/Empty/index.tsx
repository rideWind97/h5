import { ReactNode } from 'react'
import style from './index.module.less'

interface Props {
  desc?: string
  icon?: ReactNode
}

function Index({ desc, icon }: Props) {
  return (
    <div className={style['empty-wrap']}>
      <div className={style['empty-wrap-div']}>
        {icon || (
          <svg width='65' height='50' viewBox='0 0 65 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M63.9727 14.999C63.5727 2.99902 58.8607 1.29818 57.0273 0.964844C44.2273 1.76484 37.3607 11.9648 35.5273 16.9648L63.9727 14.999Z'
              fill='#DADCFF'
              stroke='#DADCFF'
            />
            <path
              d='M23.5273 4.99902L57.5273 0.964844C53.5 1.4427 48 2.99902 48.5273 13.4648C49.488 32.5309 38.8333 43.999 34.5 48.999L21.0273 41.9648L1.02734 44.9648C15.5273 36.2319 17.0273 20.9648 17.0273 13.4648C17.0273 7.46484 22.194 5.16569 23.5273 4.99902Z'
              fill='#F7A9D0'
              stroke='#F7A9D0'
              strokeLinejoin='round'
            />
            <path
              d='M27.4737 21.193L30.8421 16L32.1688 21.193L38 20.6316L32.5263 24.8421V30.7368L27.8947 27.7895L22 30.3158L25.3454 24.4498L22.398 21.193H27.4737Z'
              fill='white'
              stroke='white'
              strokeLinejoin='round'
            />
          </svg>
        )}
        <span className={style['label']}>{desc || 'empty'}</span>
      </div>
    </div>
  )
}

export default Index
