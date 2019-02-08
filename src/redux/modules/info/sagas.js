import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { Linking } from 'react-native'
import NavigationService from '../../../services/NavigationService'
import { NAVIGATORS } from '../../../constants'
import { getCompanyInfo, getAppInfo } from './managers'
import {
  getCompanyInfoSuccess,
  GET_COMPANY_INFO_REQUEST,
  getAppInfoSuccess,
  GET_APP_INFO_REQUEST,
  NAVIGATE_TO_HELP_SERVICE,
} from './actions'
import { getToken, getUserInfo } from '../auth'
import { createMailLink } from '../../../helpers'

function* getCompanyInfoSaga() {
  const token = yield call(getToken)
  const companyInfo = yield call(getCompanyInfo, token)
  yield put(getCompanyInfoSuccess(companyInfo))
}

function* getAppInfoSaga() {
  const token = yield call(getToken)
  if (token) {
    const appInfo = yield call(getAppInfo, token)
    yield put(getAppInfoSuccess(appInfo))
  } else {
    yield call(NavigationService.navigate, NAVIGATORS.APP.AUTH)
  }
}

function* navigateToHelpServiceSaga() {
  const { phone, lastName, sureName } = yield select(getUserInfo)
  const userData = lastName || sureName ? `${lastName} ${sureName} ` : ''

  const userLink = createMailLink(userData, phone)

  Linking.canOpenURL(userLink).then(supported => {
    if (supported) {
      Linking.openURL(userLink)
    }
  })
}

export default function*() {
  yield all([
    takeLatest(GET_COMPANY_INFO_REQUEST, getCompanyInfoSaga),
    takeLatest(GET_APP_INFO_REQUEST, getAppInfoSaga),
    takeLatest(NAVIGATE_TO_HELP_SERVICE, navigateToHelpServiceSaga),
  ])
}
