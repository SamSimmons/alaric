import { combineReducers } from 'redux'
import clips from './clips'
import grapplers from './grapplers'
import filters from './filters'

export default combineReducers({
  clips,
  grapplers,
  filters,
})
