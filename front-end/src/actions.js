export const CLIPS_REQUEST = 'CLIPS_REQUEST'
export const CLIPS_SUCCESS = 'CLIPS_SUCCESS'
export const CLIPS_FAILURE = 'CLIPS_FAILURE'

export const CLIP_REQUEST = 'CLIP_REQUEST'
export const CLIP_SUCCESS = 'CLIP_SUCCESS'
export const CLIP_FAILURE = 'CLIP_FAILURE'

export const DELETE_CLIP_REQUEST = 'DELETE_CLIP_REQUEST'
export const DELETE_CLIP_SUCCESS = 'DELETE_CLIP_SUCCESS'
export const DELETE_CLIP_FAILURE = 'DELETE_CLIP_FAILURE'

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE'
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS'

export const GRAPPLERS_REQUEST  = 'GRAPPLERS_REQUEST'
export const GRAPPLERS_SUCCESS  = 'GRAPPLERS_SUCCESS'
export const GRAPPLERS_FAILURE  = 'GRAPPLERS_FAILURE'

export const CREATE_GRAPPLER_REQUEST  = 'CREATE_GRAPPLER_REQUEST'
export const CREATE_GRAPPLER_SUCCESS  = 'CREATE_GRAPPLER_SUCCESS'
export const CREATE_GRAPPLER_FAILURE  = 'CREATE_GRAPPLER_FAILURE'

export const GRAPPLER_REQUEST  = 'GRAPPLER_REQUEST'
export const GRAPPLER_SUCCESS  = 'GRAPPLER_SUCCESS'
export const GRAPPLER_FAILURE  = 'GRAPPLER_FAILURE'
export const CLEAR_GRAPPLER = 'CLEAR_GRAPPLER'

export function getClips(grapplerId) {
  return {
    type: CLIPS_REQUEST,
    grapplerId
  }
}

export function recieveClips(list) {
  return {
    type: CLIPS_SUCCESS,
    list,
  }
}

export function clipsFail(err) {
  return {
    type: CLIPS_FAILURE,
    err,
  }
}

export function getClip(url) {
  return {
    type: CLIP_REQUEST,
    url
  }
}

export function recieveClip() {
  return {
    type: CLIP_SUCCESS,
  }
}

export function clipFail(err) {
  return {
    type: CLIP_FAILURE,
    err,
  }
}

export const uploadRequest = (params) => ({
  type: UPLOAD_REQUEST,
  params
})

export const uploadSuccess = (file) => ({
  type: UPLOAD_SUCCESS,
  file
})

export const uploadFailure = (file, err) => ({
  type: UPLOAD_FAILURE,
  file,
  err
})

export function deleteClip(id) {
  return {
    type: DELETE_CLIP_REQUEST,
    id
  }
}

export function deleteClipSuccess() {
  return {
    type: DELETE_CLIP_SUCCESS,
  }
}

export function deleteClipFailure(err) {
  return {
    type: DELETE_CLIP_FAILURE,
    err,
  }
}

export const createGrappler = (data) => ({
  type: CREATE_GRAPPLER_REQUEST,
  data
})

export const createGrapplerSuccess = (file) => ({
  type: CREATE_GRAPPLER_SUCCESS,
  file
})

export const createGrapplerFailure = (err) => ({
  type: CREATE_GRAPPLER_FAILURE,
  err
})

export function getGrapplers() {
  return {
    type: GRAPPLERS_REQUEST,
  }
}

export function recieveGrapplers(list) {
  return {
    type: GRAPPLERS_SUCCESS,
    list,
  }
}

export function grapplersFail(err) {
  return {
    type: GRAPPLERS_FAILURE,
    err,
  }
}

export function getGrappler(id) {
  return {
    type: GRAPPLER_REQUEST,
    id,
  }
}

export function recieveGrappler(selected) {
  return {
    type: GRAPPLER_SUCCESS,
    selected,
  }
}

export function grapplerFail(err) {
  return {
    type: GRAPPLER_FAILURE,
    err,
  }
}

export function clearGrappler() {
  return {
    type: CLEAR_GRAPPLER
  }
}
