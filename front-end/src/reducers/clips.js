import { CLIPS_REQUEST, CLIPS_SUCCESS, CLIPS_FAILURE } from '../actions'

export default function (state = { list: [], loading: false, }, action) {
  switch(action.type) {
    case CLIPS_REQUEST: {
      return {
        ...state,
        list: [],
        loading: true,
      }
    }
    case CLIPS_SUCCESS: {
      const { list } = action
      return {
        ...state,
        list,
        loading: false
      }
    }
    case CLIPS_FAILURE: {
      console.log('SHIT', action.err)
      return {
        ...state,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}
