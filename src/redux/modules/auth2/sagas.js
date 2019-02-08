import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import * as R from 'ramda'
import { Alert } from 'react-native'
import {
  GET_PIN_REQUEST,
  LOGIN_REQUEST,
  LOGIN,
  getPinSuccess,
  getPinFailure,
  loginSuccess,
  loginFailure,
  setTokenToState,
  setCodeVisible,
  login,
  setUserInfo,
  LOGOUT,
  updateUserInfoFailure,
  updateUserInfoSuccess,
  UPDATE_USER_INFO_REQUEST,
} from './actions'
import { getPin, loginUser, getUserInfo, updateUserInfo } from './managers'
import { setToken as setTokenRepo, getToken } from './repositories'
import NavigationService from '../../../services/NavigationService'
import { NAVIGATORS } from '../../../constants'
import { getSmsData } from './selectors'
import { getOrderListRequest } from '../order'
import { getBonusesRequest } from '../bonuses'

function* loginSaga() {
  const token = yield call(getToken)
  if (token) {
    try {
      yield put(setTokenToState(token))
      const user = yield call(getUserInfo, token)
      yield put(setUserInfo(R.evolve({ agreement: x => !!x }, user)))
      yield put(loginSuccess())
      yield put(setCodeVisible(false))
      yield call(NavigationService.navigate, NAVIGATORS.APP.MAIN)
      yield put(getBonusesRequest())
      yield put(getOrderListRequest())
    } catch (ex) {
      yield call(NavigationService.navigate, NAVIGATORS.APP.AUTH)
    }
  } else {
    yield call(NavigationService.navigate, NAVIGATORS.APP.AUTH)
  }
}

function* logoutSaga() {
  yield call(setTokenRepo, '')
  yield put(setUserInfo({}))
  yield call(NavigationService.navigate, NAVIGATORS.APP.CHECK_TOKENS)
}

function* getPinSaga({ payload: phone }) {
  try {
    const sms = yield call(getPin, phone)

    Alert.alert(
      'Важно',
      `PIN код: ${sms.pin}. В дальнейшем он будет приходить по смс.`,
    )

    yield put(getPinSuccess(sms))
    yield put(setCodeVisible(true))
  } catch (ex) {
    console.log(ex)
    Alert.alert('Ошибка', 'Ошибка запроса pin кода')
    yield put(getPinFailure(ex))
  }
}

function* loginUserSaga({ payload: enteredPin }) {
  const { pin, login: loginLink } = yield select(getSmsData)
  try {
    if (enteredPin === pin) {
      const accessToken = yield call(loginUser, loginLink)
      yield call(setTokenRepo, accessToken)
      yield put(login())
    } else {
      Alert.alert('Ошибка!', ' Проверьте правильность ввода данных!')
      yield put(loginFailure())
    }
  } catch (ex) {
    yield put(loginFailure(ex))
  }
}

function* updateUserSaga({ payload }) {
  try {
    const token = yield call(getToken)

    yield call(updateUserInfo, token, payload)
    yield put(updateUserInfoSuccess())
    yield put(setUserInfo(updatedUserInfo))
  } catch (ex) {
    yield put(updateUserInfoFailure())
  }
}

export default function*() {
  yield all([
    takeLatest(GET_PIN_REQUEST, getPinSaga),
    takeLatest(LOGIN_REQUEST, loginUserSaga),
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(UPDATE_USER_INFO_REQUEST, updateUserSaga),
  ])
}
