import { FixedSizeList } from 'react-window'
import { useMeasure } from 'react-use'

interface ListItemProps {
  style: React.CSSProperties
  index: number
}

function ListItem({ index, style }: ListItemProps) {
  const [ref, { height }] = useMeasure<HTMLDivElement>()

  return (
    <div ref={ref} style={style}>
      Row {index}, height: {height}
    </div>
  )
}

export default function App() {
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={1000}
      itemSize={50} // 这里的 itemSize 实际上没有实际的作用，会在下面被自动计算并更新
    >
      {({ index, style }) => <ListItem index={index} style={style} />}
    </FixedSizeList>
  )
}
