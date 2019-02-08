import { createAction } from 'redux-actions'

export const GET_ORDER_LIST_REQUEST = 'app/order/GET_ORDER_LIST_REQUEST'
export const GET_ORDER_LIST_SUCCESS = 'app/order/GET_ORDER_LIST_SUCCESS'
export const GET_ORDER_LIST_FAILURE = 'app/order/GET_ORDER_LIST_FAILURE'
export const REMOVE_PRODUCT_FROM_ORDER_REQUEST =
  'app/order/REMOVE_PRODUCT_FROM_ORDER_REQUEST'
export const REMOVE_PRODUCT_FROM_ORDER_SUCCESS =
  'app/order/REMOVE_PRODUCT_FROM_ORDER_SUCCESS'
export const REMOVE_PRODUCT_FROM_ORDER_FAILURE =
  'app/order/REMOVE_PRODUCT_FROM_ORDER_FAILURE'
export const ADD_PRODUCT_TO_ORDER_REQUEST =
  'app/order/ADD_PRODUCT_TO_ORDER_REQUEST'
export const ADD_PRODUCT_TO_ORDER_SUCCESS =
  'app/order/ADD_PRODUCT_TO_ORDER_SUCCESS'
export const ADD_PRODUCT_TO_ORDER_FAILURE =
  'app/order/ADD_PRODUCT_TO_ORDER_FAILURE'
export const CLEAR_REQUEST = 'add/order/CLEAR_REQUEST'
export const CLEAR_SUCCESS = 'add/order/CLEAR_SUCCESS'
export const CLEAR_FAILURE = 'add/order/CLEAR_FAILURE'
export const PAYMENT_REQUEST = 'app/order/PAYMENT_REQUEST'

export const getOrderListRequest = createAction(GET_ORDER_LIST_REQUEST)
export const getOrderListSuccess = createAction(GET_ORDER_LIST_SUCCESS)
export const getOrderListFailure = createAction(GET_ORDER_LIST_FAILURE)
export const removeProductFromOrderRequest = createAction(
  REMOVE_PRODUCT_FROM_ORDER_REQUEST,
)
export const removeProductFromOrderSuccess = createAction(
  REMOVE_PRODUCT_FROM_ORDER_SUCCESS,
)
export const removeProductFromOrderFailure = createAction(
  REMOVE_PRODUCT_FROM_ORDER_FAILURE,
)
export const addProductToOrderRequest = createAction(
  ADD_PRODUCT_TO_ORDER_REQUEST,
)
export const addProductToOrderSuccess = createAction(
  ADD_PRODUCT_TO_ORDER_SUCCESS,
)
export const addProductToOrderFailure = createAction(
  ADD_PRODUCT_TO_ORDER_FAILURE,
)
export const clearRequest = createAction(CLEAR_REQUEST)
export const clearFailure = createAction(CLEAR_FAILURE)
export const clearSuccess = createAction(CLEAR_SUCCESS)
export const paymentRequest = createAction(PAYMENT_REQUEST)
