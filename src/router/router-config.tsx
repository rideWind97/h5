import React, { Suspense, lazy } from 'react'
import Home from '../pages/Home'
import { SpinLoading } from 'antd-mobile'
import { Navigate } from 'react-router-dom'
import KeepAlive from 'react-activation'
import Layout from '@/layout'

interface Props {
  children: React.ReactNode
}

export interface MetaProps {
  requiresAuth?: boolean
  title: string
  key?: string
}

export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  meta?: MetaProps
  isLink?: string
}

const WorkData = lazy(() => import('@/pages/WorkData'))
const RedBook = lazy(() => import('@/pages/RedBook'))
const RedBookDetail = lazy(() => import('@/pages/RedBookDetail'))
const Page404 = lazy(() => import('@/pages/404'))
const ChatPage = lazy(() => import('@/pages/Chat'))

const PageLoading = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div
          style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <SpinLoading style={{ '--size': '48px' }} color='primary' />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageLoading>
            <Home />
          </PageLoading>
        ),
        meta: {
          requiresAuth: false,
          title: 'home',
          key: 'home'
        }
      },
      {
        path: 'red-book',
        element: (
          <KeepAlive>
            <PageLoading>
              <RedBook />
            </PageLoading>
          </KeepAlive>
        ),
        meta: {
          requiresAuth: false,
          title: '小红书',
          key: 'red-book'
        }
      },
      {
        path: 'red-book/:name',
        element: (
          <PageLoading>
            <RedBookDetail />
          </PageLoading>
        ),
        meta: {
          title: '小红书详情',
          key: 'red-book-detail'
        }
      },
      {
        path: 'chat',
        element: (
          <PageLoading>
            <ChatPage />
          </PageLoading>
        ),
        meta: {
          title: 'Chat',
          key: 'chat'
        }
      }
    ]
  },
  {
    path: '/working-data',
    element: (
      <PageLoading>
        <WorkData />
      </PageLoading>
    ),
    meta: {
      requiresAuth: false,
      title: 'working-data',
      key: 'working-data'
    }
  },
  {
    path: '/404',
    element: (
      <PageLoading>
        <Page404 />
      </PageLoading>
    ),
    meta: {
      requiresAuth: false,
      title: '404',
      key: '404'
    }
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default routerConfig
