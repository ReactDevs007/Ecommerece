import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import {
  GET_SHOPS_REQUEST,
  GET_SHOPS_FAILURE,
  GET_SHOPS_SUCCESS,
} from './actions'
import { payloadExtractor, preloadersCreator } from '../../../helpers'

const isLoading = handleActions(
  preloadersCreator(GET_SHOPS_REQUEST, GET_SHOPS_FAILURE, GET_SHOPS_SUCCESS),
  false,
)

const shopsOnMap = handleActions(
  {
    [GET_SHOPS_REQUEST]: R.always([]),
    [GET_SHOPS_SUCCESS]: payloadExtractor,
  },
  [],
)

export default combineReducers({ isLoading, shopsOnMap })
