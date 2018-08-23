import {
  GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
  UPDATE_GRAPPLER_FILTER, UPDATE_TAG_FILTER, UPDATE_OPPONENTS_FILTER,
  OPPONENTS_REQUEST, OPPONENTS_SUCCESS,
} from '../actions'

const initialState = {
  tags: [],
  selectedTags: [],
  opponents: [],
  selectedOpponents: [],
  grappler: 'All',
  untagged: false,
  status: 'ok',
}

export default function(state = initialState, action) {
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
        if (tag === "untagged") {
          return { ...t, checked: false }
        }
        if (t.name === tag) {
          return { ...t, checked: !t.checked }
        }
        return t
      })
      let selectedTags = updatedTags.filter((t) => t.checked).map((t) => t.name)

      if (tag === "untagged" && !state.untagged) {
        selectedTags = ["untagged"]
      }

      let untagged = (tag === "untagged" && !state.untagged) ? true : false

      return {
        ...state,
        tags: updatedTags,
        selectedTags,
        untagged,
      }
    }
    case OPPONENTS_REQUEST: {
      return {
        ...state,
        list: [],
      }
    }
    case OPPONENTS_SUCCESS: {
      let opponents = action.payload
        .filter(({opponent}) => opponent !== '')
        .map(o => ({ name: o.opponent, checked: false }))

      return {
        ...state,
        opponents,
      }
    }
    case UPDATE_OPPONENTS_FILTER: {
      const { opponent } = action
      const opponents = state.opponents.map((o) => {
        if (o.name !== opponent) { return o }
        return {
          name: o.name,
          checked: !o.checked,
        }
      })
      const selectedOpponents = opponents.filter(o => o.checked).map(o => o.name)
      return {
        ...state,
        opponents,
        selectedOpponents,
      }
    }
    default: {
      return state
    }
  }
}
