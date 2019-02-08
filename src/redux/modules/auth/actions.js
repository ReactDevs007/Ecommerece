import { createAction } from 'redux-actions'

export const GET_PIN_REQUEST = 'app/auth/GET_PIN_REQUEST'
export const GET_PIN_SUCCESS = 'app/auth/GET_PIN_SUCCESS'
export const GET_PIN_FAILURE = 'app/auth/GET_PIN_FAILURE'
export const LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'app/auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'app/auth/LOGIN_FAILURE'
export const LOGIN = 'app/auth/LOGIN'
export const LOGOUT = 'app/auth/LOGOUT'
export const SET_CODE_VISIBLE = 'app/auth/SET_CODE_VISIBLE'
export const SET_TOKEN = 'app/auth/SET_TOKEN'
export const SET_USER_INFO = 'app/auth/SET_USER_INFO'
export const UPDATE_USER_INFO_REQUEST = 'app/auth/UPDATE_USER_INFO'
export const UPDATE_USER_INFO_SUCCESS = 'app/auth/UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILURE = 'app/auth/UPDATE_USER_INFO_FAILURE'
export const SAVE_TRIGGER_ALERT = 'app/auth/SAVE_TRIGGER_ALERT'

export const getPinRequest = createAction(GET_PIN_REQUEST)
export const getPinSuccess = createAction(GET_PIN_SUCCESS)
export const getPinFailure = createAction(GET_PIN_FAILURE)
export const loginRequest = createAction(LOGIN_REQUEST)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFailure = createAction(LOGIN_FAILURE)
export const login = createAction(LOGIN)
export const logout = createAction(LOGOUT)
export const setCodeVisible = createAction(SET_CODE_VISIBLE)
export const setTokenToState = createAction(SET_TOKEN)
export const setUserInfo = createAction(SET_USER_INFO)
export const updateUserInfoRequest = createAction(UPDATE_USER_INFO_REQUEST)
export const updateUserInfoSuccess = createAction(UPDATE_USER_INFO_SUCCESS)
export const updateUserInfoFailure = createAction(UPDATE_USER_INFO_FAILURE)
export const saveTriggerAlert = createAction(SAVE_TRIGGER_ALERT)
