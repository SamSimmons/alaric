import { takeLatest, call, put, takeEvery, select } from 'redux-saga/effects'
import {
  CLIPS_REQUEST, recieveClips, clipsFail,
  CLIP_REQUEST, recieveClip, clipFail,
  UPLOAD_REQUEST, uploadSuccess, uploadFailure,
  GRAPPLERS_REQUEST, recieveGrapplers, grapplersFail,
  GRAPPLER_REQUEST, recieveGrappler, grapplerFail,
  CREATE_GRAPPLER_REQUEST, createGrapplerSuccess, createGrapplerFailure,
  DELETE_CLIP_REQUEST, deleteClipSuccess, deleteClipFailure,
  UPDATE_CLIP_REQUEST, updateClipSuccess, updateClipFailure,
  GET_TAGS_REQUEST, getTagsSuccess, getTagsFailure,
  UPDATE_GRAPPLER_FILTER, UPDATE_TAG_FILTER,
} from './actions'
import { push } from 'connected-react-router'
import axios from 'axios'
import { find } from 'lodash'
import { getQueryParams } from './utils'

export function* watcherSaga() {
  yield takeLatest(CLIPS_REQUEST, clipsSaga)
  yield takeLatest(CLIP_REQUEST, clipSaga)
  yield takeEvery(UPLOAD_REQUEST, uploadSaga)
  yield takeEvery(DELETE_CLIP_REQUEST, deleteClipSaga)
  yield takeLatest(UPDATE_CLIP_REQUEST, updateClipSaga)
  yield takeLatest(GRAPPLERS_REQUEST, grapplersSaga)
  yield takeLatest(GRAPPLER_REQUEST, grapplerSaga)
  yield takeLatest(CREATE_GRAPPLER_REQUEST, createGrapplerSaga)
  yield takeLatest(GET_TAGS_REQUEST, getTagsSaga)
  yield takeLatest(UPDATE_GRAPPLER_FILTER, getFilteredClipsSaga)
  yield takeLatest(UPDATE_TAG_FILTER, getFilteredClipsSaga)
}

function* clipsSaga(action) {
  try {
    const { params } = action

    const response = yield call(() => axios({ method: 'get', url: `/clips/${getQueryParams(params)}` }))
    const list = response.data
    yield put(recieveClips(list))
  } catch (err) {
    yield put(clipsFail(err))
  }
}

function* clipSaga(action) {
  try {
    const { id } = action
    const response = yield call(() => axios({ method: 'get', url: `/clips/${id}/` }))
    yield put(recieveClip(response.data))
  } catch (err) {
    yield put(clipFail(err))
  }
}

function* grapplersSaga() {
  try {
    const response = yield call(
      () => axios({
        method: 'get',
        url: '/grapplers/'
      })
    )
    const list = response.data;
    yield put(recieveGrapplers(list))
  } catch (err) {
    yield put(grapplersFail(err))
  }
}

function* grapplerSaga(action) {
  try {
    const { id } = action
    const grapplers = yield select((state) => state.grapplers.list)
    const found = find(grapplers, ['id', +id])
    if (found) {
      yield put(recieveGrappler(found))
    } else {
      const response = yield call(
        () => axios({
          method: 'get',
          url: `/grapplers/${id}/`
        })
      )
      yield put(recieveGrappler(response.data))
    }
  } catch (err) {
    yield put(grapplerFail(err))
  }
}

function* createGrapplerSaga(action) {
  try {
    const { name, avatar } = action.data
    const data = new FormData()
    data.append('name', name)
    if (avatar) {
      data.append('avatar', avatar)
    }

    const response = yield call(
      () => axios({
        method: 'post',
        url: '/grapplers/',
        data
      })
    )
    const list = response.data;
    yield put(createGrapplerSuccess(list))
    yield put(push('/'))
  } catch (err) {
    yield put(createGrapplerFailure(err))
  }
}

function* uploadSaga(action) {
  try {
    const { grappler, files } = action.params
    const tags = action.params.tags.length ? action.params.tags.map((t) => t.value) : ""

    const data =  new FormData()
    data.append('grappler', grappler.value)
    data.append('tags', tags)
    for(let key in files) {
      data.append(`videos[${key}]`, files[key])
    }
    const response = yield call(
      () => axios.post(
        '/clips/?multi=true',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    )
    yield put(uploadSuccess(response))
    yield put(push(`/${grappler.value}/`))
  } catch (err) {
    yield put(uploadFailure(err))
  }
}

function* deleteClipSaga(action) {
  try {
    const { id } = action
    yield call(
      () => axios({
        method: 'delete',
        url: `/clips/${id}/`,
      })
    )
    yield put(deleteClipSuccess())
    yield put(push('/'))
  } catch (err) {
    yield put(deleteClipFailure(err))
  }
}

function* updateClipSaga(action) {
  try {
    const { id, payload } = action
    const data = new FormData()
    for (const key in payload) {
      if (payload[key]) {
        data.append(key, payload[key])
      }
    }

    const result = yield call(
      () => axios({
        method: 'patch',
        url: `/clips/${id}/`,
        data,
      })
    )
    yield put(updateClipSuccess(result.data))
  } catch (err) {
    yield put(updateClipFailure(err))
  }
}

function* getTagsSaga(action) {
  try {
    const { params } = action
    const response = yield call(
      () => axios.get(`/tags/${params}`)
    )
    yield put(getTagsSuccess(response.data))
  } catch (err) {
    yield put(getTagsFailure(err))
  }
}

function* getFilteredClipsSaga(action) {
  try {
    const { grappler, selectedTags } = yield select((state) => state.filters)
    const { nextPage } = yield select((state) => state.clips)
    const params = getQueryParams({ grappler, tags: selectedTags, page: nextPage })
    const response = yield call(() => axios({ method: 'get', url: `/clips/${params}` }))
    const list = response.data
    yield put(recieveClips(list))
  } catch (err) {
    yield put(clipsFail(err))
  }
}
