import {
  SELECT_PROFILE_TAG,
} from '../actions'

export default function(state = { selectedTag: 'All' }, action) {
  switch (action.type) {
    case SELECT_PROFILE_TAG: {
      return {
        ...state,
        selectedTag: action.tag,
      }
    }
    default: {
      return state
    }
  }
}
