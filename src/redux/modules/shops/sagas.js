import { all, call, takeLatest, put } from 'redux-saga/effects'
import { GET_SHOPS_REQUEST, getShopsSuccess, getShopsFailure } from './actions'
import { getToken } from '../auth'
import { getShopsOnMap } from './managers'

function* getShopsSaga() {
  try {
    const token = yield call(getToken)
    const shops = yield call(getShopsOnMap, token)
    yield put(getShopsSuccess(shops))
  } catch (ex) {
    yield put(getShopsFailure(ex))
  }
}

export default function*() {
  yield all([takeLatest(GET_SHOPS_REQUEST, getShopsSaga)])
}
