import ReactDOM from 'react-dom/client'
import App from './App'
import VConsole from 'vconsole'

if (process.env.NODE_ENV === 'development') {
  new VConsole()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
