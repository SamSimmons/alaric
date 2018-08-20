import React, { Component } from 'react'
import Sidebar from './Sidebar/index'
import Grappler from './Grappler'
import CreateGrappler from './CreateGrappler'
import ClipContainer from './ClipContainer'
import ClipsList from './ClipsList'
import Home from './Home'
import Upload from './Upload'
import { Route, Switch } from 'react-router-dom'
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
            <Route path="/grapplers/:grappler/" component={Grappler} />
            <Route path="/clips/" component={ClipsList} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default withRouter(App)
