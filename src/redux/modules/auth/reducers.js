import { handleAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import {
  GET_PIN_REQUEST,
  GET_PIN_SUCCESS,
  GET_PIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_TOKEN,
  LOGOUT,
  SET_CODE_VISIBLE,
  SET_USER_INFO,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  SAVE_TRIGGER_ALERT,
} from './actions'
import { preloadersCreator, payloadExtractor } from '../../../helpers'

const isLoadingPin = handleActions(
  preloadersCreator(GET_PIN_REQUEST, GET_PIN_SUCCESS, GET_PIN_FAILURE),
  false,
)

const isUpdatingUser = handleActions(
  preloadersCreator(
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILURE,
  ),
  false,
)

const isLoadingLogin = handleActions(
  preloadersCreator(LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE),
  false,
)

const smsData = handleActions(
  {
    [GET_PIN_SUCCESS]: payloadExtractor,
    [GET_PIN_FAILURE]: R.always(null),
    [GET_PIN_REQUEST]: R.always(null),
  },
  null,
)

const authToken = handleActions(
  {
    [SET_TOKEN]: payloadExtractor,
    [LOGOUT]: R.always(null),
  },
  null,
)

const visibleCode = handleAction(SET_CODE_VISIBLE, payloadExtractor, false)

const user = handleAction(SET_USER_INFO, payloadExtractor, null)

const savingTrigger = handleActions(
  { [UPDATE_USER_INFO_SUCCESS]: R.T, [SAVE_TRIGGER_ALERT]: payloadExtractor },
  false,
)

export default combineReducers({
  isLoadingPin,
  isLoadingLogin,
  smsData,
  authToken,
  visibleCode,
  user,
  isUpdatingUser,
  savingTrigger,
})
