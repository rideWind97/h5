import style from './index.module.less'
import Icon404 from '@/components/Icon/Icon404'

function Index() {
  return (
    <div className={style.wrap}>
      <div className={style.main}>
        <Icon404 />
        <span className={style.desc}>Page Not Found</span>
      </div>
    </div>
  )
}

export default Index
