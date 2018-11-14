import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
const Sidebar = lazy(() => import('./Sidebar/index'))
const CreateGrappler = lazy(() => import('./CreateGrappler'))
const ClipContainer = lazy(() => import('./ClipContainer'))
const ClipsList = lazy(() => import('./ClipsList'))
const Upload = lazy(() => import('./Upload'))


class App extends Component {

  render() {

    return (
      <div className="app">
        <Suspense fallback={<h2>LOADING</h2>}>
            <Sidebar />
            <div className='app__body'>
                <Switch>
                  <Route path="/clip/:id/" render={(props) => <ClipContainer {...props} />} />
                  <Route path="/upload/" render={(props) => <Upload {...props} />} />
                  <Route path="/create/" render={(props) => <CreateGrappler {...props} />} />
                  <Route path="/clips/" render={(props) => <ClipsList {...props} />} />
                  <Redirect to='/clips/' />
                </Switch>
            </div>
        </Suspense>
      </div>
    );
  }
}


export default withRouter(App)
