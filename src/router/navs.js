import { DashboardOutlined, TeamOutlined, DesktopOutlined, FundViewOutlined, ExperimentOutlined, UngroupOutlined } from '@ant-design/icons'
import React from 'react'

/* 菜单图标icon */
const navsIcon = [
  <DashboardOutlined />,
  <TeamOutlined />,
  <DesktopOutlined />,
  <FundViewOutlined />,
  <ExperimentOutlined />,
  <UngroupOutlined />
]

/* 左边栏菜单 */
const navs = [
  {
    path: '/ueba/home',
    text: '总览'
  },
  // {
  //   path: '/ueba/user',
  //   text: '用户管理',
  //   children: [
  //     {
  //       path: '/ueba/user/info',
  //       text: '人员管理'
  //     },
  //     {
  //       path: '/ueba/user/type',
  //       text: '人员类型管理'
  //     }
  //   ]
  // },
  // {
  //   path: '/ueba/asset',
  //   text: '运营管理',
  //   children: [
  //     {
  //       path: '/ueba/asset/info',
  //       text: '业务管理'
  //     },
  //     {
  //       path: '/ueba/asset/type',
  //       text: '业务类型管理'
  //     }
  //   ]
  // },
  // {
  //   path: '/ueba/behavior',
  //   text: '行为分析',
  //   children: [
  //     {
  //       path: '/ueba/behavior/profile',
  //       text: '用户画像'
  //     },
  //     {
  //       path: '/ueba/behavior/act',
  //       text: '异常行为'
  //     }
  //   ]
  // },
  // {
  //   path: '/ueba/model',
  //   text: '算法建模',
  //   children: [
  //     {
  //       path: '/ueba/model/rule',
  //       text: '规则建模'
  //     },
  //     {
  //       path: '/ueba/model/scene',
  //       text: '场景建模'
  //     }
  //   ]
  // },
  // {
  //   path: '/ueba/data',
  //   text: '数据源管理'
  // }
]

export {
  navs,
  navsIcon
}