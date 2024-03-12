import { DatePicker, SafeArea } from 'antd-mobile'
import IconCalendar from './IconCalendar'
import IconError from './IconError'
import IconPullDown from './IconPullDown'
import style from './index.module.less'
import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { apiSearch } from './api'
import { Spin } from 'antd'

enum LabelEnum {
  'unlocked_deep_conv_cnt' = 'Total Quality Convo amount with PPV unlock',
  'unlocked_cnt_of_deep_conv' = 'Total Private Content unlock amount in Quality Convo',
  'unlocked_cnt_of_new_deep_conv' = 'Total Private Content unlock amount in Quality Convo (New relationship)',
  'unlocked_cnt_of_old_deep_conv' = 'Total Private Content unlock amount in Quality Convo (Old relationship)',
  'deep_conv_cnt' = 'Total Quality Convo amount',
  'conv_cnt' = 'Total Conversation amount'
}

type p = keyof typeof LabelEnum | 'biz_date' | 'updated_timestamp'

type DataProps = {
  [K in p]: number | string
}

const now = new Date()
const min = new Date('2022 07 01')
const monthEnglish = [
  'January',
  'February',
  'Marth',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Noveber',
  'Deceber'
]

let token = ''

function gsetToken(string: string) {
  token = string
}

function ggetToken() {
  return token
}

/**
 * @description 配合app做的网页，手机端网页
 */
function Index() {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState<string>()
  const [data, setData] = useState<DataProps>()
  const [loading, setLoading] = useState(false)
  const [init, setInit] = useState(true)
  const [isServiceErr, setIsServiceErr] = useState(false)

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'month':
        return monthEnglish[data - 1]
      default:
        return data
    }
  }, [])

  const getData = async () => {
    setLoading(true)
    const res: any = await apiSearch({ biz_date: date }, 'Bearer ' + ggetToken())

    if (res.success) {
      setData(res.data)
      setIsServiceErr(false)
    } else {
      setIsServiceErr(true)
    }

    setLoading(false)
    setInit(false)
  }

  const handleAnd = (token: string) => {
    gsetToken(token)
    setDate(dayjs(now).format('DD/MM/YYYY'))
  }

  useEffect(() => {
    // web调安卓方法获取token
    const token = window?.JsUtils?.getMsg()

    if (token) {
      handleAnd(token)
    }
  }, [])

  useEffect(() => {
    if (date) {
      try {
        getData()
      } catch (_) {
        setIsServiceErr(true)
        setLoading(false)
        setInit(false)
      }
    }
  }, [date])

  return (
    <div className={style.wrap}>
      <SafeArea position='top' />

      <div className={style.header} onClick={() => setVisible(true)}>
        <IconCalendar />
        <div className={style.date}>{date}</div>
        <IconPullDown />
      </div>

      <div className={style.subtitle}>
        <div className={style.top}>Data updated: {dayjs(now).format('HH:mm DD/MM/YYYY')}</div>
        <div>
          Your working data will update every 1-2 hours, the latest update time is usually an hour earlier.The working
          data is the total amount from 0am for the current day you choose.
        </div>
      </div>

      <div className={style['table-wrap']}>
        <div className={style['li-header']}>
          <div className={style.name}>Subject</div>
          <div className={style.label}>Count</div>
        </div>

        <Spin spinning={loading}>
          {init ? (
            <div className={style.li}>
              <IconError text='Empty' />
            </div>
          ) : isServiceErr ? (
            <div className={style.li}>
              <IconError text='Service is currently unavailable' />
            </div>
          ) : (
            Object.keys(LabelEnum).map((key) => (
              <div key={key} className={style.li}>
                <div className={style.name}>{LabelEnum[key as keyof typeof LabelEnum]}</div>
                <div className={style.label}>{data?.[key]}</div>
              </div>
            ))
          )}
        </Spin>
      </div>

      <DatePicker
        visible={visible}
        max={now}
        min={min}
        renderLabel={labelRenderer}
        onClose={() => {
          setVisible(false)
        }}
        cancelText='Cancel'
        confirmText='Done'
        onConfirm={(val) => {
          setDate(dayjs(val).format('DD/MM/YYYY'))
        }}
      />
    </div>
  )
}

export default Index
