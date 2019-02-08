import { combineReducers } from 'redux'
import * as R from 'ramda'
import { handleAction, handleActions } from 'redux-actions'
import {
  payloadExtractor,
  preloadersCreator,
  appendToState,
} from '../../../helpers'
import {
  GET_CATALOG_REQUEST,
  GET_CATALOG_SUCCESS,
  GET_CATALOG_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  SET_FILTERS,
  RESET_PRODUCTS,
  SET_PRODUCTS_TOTAL,
  SET_SELECTED_FILTERS,
  RESET_SELECTED_FILTERS,
} from './actions'

const isLoadingCatalog = handleActions(
  preloadersCreator(
    GET_CATALOG_REQUEST,
    GET_CATALOG_SUCCESS,
    GET_CATALOG_FAILURE,
  ),
  false,
)

const isLoadingProducts = handleActions(
  preloadersCreator(
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
  ),
  false,
)

const catalog = handleAction(GET_CATALOG_SUCCESS, payloadExtractor, [])

const products = handleActions(
  {
    [GET_PRODUCTS_SUCCESS]: appendToState,
    [RESET_PRODUCTS]: R.always([]),
  },
  [],
)

const productsTotal = handleAction(SET_PRODUCTS_TOTAL, payloadExtractor, 0)

const isLoadingProduct = handleActions(
  preloadersCreator(
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
  ),
  false,
)

const selectedProduct = handleAction(GET_PRODUCT_SUCCESS, payloadExtractor, {})

const filters = handleAction(SET_FILTERS, payloadExtractor, [])

const selectedFilters = handleActions(
  {
    [SET_SELECTED_FILTERS]: payloadExtractor,
    [RESET_SELECTED_FILTERS]: R.always([]),
  },
  [],
)

export default combineReducers({
  isLoadingCatalog,
  isLoadingProducts,
  isLoadingProduct,
  catalog,
  products,
  selectedProduct,
  filters,
  productsTotal,
  selectedFilters,
})
