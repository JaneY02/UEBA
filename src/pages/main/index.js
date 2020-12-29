import { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { mainRoutes } from '../../router'
import AppMenu from './../../components/app-menu'
import './index.less'

class Main extends Component {
  render () {
    return (
      <div className="main">
        <AppMenu {...this.props}></AppMenu>
        <div>
          <div>面包屑</div>
          <div>
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