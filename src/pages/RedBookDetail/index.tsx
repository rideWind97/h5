import { Button } from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'

function Home() {
  const { name } = useParams()
  const nav = useNavigate()

  return (
    <div className='App'>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24 }}>博主：{name} </h1>
      </div>
      <Button onClick={() => nav(-1)}>返回</Button>
    </div>
  )
}

export default Home
