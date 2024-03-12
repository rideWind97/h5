import WrapRoute from './router'
import { AliveScope } from 'react-activation'
import './App.less'

function App() {
  return (
    <AliveScope>
      <div className='App'>
        <WrapRoute />
      </div>
    </AliveScope>
  )
}

export default App
