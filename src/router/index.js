import Login from './../pages/login'
import Main from './../pages/main'
import Home from './../pages/home'
import UserInfo from './../pages/user-info'
// import UserInfoAdd from './../pages/user-info/add'
import NotFound from './../pages/404'

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
  /* 人员管理--添加 */
  // {
  //   path: '/ueba/user/info/add',
  //   component: UserInfoAdd,
  //   openMenuCode: '/ueba/user',
  //   menuCode: '/ueba/user/info',
  //   breadcrum: ['用户管理', '人员管理', '添加人员']
  // },
  /* 404页面 */
  {
    path: '/404',
    component: NotFound
  }
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