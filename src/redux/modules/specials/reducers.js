import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import { preloadersCreator, payloadExtractor } from '../../../helpers'
import {
  GET_SPECIALS_REQUEST,
  GET_SPECIALS_SUCCESS,
  GET_SPECIALS_FAILURE,
} from './actions'

const isLoading = handleActions(
  preloadersCreator(
    GET_SPECIALS_REQUEST,
    GET_SPECIALS_SUCCESS,
    GET_SPECIALS_FAILURE,
  ),
  false,
)

const specials = handleActions(
  {
    [GET_SPECIALS_REQUEST]: R.always([]),
    [GET_SPECIALS_SUCCESS]: payloadExtractor,
    [GET_SPECIALS_FAILURE]: R.always([]),
  },
  [],
)

export default combineReducers({
  isLoading,
  specials,
})
