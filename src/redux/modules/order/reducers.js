import { handleAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import { payloadExtractor, preloadersCreator } from '../../../helpers'
import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  ADD_PRODUCT_TO_ORDER_FAILURE,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  ADD_PRODUCT_TO_ORDER_SUCCESS,
  REMOVE_PRODUCT_FROM_ORDER_FAILURE,
  REMOVE_PRODUCT_FROM_ORDER_SUCCESS,
  REMOVE_PRODUCT_FROM_ORDER_REQUEST,
  CLEAR_REQUEST,
  CLEAR_SUCCESS,
  CLEAR_FAILURE,
} from './actions'

const isGettingOrder = handleActions(
  preloadersCreator(
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILURE,
  ),
  false,
)

const isSendActionAdd = handleActions(
  preloadersCreator(
    ADD_PRODUCT_TO_ORDER_REQUEST,
    ADD_PRODUCT_TO_ORDER_SUCCESS,
    ADD_PRODUCT_TO_ORDER_FAILURE,
  ),
  false,
)

const isSendActionDelete = handleActions(
  preloadersCreator(
    REMOVE_PRODUCT_FROM_ORDER_REQUEST,
    REMOVE_PRODUCT_FROM_ORDER_SUCCESS,
    REMOVE_PRODUCT_FROM_ORDER_FAILURE,
  ),
  false,
)

const isSendActionClear = handleActions(
  preloadersCreator(CLEAR_REQUEST, CLEAR_SUCCESS, CLEAR_FAILURE),
  false,
)

const userOrder = handleAction(GET_ORDER_LIST_SUCCESS, payloadExtractor, {})

export default combineReducers({
  isGettingOrder,
  userOrder,
  isSendActionDelete,
  isSendActionAdd,
  isSendActionClear,
})
