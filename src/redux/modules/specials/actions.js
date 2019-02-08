import { createAction } from 'redux-actions'

export const GET_SPECIALS_REQUEST = 'app/specials/GET_SPECIALS_REQUEST'
export const GET_SPECIALS_SUCCESS = 'app/specials/GET_SPECIALS_SUCCESS'
export const GET_SPECIALS_FAILURE = 'app/specials/GET_SPECIALS_FAILURE'

export const getSpecialsRequest = createAction(GET_SPECIALS_REQUEST)
export const getSpecialsSuccess = createAction(GET_SPECIALS_SUCCESS)
export const getSpecialsFailure = createAction(GET_SPECIALS_FAILURE)
