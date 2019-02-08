import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { getToken } from '../auth/repositories'
import { getSpecials } from './managers'
import { Dimensions } from 'react-native'
import {
  getSpecialsSuccess,
  getSpecialsFailure,
  GET_SPECIALS_REQUEST,
} from './actions'

const { width: deviceWidth } = Dimensions.get('window')

function* getSpecialsSaga() {
  const token = yield call(getToken)
  try {
    const specials = yield call(getSpecials, token, deviceWidth)

    yield put(getSpecialsSuccess(specials))
  } catch (err) {
    yield put(getSpecialsFailure())
  }
}

export default function*() {
  yield all([takeLatest(GET_SPECIALS_REQUEST, getSpecialsSaga)])
}
