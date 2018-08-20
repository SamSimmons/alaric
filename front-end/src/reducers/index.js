import { combineReducers } from 'redux'
import clips from './clips'
import grapplers from './grapplers'
import filters from './filters'
import playlist from './playlist'
import profile from './profile'
import opponents from './opponents'

export default combineReducers({
  clips,
  grapplers,
  filters,
  opponents,
  playlist,
  profile,
})
