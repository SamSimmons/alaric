import queryString from 'query-string'
import {
  CLIPS_REQUEST, CLIPS_SUCCESS, CLIPS_FAILURE,
  CLIP_REQUEST, CLIP_SUCCESS, CLIP_FAILURE,
  UPDATE_CLIP_SUCCESS,
  UPDATE_GRAPPLER_FILTER, UPDATE_TAG_FILTER,
  SELECT_PROFILE_TAG,
} from '../actions'

const initialState = {
  list: [],
  loading: false,
  selected: null,
  total: null,
  nextPage: 1,
  error: '',
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

      return {
        ...state,
        list: payload.results,
        total: payload.count,
        nextPage,
        loading: false
      }
    }
    case CLIPS_FAILURE: {
      return {
        ...state,
        loading: false,
      }
    }
    case CLIP_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }
    case CLIP_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload,
        nextPage: 1,
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
    case SELECT_PROFILE_TAG:
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
