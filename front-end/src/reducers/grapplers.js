import {
  GRAPPLERS_REQUEST, GRAPPLERS_SUCCESS, GRAPPLERS_FAILURE,
  GRAPPLER_REQUEST, GRAPPLER_SUCCESS, GRAPPLER_FAILURE,
  CLEAR_GRAPPLER,
} from '../actions'

export default function (state = { list: [], loading: false, selected: null }, action) {
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
    case GRAPPLER_REQUEST: {
      return {
        ...state,
        selected: null,
        loading: true,
      }
    }
    case GRAPPLER_SUCCESS: {
      const { selected } = action
      return {
        ...state,
        selected,
        loading: false
      }
    }
    case GRAPPLER_FAILURE: {
      return {
        ...state,
        loading: false,
      }
    }
    case CLEAR_GRAPPLER: {
      return {
        ...state,
        selected: null,
      }
    }
    default: {
      return state
    }
  }
}
