import queryString from 'query-string'
import {
  CLIPS_REQUEST, CLIPS_SUCCESS, CLIPS_FAILURE,
  CLIP_REQUEST, CLIP_SUCCESS, CLIP_FAILURE,
  UPDATE_CLIP_SUCCESS,
  UPDATE_GRAPPLER_FILTER, UPDATE_TAG_FILTER,
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
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        list: [],
        nextPage: 1,
      }
    }
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
    case UPDATE_CLIP_SUCCESS: {
      return {
        ...state,
        selected: action.payload
      }
    }
    case UPDATE_TAG_FILTER:
    case UPDATE_GRAPPLER_FILTER: {
      return {
        ...state,
        nextPage: 1,
      }
    }
    default: {
      return state
    }
  }
}
