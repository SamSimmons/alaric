import {
  GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
  UPDATE_GRAPPLER_FILTER, UPDATE_TAG_FILTER,
} from '../actions'
import { includes } from 'lodash'

export default function(state = { tags: [], selectedTags: [], grappler: 'All', status: 'ok' }, action) {
  switch (action.type) {
    case GET_TAGS_REQUEST: {
      return {
        ...state,
        status: 'loading',
      }
    }
    case GET_TAGS_FAILURE: {
      return {
        ...state,
        status: 'error',
      }
    }
    case GET_TAGS_SUCCESS: {
      const { tags } = action
      return {
        ...state,
        tags: tags.map((t) => {
          return { ...t, checked: false }
        }),
        selectedTags: [],
        status: 'ok'
      }
    }
    case UPDATE_GRAPPLER_FILTER: {
      const { selected } = action
      return {
        ...state,
        grappler: selected,
      }
    }
    case UPDATE_TAG_FILTER: {
      const { tag } = action
      const updatedTags = state.tags.map((t) => {
        if (t.name === tag) {
          return { ...t, checked: !t.checked }
        }
        return t
      })
      const selectedTags = includes(state.selectedTags, tag) ? state.selectedTags.filter((t) => t !== tag) : state.selectedTags.concat(tag)
      return {
        ...state,
        tags: updatedTags,
        selectedTags,
      }
    }
    default: {
      return state
    }
  }
}
