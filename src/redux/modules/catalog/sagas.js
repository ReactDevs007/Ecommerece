import { all, call, takeLatest, put, select } from 'redux-saga/effects'
import * as R from 'ramda'
import {
  getCatalog,
  getCatalogProducts,
  getProduct,
  getFilters,
  getFilteredProducts,
} from './managers'
import {
  GET_CATALOG_REQUEST,
  GET_PRODUCTS_REQUEST,
  getProductFailure,
  getProductsFailure,
  getCatalogSuccess,
  GET_PRODUCT_REQUEST,
  getProductSuccess,
  setFilters,
  setProductsTotal,
  getProductsSuccess,
} from './actions'
import { getLoadedProducts, getSelectedFilters } from './selectors'
import NavigationService from '../../../services/NavigationService'
import { NAVIGATORS } from '../../../constants'
import { getToken } from '../../modules/auth'

function* getCatalogSaga() {
  try {
    const token = yield call(getToken)
    const { catalog } = yield call(getCatalog, token)

    const filters = yield call(getFilters, token)
    yield put(setFilters(filters))

    yield put(getCatalogSuccess(catalog))
  } catch (ex) {
    //pass
  }
}

function* getSelectedProductSaga({ payload }) {
  try {
    const token = yield call(getToken)

    yield call(NavigationService.navigate, NAVIGATORS.MAIN.PRODUCT)
    const product = yield call(getProduct, payload, token)

    yield put(getProductSuccess(product))
  } catch (ex) {
    yield put(getProductFailure())
    //pass
  }
}

function* getProductsSaga({ payload: filters }) {
  try {
    const token = yield call(getToken)

    const loadedProducts = yield select(getLoadedProducts)
    const selectedFiltersData = yield select(getSelectedFilters)

    console.log(selectedFiltersData)
    const { total = 0, products = [] } = yield call(
      getFilteredProducts,
      token,
      selectedFiltersData,
      Math.round(loadedProducts.length / 10) + 1,
    )

    yield put(setProductsTotal(total))
    yield put(getProductsSuccess(products))
  } catch (ex) {
    yield put(getProductsFailure())
  }
}

export default function*() {
  yield all([
    takeLatest(GET_CATALOG_REQUEST, getCatalogSaga),
    takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga),
    takeLatest(GET_PRODUCT_REQUEST, getSelectedProductSaga),
  ])
}
