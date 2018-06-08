import React, { Component } from 'react'
import Header from './Header'
import Grappler from './Grappler'
import Clip from './Clip'
import Upload from './Upload'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'


class App extends Component {


  render() {

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/:grappler/clip/:id/" component={Clip} />
          <Route exact path="/" component={Grappler} />
          <Route path="/upload/" component={Upload} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App)
