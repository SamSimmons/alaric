import { takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import {
  CLIPS_REQUEST, recieveClips, CLIPS_FAILURE,
  CLIP_REQUEST,
  UPLOAD_REQUEST, uploadProgress, uploadSuccess, uploadFailure,
  GRAPPLERS_REQUEST, recieveGrapplers, grapplersFail,
} from './actions'
import axios from 'axios'

export function* watcherSaga() {
  yield takeLatest(CLIPS_REQUEST, clipsSaga)
  yield takeLatest(CLIP_REQUEST, clipSaga)
  yield takeEvery(UPLOAD_REQUEST, uploadSaga)
  yield takeLatest(GRAPPLERS_REQUEST, grapplersSaga)
}

function* clipsSaga() {
  try {
    const response = yield call(
      () => axios({
        method: 'get',
        url: '/clips/'
      })
    )
    const list = response.data;
    yield put(recieveClips(list))
  } catch (err) {
    yield put({ type: CLIPS_FAILURE, err })
  }
}

function* clipSaga(action) {
  try {
    const response = yield call(
      () => axios({
        method: 'get',
        url: action.url
      })
    )

    console.log('resp', response)
  } catch (err) {
    console.log('err', err)
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

function* uploadSaga(action) {
  try {
    console.log('sdsdsad', action)
    const { grappler, video } = action.params
    const tags = action.params.tags.length ? action.params.tags.map((t) => t.value) : ""

    const data =  new FormData()

    data.append('grappler', grappler.value)
    data.append('tags', tags)
    data.append('video', video)

    const response = yield call(
      () => axios.post('/clips/', data)
    )
    uploadSuccess(response)
  } catch (err) {
    yield put(uploadFailure(err))
  }
}
