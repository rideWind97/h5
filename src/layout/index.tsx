import { getUserAgent } from '@/utils'
import { createContext, useEffect, useState } from 'react'
import { AliveScope } from 'react-activation'
import { Outlet } from 'react-router-dom'
// import PreviewComp from './preview'

export interface GlobalContextProps {
  userAgent: 'unkonw' | 'Android' | 'IOS'
}

const globalContextDefault: GlobalContextProps = { userAgent: 'unkonw' }

export const globalContext = createContext(globalContextDefault)

function Index() {
  const [userAgent, setUserAgent] = useState<GlobalContextProps['userAgent']>('unkonw')

  useEffect(() => {
    setUserAgent(getUserAgent())
  }, [])

  return (
    <globalContext.Provider
      value={{
        userAgent
      }}
    >
      <AliveScope>
        <Outlet />

        {/* 预加载组件 */}
        {/* <PreviewComp /> */}
      </AliveScope>
    </globalContext.Provider>
  )
}

export default Index
