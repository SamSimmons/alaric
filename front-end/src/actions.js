export const CLIPS_REQUEST = 'CLIPS_REQUEST'
export const CLIPS_SUCCESS = 'CLIPS_SUCCESS'
export const CLIPS_FAILURE = 'CLIPS_FAILURE'

export const CLIP_REQUEST = 'CLIP_REQUEST'
export const CLIP_SUCCESS = 'CLIP_SUCCESS'
export const CLIP_FAILURE = 'CLIP_FAILURE'

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE'
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS'

export const GRAPPLERS_REQUEST  = 'GRAPPLERS_REQUEST'
export const GRAPPLERS_SUCCESS  = 'GRAPPLERS_SUCCESS'
export const GRAPPLERS_FAILURE  = 'GRAPPLERS_FAILURE'

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

export const uploadProgress = (file, progress) => ({
  type: UPLOAD_PROGRESS,
  file,
  progress,
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
