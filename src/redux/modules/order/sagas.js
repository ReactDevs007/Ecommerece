import { all, call, takeLatest, select, put } from 'redux-saga/effects'
import * as R from 'ramda'
import {
  GET_ORDER_LIST_REQUEST,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  REMOVE_PRODUCT_FROM_ORDER_REQUEST,
  getOrderListFailure,
  getOrderListSuccess,
  addProductToOrderFailure,
  addProductToOrderSuccess,
  removeProductFromOrderFailure,
  removeProductFromOrderSuccess,
  CLEAR_REQUEST,
  clearFailure,
  clearSuccess,
  paymentRequest,
} from './actions'
import { getToken } from '../auth'
import {
  getUserOrder,
  addProductToOrder,
  removeProductFromOrder,
  clearOrder,
} from './managers'
import NavigationService from '../../../services/NavigationService'
import { NAVIGATORS } from '../../../constants'
import { Alert } from 'react-native'

function* getUserOrderSaga() {
  try {
    const token = yield call(getToken)
    const order = yield call(getUserOrder, token)
    yield put(getOrderListSuccess(order))
  } catch (ex) {
    yield put(getOrderListFailure())
  }
}

function* addProductToOrderSaga({ payload: id }) {
  try {
    const token = yield call(getToken)
    const order = yield call(addProductToOrder, token, id)
    yield put(addProductToOrderSuccess())
    yield put(getOrderListSuccess(order))
    yield call(NavigationService.navigate, NAVIGATORS.MAIN.SHOPING_CART)
  } catch (ex) {
    yield put(addProductToOrderFailure())
  }
}

function* removeProductToOrderSaga({ payload: id }) {
  try {
    const token = yield call(getToken)
    const order = yield call(removeProductFromOrder, token, id)

    yield put(removeProductFromOrderSuccess())
    yield put(getOrderListSuccess(order))
    if (R.isEmpty(order || {})) {
      yield call(NavigationService.navigate, NAVIGATORS.MAIN.CATALOG)
    }
  } catch (ex) {
    yield put(removeProductFromOrderSuccess())
  }
}

function* clearSaga() {
  try {
    yield call(NavigationService.navigate, NAVIGATORS.MAIN.CATALOG)
    const token = yield select(getToken)
    const order = yield call(clearOrder, token)
    yield put(clearSuccess())
    yield put(getOrderListSuccess(order))
  } catch (ex) {
    yield put(clearFailure())
  }
}

function* paymentSaga({ payload: form }) {
  try {
    if (form.paymentMethod !== 'afterShipment') {
      Alert.alert('Извините', 'данный метод оплаты временно недоступен!')
    } else {
      yield call(NavigationService.navigate, NAVIGATORS.MAIN.PAYMENT)
    }
  } catch (ex) {
    //
  }
}

export default function*() {
  yield all([
    takeLatest(GET_ORDER_LIST_REQUEST, getUserOrderSaga),
    takeLatest(ADD_PRODUCT_TO_ORDER_REQUEST, addProductToOrderSaga),
    takeLatest(REMOVE_PRODUCT_FROM_ORDER_REQUEST, removeProductToOrderSaga),
    takeLatest(CLEAR_REQUEST, clearSaga),
    takeLatest(paymentRequest, paymentSaga),
  ])
}
