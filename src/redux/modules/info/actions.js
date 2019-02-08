import { createAction } from 'redux-actions'

export const GET_COMPANY_INFO_REQUEST = 'app/info/GET_COMPANY_INFO_REQUEST'
export const GET_COMPANY_INFO_SUCCESS = 'app/info/GET_COMPANY_INFO_SUCCESS'
export const GET_COMPANY_INFO_FAILURE = 'app/info/GET_COMPANY_INFO_FAILURE'
export const GET_APP_INFO_REQUEST = 'app/info/GET_APP_INFO_REQUEST'
export const GET_APP_INFO_SUCCESS = 'app/info/GET_APP_INFO_SUCCESS'
export const GET_APP_INFO_FAILURE = 'app/info/GET_APP_INFO_FAILURE'

export const NAVIGATE_TO_HELP_SERVICE = 'app/info/NAVIGATE_TO_HELP_SERVICE'

export const getCompanyInfoRequest = createAction(GET_COMPANY_INFO_REQUEST)
export const getCompanyInfoSuccess = createAction(GET_COMPANY_INFO_SUCCESS)
export const getCompanyInfoFailure = createAction(GET_COMPANY_INFO_FAILURE)
export const getAppInfoRequest = createAction(GET_APP_INFO_REQUEST)
export const getAppInfoSuccess = createAction(GET_APP_INFO_SUCCESS)
export const getAppInfoFailure = createAction(GET_APP_INFO_FAILURE)

export const navigateToHelpService = createAction(NAVIGATE_TO_HELP_SERVICE)
