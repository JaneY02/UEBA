import React, { Component } from 'react'
import { Menu, Avatar, Tag, Badge, Modal, Popconfirm } from 'antd'
import { navs, navsIcon } from '../../router/navs'
import './index.less'
import { DoubleLeftOutlined, DoubleRightOutlined, PoweroffOutlined, SwapOutlined } from '@ant-design/icons'
import { mainRoutes } from '../../router'
import { connect } from 'react-redux'
import { MENUCOLLAPSE } from '../../actions'

class AppMenu extends Component {
  state = {
    menuWidth: '240px',
    userName: '',
    noticeNum: 0,
    currentNav: '', // 当前菜单选中项
    currentOpenNav: '' // 当前一级菜单展开项
  }
  componentDidMount () {
    this.setState({
      userName: 'Potato_Jane',
      noticeNum: (Math.random() * 50).toFixed(0)
    })
    let is404 = this.judge404()
    if (!is404) {
      this.goRedirect()
    } else {
      this.props.history.push('/404')
    }
  }
  /* 是否跳转404页面 */
  judge404 = () => {
    let { pathname } = this.props.location
    let is404 = mainRoutes.findIndex(item => item.path === pathname)
    return is404 > -1 ? false : true
  }
  /* 判断是否需要重定向 */
  goRedirect = () => {
    let { pathname } = this.props.location
    let redirectPath = pathname
    let redirectIndex = mainRoutes.findIndex(item => item.path === redirectPath)
    if (redirectIndex > -1 && mainRoutes[redirectIndex].redirect) {
      redirectPath = mainRoutes[redirectIndex].redirect
      this.props.history.push(redirectPath)
    }
    this.handleMenuStyle(redirectPath)
  }
  /* 处理当前菜单的样式，选中，以及默认展开 */
  handleMenuStyle = curPath => {
    let currentNav = curPath
    let routeIndex = mainRoutes.findIndex(item => item.path === curPath)
    if (routeIndex > -1 && mainRoutes[routeIndex].menuCode) {
      currentNav = mainRoutes[routeIndex].menuCode
    }
    this.setState({
      currentNav,
      currentOpenNav: routeIndex > -1 ? mainRoutes[routeIndex].openMenuCode : ''
    })
  }
  menuToLeft = () => {
    this.props.menuCollapseDispatch(false)
    this.setState({ menuWidth: 0 })
  }
  menuToRight = () => {
    this.props.menuCollapseDispatch(true)
    this.setState({ menuWidth: '240px' })
  }
  clickNav = e => {
    this.props.history.push(e.key)
    this.setState({ currentNav: e.key })
  }
  openSubChange = k => {
    let currentOpenNav = k.length === 0 ? '' : k[k.length - 1]
    this.setState({
      currentOpenNav
    })
  }
  /* 切换多语言 */
  changeLang = () => {
    console.log('多语言未实现')
  }
  /* 退出 */
  logout = () => {
    Modal.confirm({
      title: '提示',
      content: '确定退出系统？',
      maskClosable: true,
      onOk: (close) => {
        close()
      }
    })
  }
  render () {
    let { menuWidth, userName, noticeNum, currentNav, currentOpenNav } = this.state
    return (
      <div className="app-menu" style={{width: menuWidth}}>
        <div className="userinfo">
          <h3 className="title">用户实体行为分析</h3>
          <div className="info-wrap">
            <div className="flex-column-center">
              <Badge count={noticeNum} className="dark-badge">
                <Avatar style={{background: '#efefef'}} shape="square" size={78} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
              </Badge>
              <h5 className="name">{userName}</h5>
            </div>
            <div className="right-info">
              <Tag color="green" className="dark-tag">普通员工</Tag>
              <span className="lang">
                中文
                <Popconfirm
                  placement="right"
                  title="确定切换语言？"
                  onConfirm={this.changeLang} >
                  <SwapOutlined title="切换中英文" className="lang_ico" />
                </Popconfirm>
                </span>
              <PoweroffOutlined className="logout" title="退出" onClick={this.logout} />
            </div>
          </div>
        </div>
        <div className="menu-wrap">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[currentNav]}
            openKeys={[currentOpenNav]}
            onOpenChange={this.openSubChange}
            onClick={this.clickNav}>
            {
              navs.map((nav, navIndex) => {
                if (nav.children && nav.children.length) {
                  return (
                    <Menu.SubMenu key={nav.path} title={
                      <span>
                        {navsIcon[navIndex]}
                        <span>{nav.text}</span>
                      </span>
                    }>
                      {
                        nav.children.map(child => {
                          return (
                            <Menu.Item key={child.path}>{child.text}</Menu.Item>
                          )
                        })
                      }
                    </Menu.SubMenu>
                  )
                } else {
                  return (
                    <Menu.Item key={nav.path}>
                      {navsIcon[navIndex]}
                      <span>{nav.text}</span>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>
          <DoubleLeftOutlined onClick={this.menuToLeft} className="menu-to-left" />
        </div>
        <DoubleRightOutlined style={{display: menuWidth === 0 ? 'block' : 'none'}} onClick={this.menuToRight} className="menu-to-right" />
      </div>
    )
  }
}

const mapStateToProps = () => { return {} }
const mapDispatchToProps = dispatch => {
  return {
    menuCollapseDispatch: value => dispatch({type: MENUCOLLAPSE, value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)