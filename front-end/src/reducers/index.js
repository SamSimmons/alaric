import { combineReducers } from 'redux'
import clips from './clips'
import grapplers from './grapplers'
import filters from './filters'
import playlist from './playlist'
import profile from './profile'

export default combineReducers({
  clips,
  grapplers,
  filters,
  playlist,
  profile,
})
