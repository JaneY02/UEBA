import asyncComponent from './asyncComponent'

const Login =  asyncComponent(() => import(/* webpackChunkName: 'login' */ './../pages/login'))
const Main =  asyncComponent(() => import(/* webpackChunkName: 'app-main' */ './../pages/main'))
const Home =  asyncComponent(() => import(/* webpackChunkName: 'home' */ './../pages/home'))
const UserInfo =  asyncComponent(() => import(/* webpackChunkName: 'user-info' */ './../pages/user-info'))

const mainRoutes = [
  /* 总览 */
  {
    path: '/',
    redirect: '/ueba/home'
  },
  {
    path: '/ueba',
    redirect: '/ueba/home'
  },
  {
    path: '/ueba/home',
    component: Home
  },
  /* 人员管理 */
  {
    path: '/ueba/user',
    redirect: '/ueba/user/info',
  },
  {
    path: '/ueba/user/info',
    component: UserInfo,
    openMenuCode: '/ueba/user',
    breadcrum: ['用户管理', '人员管理']
  },
]

const appRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/ueba',
    component: Main,
    children: mainRoutes
  }
]

export {
  appRoutes,
  mainRoutes
}