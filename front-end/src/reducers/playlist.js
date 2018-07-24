import {
  ADD_TO_PLAYLIST, REMOVE_FROM_PLAYLIST,
} from '../actions'
import { includes } from 'lodash'

export default function(state = { list: [] }, action) {
  switch (action.type) {
    case ADD_TO_PLAYLIST: {
      const { clips } = action
      return {
        ...state,
        list: state.list.concat(clips)
      }
    }
    case REMOVE_FROM_PLAYLIST: {
      const { clips } = action
      return {
        ...state,
        list: state.list.filter((id) => includes(clips, id)),
      }
    }
    default: {
      return state
    }
  }
}
