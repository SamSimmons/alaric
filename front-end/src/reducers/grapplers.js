import { GRAPPLERS_REQUEST, GRAPPLERS_SUCCESS, GRAPPLERS_FAILURE } from '../actions'

export default function (state = { list: [], loading: false, }, action) {
  switch(action.type) {
    case GRAPPLERS_REQUEST: {
      return {
        ...state,
        list: [],
        loading: true,
      }
    }
    case GRAPPLERS_SUCCESS: {
      const { list } = action
      return {
        ...state,
        list,
        loading: false
      }
    }
    case GRAPPLERS_FAILURE: {
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
