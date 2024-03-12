interface Props {
  text: string
}

export default function Index({ text }: Props) {
  return (
    <div
      style={{
        padding: '16px 16px 64px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <svg width='141' height='140' viewBox='0 0 141 140' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_3649_35153)'>
          <circle cx='117' cy='30.5' r='2.5' stroke='#D5D3E0' strokeWidth='2' strokeLinecap='round' />
          <path
            d='M117.5 146.206C117.5 120.135 96.4574 99 70.5 99C44.5426 99 23.5 120.135 23.5 146.206C23.5 172.277 40.9244 160.944 70.5 170.155C100.076 179.366 117.5 172.277 117.5 146.206Z'
            fill='url(#paint0_linear_3649_35153)'
          />
          <mask id='mask0_3649_35153' maskUnits='userSpaceOnUse' x='23' y='99' width='95' height='75'>
            <path
              d='M117.5 146.206C117.5 120.135 96.4574 99 70.5 99C44.5426 99 23.5 120.135 23.5 146.206C23.5 172.277 40.9244 160.944 70.5 170.155C100.076 179.366 117.5 172.277 117.5 146.206Z'
              fill='url(#paint1_linear_3649_35153)'
            />
          </mask>
          <g mask='url(#mask0_3649_35153)'>
            <circle cx='81' cy='122.5' r='3' stroke='#D5D3E0' strokeWidth='2' strokeLinecap='round' />
            <ellipse
              cx='101.635'
              cy='111.302'
              rx='2.39092'
              ry='3.36711'
              transform='rotate(-47.9699 101.635 111.302)'
              stroke='#D5D3E0'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <ellipse
              cx='35.0709'
              cy='117.673'
              rx='2.14091'
              ry='3'
              transform='rotate(40.1695 35.0709 117.673)'
              fill='#D5D3E0'
            />
          </g>
          <path d='M64.5 50.5V102.5' stroke='#D5D3E0' strokeWidth='2' strokeLinecap='round' />
          <path
            d='M64.5 49.8275C64.5 49.8275 71.2308 45.7155 82 49.8275C92.7692 53.9395 99.5 49.8275 99.5 49.8275V71.564C99.5 71.564 93.1058 74.795 82 71.564C70.8942 68.3329 64.5 71.564 64.5 71.564V49.8275Z'
            fill='#D5D3E0'
          />
          <path
            d='M30.5858 53.3284L36.2426 47.6716M36.2426 53.3284L30.5858 47.6716'
            stroke='#D5D3E0'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M10.5858 130.328L16.2426 124.672M16.2426 130.328L10.5858 124.672'
            stroke='#D5D3E0'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path d='M5.5 138H13M135.5 138H19' stroke='#D5D3E0' strokeWidth='2' strokeLinecap='round' />
        </g>
        <defs>
          <linearGradient
            id='paint0_linear_3649_35153'
            x1='70.5'
            y1='99'
            x2='71'
            y2='141.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0.221418' stopColor='#E5E5EA' />
            <stop offset='1' stopColor='#D5D3E0' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_3649_35153'
            x1='70.5'
            y1='109'
            x2='70.5'
            y2='147'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#D4D3E0' />
            <stop offset='1' stopColor='#D5D3E0' stopOpacity='0' />
          </linearGradient>
          <clipPath id='clip0_3649_35153'>
            <rect width='140' height='140' fill='white' transform='translate(0.5)' />
          </clipPath>
        </defs>
      </svg>

      <div style={{ marginTop: 12 }}>{text}</div>
    </div>
  )
}
