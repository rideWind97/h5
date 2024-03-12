import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

function Home() {
  const nav = useNavigate()

  console.log('env', import.meta.env)

  return (
    <div className='App'>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24 }}>H5 {import.meta.env.MODE} 环境</h1>
      </div>

      <Button color='primary' fill='solid' onClick={() => nav('/red-book')}>
        小红书
      </Button>

      <Button color='primary' fill='solid' onClick={() => nav('/chat')} style={{ marginLeft: 32 }}>
        chat聊天界面
      </Button>
    </div>
  )
}

export default Home
