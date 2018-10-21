import React, { Component } from 'react'
import Sidebar from './Sidebar/index'
import CreateGrappler from './CreateGrappler'
import ClipContainer from './ClipContainer'
import ClipsList from './ClipsList'
import Upload from './Upload'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'


class App extends Component {

  render() {

    return (
      <div className="app">
        <Sidebar />
        <div className='app__body'>
          <Switch>
            <Route path="/clip/:id/" component={ClipContainer} />
            <Route path="/upload/" component={Upload} />
            <Route path="/create/" component={CreateGrappler} />
            <Route path="/clips/" component={ClipsList} />
            <Redirect to='/clips/' />
          </Switch>
        </div>
      </div>
    );
  }
}


export default withRouter(App)
