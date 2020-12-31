import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { mainRoutes } from '../../router'
import AppMenu from './../../components/app-menu'
import AppBreadCrum from './../../components/app-breadcrum'
import './index.less'

class Main extends Component {
  state = {
    breadcrumArr: []
  }
  UNSAFE_componentWillReceiveProps (props) {
    this.updateBreadcrum(props.location.pathname)
  }
  componentDidMount () {
    this.updateBreadcrum(this.props.location.pathname)
  }
  updateBreadcrum = pathname => {
    let curRoute = mainRoutes.find(item => item.path === pathname)
    let breadcrumArr = curRoute && curRoute.breadcrum && curRoute.breadcrum.length ? curRoute.breadcrum : []
    this.setState({ breadcrumArr })
  }
  appBtmHeight () {
    if (this.state.breadcrumArr.length) {
      return 'calc(100% - 54px)'
    } else {
      return '100%'
    }
  }
  render () {
    let { breadcrumArr } = this.state
    return (
      <div className="main">
        <AppMenu {...this.props}></AppMenu>
        <div className="app-right">
          <AppBreadCrum {...this.props} breadcrumArr={breadcrumArr}></AppBreadCrum>
          <div className="app-bottom" style={{height: this.appBtmHeight()}}>
            <Switch>
              {
                mainRoutes.map(route => (<Route exact key={route.path} path={route.path} component={route.component}></Route>))
              }
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Main