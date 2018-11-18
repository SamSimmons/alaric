import React, { useState, Suspense, createContext, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
const Sidebar = lazy(() => import('./Sidebar/index'))
const CreateGrappler = lazy(() => import('./CreateGrappler'))
const ClipContainer = lazy(() => import('./ClipContainer'))
const ClipsList = lazy(() => import('./ClipsList'))
const Upload = lazy(() => import('./Upload'))

export const FilterContext = createContext()

function App() {

  const [ selectedTags, updateTags ] = useState([])

  const [ selectedGrappler, updateGrappler ] = useState('All')

  const [ untagged, updateUntagged ] = useState(false)

  const [ selectedOpponents, updateOpponents ] = useState([])

  const [ page, updatePage ] = useState(1)

  return (
    <div className="app">
      <Suspense fallback={<h2>LOADING</h2>}>
        <FilterContext.Provider
          value={{
            filterValues: {
              selectedTags,
              selectedGrappler,
              untagged,
              selectedOpponents,
              page,
            },
            filterSetters: {
              updateTags,
              updateGrappler,
              updateUntagged,
              updateOpponents,
              updatePage,
            }
          }}
        >
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
        </FilterContext.Provider>
      </Suspense>
    </div>
  )
}


export default withRouter(App)
