import { BrowserRouter as Router, RouteObject, useRoutes, useLocation } from 'react-router-dom'
import routerConfig from './router-config'
// import { Navigate } from 'react-router-dom'
import { searchRoute } from '@/utils/auth'
import { AxiosCanceler } from '@/utils/request/axiosCancel'

const axiosCanceler = new AxiosCanceler()

const WrapRoutes = () => {
  return useRoutes(routerConfig as RouteObject[])
}

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()

  const { pathname } = useLocation()
  const route = searchRoute(pathname, routerConfig)

  const title = route?.meta?.title || 'H5'
  document.title = title

  // if (!route.meta?.access) {
  //   return props.children
  // }

  // // * 判断是否有Token
  // const token = getToken()
  // if (!token) return <Navigate to='/login' />

  return props.children
}

const WrapRoute = () => (
  <Router>
    <AuthRouter>
      <WrapRoutes />
    </AuthRouter>
  </Router>
)

export default WrapRoute
