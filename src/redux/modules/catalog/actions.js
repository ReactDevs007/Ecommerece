import { createAction } from 'redux-actions'

export const GET_CATALOG_REQUEST = 'app/catalog/GET_CATALOG_REQUEST'
export const GET_CATALOG_SUCCESS = 'app/catalog/GET_CATALOG_SUCCESS'
export const GET_CATALOG_FAILURE = 'app/catalog/GET_CATALOG_FAILURE'
export const GET_PRODUCTS_REQUEST = 'app/catalog/GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'app/catalog/GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'app/catalog/GET_PRODUCTS_FAILURE'
export const SELECT_PRODUCT = 'app/catalog/SELECT_PRODUCT'
export const GET_PRODUCT_REQUEST = 'app/catalog/GET_PRODUCT_REQUEST'
export const GET_PRODUCT_SUCCESS = 'app/catalog/GET_PRODUCT_SUCCESS'
export const GET_PRODUCT_FAILURE = 'app/catalog/GET_PRODUCT_FAILURE'

export const SET_FILTERS = 'app/catalog/SET_FILTERS'
export const SET_PRODUCTS_TOTAL = 'app/catalog/SET_PRODUCTS_TOTAL'
export const RESET_PRODUCTS = 'app/catalog/RESET_PRODUCTS'

export const SET_SELECTED_FILTERS = 'app/catalog/SET_SELECTED_FILTERS'
export const RESET_SELECTED_FILTERS = 'app/catalog/RESET_SELECTED_FILTERS'

export const getCatalogRequest = createAction(GET_CATALOG_REQUEST)
export const getCatalogSuccess = createAction(GET_CATALOG_SUCCESS)
export const getCatalogFailure = createAction(GET_CATALOG_FAILURE)
export const getProductsRequest = createAction(GET_PRODUCTS_REQUEST)
export const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS)
export const getProductsFailure = createAction(GET_PRODUCTS_FAILURE)
export const selectProduct = createAction(SELECT_PRODUCT)
export const getProductRequest = createAction(GET_PRODUCT_REQUEST)
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS)
export const getProductFailure = createAction(GET_PRODUCT_FAILURE)

export const setFilters = createAction(SET_FILTERS)
export const setProductsTotal = createAction(SET_PRODUCTS_TOTAL)
export const resetProducts = createAction(RESET_PRODUCTS)

export const setSelectedFilters = createAction(SET_SELECTED_FILTERS)
export const resetSelectedFilters = createAction(RESET_SELECTED_FILTERS)
