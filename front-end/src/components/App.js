import React, { Component } from 'react'
import Header from './Header'
import Grappler from './Grappler'
import GrapplerList from './GrapplerList'
import CreateGrappler from './CreateGrappler'
import Clip from './Clip'
import Home from './Home'
import Upload from './Upload'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'


class App extends Component {


  render() {

    return (
      <div className="App">
        <Header />
        <div className='divider' />
        <Switch>
          <Route path="/:grappler/clip/:id/" component={Clip} />
          <Route path="/upload/" component={Upload} />
          <Route path="/create/" component={CreateGrappler} />
          <Route path="/grapplers" component={GrapplerList} />
          <Route path="/:grappler/" component={Grappler} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App)
