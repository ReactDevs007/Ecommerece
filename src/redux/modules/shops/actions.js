import { createAction } from 'redux-actions'

export const GET_SHOPS_REQUEST = 'app/shops/GET_SHOPS_REQUEST'
export const GET_SHOPS_SUCCESS = 'app/shops/GET_SHOPS_SUCCESS'
export const GET_SHOPS_FAILURE = 'app/shops/GET_SHOPS_FAILURE'

export const getShopsRequest = createAction(GET_SHOPS_REQUEST)
export const getShopsSuccess = createAction(GET_SHOPS_SUCCESS)
export const getShopsFailure = createAction(GET_SHOPS_FAILURE)
