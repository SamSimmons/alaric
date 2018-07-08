import queryString from 'query-string'
import {
  CLIPS_REQUEST, CLIPS_SUCCESS, CLIPS_FAILURE,
  CLIP_REQUEST, CLIP_SUCCESS, CLIP_FAILURE,
} from '../actions'

const initialState = {
  list: [],
  loading: false,
  selected: null,
  total: null,
  nextPage: 1,
}

export default function (state = initialState, action) {
  switch(action.type) {
    case CLIPS_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case CLIPS_SUCCESS: {
      const { payload } = action
      let nextPage = null;
      if (payload.next) {
        const params = queryString.extract(payload.next)
        const { page } = queryString.parse(params)
        nextPage = page
      }
      const list = state.nextPage > 1 ? state.list.concat(payload.results) : payload.results

      return {
        ...state,
        list,
        total: payload.count,
        nextPage,
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
    case CLIP_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case CLIP_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case CLIP_FAILURE: {
      return {
        ...state,
        loading: false,
        selected: "err"
      }
    }
    default: {
      return state
    }
  }
}
