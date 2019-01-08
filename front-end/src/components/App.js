import React, { useState, useEffect, Suspense, createContext, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import { getQueryParams } from '../utils'
const Sidebar = lazy(() => import('./Sidebar'))
const CreateGrappler = lazy(() => import('./CreateGrappler'))
const ClipContainer = lazy(() => import('./ClipContainer'))
const ClipsList = lazy(() => import('./ClipsList'))
const Upload = lazy(() => import('./Upload'))
const Grapplers = lazy(() => import('./Grapplers'))

export const Context = createContext()

function App() {

  const [ selectedTags, updateTags ] = useState([])

  const [ selectedGrappler, updateGrappler ] = useState('All')

  const [ untagged, updateUntagged ] = useState(false)

  const [ selectedOpponents, updateOpponents ] = useState([])

  const [ page, updatePage ] = useState(1)

  const [clips, setClips] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setError] = useState(null)
  const [cacheKey, setCache] = useState(0)

  const filterValues = {
    selectedTags,
    selectedGrappler,
    untagged,
    selectedOpponents,
    page,
  }

  useEffect(() => {
    const params = getQueryParams(filterValues)
    axios.get(`/api/clips/${params}`)
      .then(({ data }) => {
        setClips(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [selectedTags, selectedGrappler, untagged, selectedOpponents, page, cacheKey])

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (err) {
    return <h1>ERROR!</h1>
  }

  return (
    <div className="app">
      <Suspense fallback={<h2>LOADING</h2>}>
        <Context.Provider
          value={{
            filterValues,
            filterSetters: {
              updateTags,
              updateGrappler,
              updateUntagged,
              updateOpponents,
              updatePage,
            },
            clips,
            cacheKey,
            setCache,
          }}
        >
          <Sidebar />
          <div className='app__body'>
            <Switch>
              <Route path="/clip/:id/" render={(props) => <ClipContainer {...props} />} />
              <Route path="/upload/" render={(props) => <Upload {...props} />} />
              <Route path="/grapplers/" render={(props) => <Grapplers {...props} />} />
              <Route path="/create/" render={(props) => <CreateGrappler {...props} />} />
              <Route path="/clips/" render={(props) => <ClipsList {...props} />} />
              <Redirect to='/clips/' />
            </Switch>
          </div>
        </Context.Provider>
      </Suspense>
    </div>
  )
}


export default withRouter(App)
