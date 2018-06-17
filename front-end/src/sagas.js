import { takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import {
  CLIPS_REQUEST, recieveClips, CLIPS_FAILURE,
  CLIP_REQUEST,
  UPLOAD_REQUEST, uploadSuccess, uploadFailure,
  GRAPPLERS_REQUEST, recieveGrapplers, grapplersFail,
  CREATE_GRAPPLER_REQUEST, createGrapplerSuccess, createGrapplerFailure,
} from './actions'
import { push } from 'connected-react-router'
import axios from 'axios'

export function* watcherSaga() {
  yield takeLatest(CLIPS_REQUEST, clipsSaga)
  yield takeLatest(CLIP_REQUEST, clipSaga)
  yield takeEvery(UPLOAD_REQUEST, uploadSaga)
  yield takeLatest(GRAPPLERS_REQUEST, grapplersSaga)
  yield takeLatest(CREATE_GRAPPLER_REQUEST, createGrapplerSaga)
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
