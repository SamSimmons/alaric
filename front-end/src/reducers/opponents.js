import {
  OPPONENTS_REQUEST, OPPONENTS_SUCCESS,
} from '../actions'

export default function (state = { list: [] }, action) {
  switch(action.type) {
    case OPPONENTS_REQUEST: {
      return {
        ...state,
        list: [],
      }
    }
    case OPPONENTS_SUCCESS: {
      let list = action.payload.map(o => o.opponent)
      return {
        ...state,
        list,
      }
    }
    default: {
      return state
    }
  }
}
