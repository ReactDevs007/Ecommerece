import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import { preloadersCreator, payloadExtractor } from '../../../helpers'
import {
  GET_COMPANY_INFO_REQUEST,
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_FAILURE,
  GET_APP_INFO_REQUEST,
  GET_APP_INFO_SUCCESS,
  GET_APP_INFO_FAILURE,
} from './actions'

const isLoadingCompanyInfo = handleActions(
  preloadersCreator(
    GET_COMPANY_INFO_REQUEST,
    GET_COMPANY_INFO_SUCCESS,
    GET_COMPANY_INFO_FAILURE,
  ),
  false,
)

const isLoadingAppInfo = handleActions(
  preloadersCreator(
    GET_APP_INFO_REQUEST,
    GET_APP_INFO_SUCCESS,
    GET_APP_INFO_FAILURE,
  ),
  false,
)

const companyInfo = handleActions(
  {
    [GET_COMPANY_INFO_SUCCESS]: payloadExtractor,
    [GET_COMPANY_INFO_REQUEST]: R.always(''),
    [GET_COMPANY_INFO_FAILURE]: R.always(''),
  },
  '',
)

const appInfo = handleActions(
  {
    [GET_APP_INFO_SUCCESS]: payloadExtractor,
    [GET_APP_INFO_REQUEST]: R.always(''),
    [GET_COMPANY_INFO_FAILURE]: R.always(''),
  },
  '',
)

export default combineReducers({
  isLoadingCompanyInfo,
  isLoadingAppInfo,
  companyInfo,
  appInfo,
})
