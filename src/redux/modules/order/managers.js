import * as R from 'ramda'
import ENDPOINTS from '../../../api'
import { changePropTo } from '../../../helpers'
import axios from 'axios'
import { avalivableTime } from '../../../mocks'

export const getUserOrder = token =>
  fetch(ENDPOINTS.GET_ORDER(token))
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        return R.evolve({
          goods: R.map(
            R.pipe(
              changePropTo('id', 'key'),
              changePropTo('product_id', 'id'),
            ),
          ),
        })(res.success)
      }
    })

export const addProductToOrder = (token, productId) =>
  fetch(ENDPOINTS.ADD_TO_OREDER(token, productId))
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        return R.evolve({
          goods: R.map(
            R.pipe(
              changePropTo('id', 'key'),
              changePropTo('product_id', 'id'),
            ),
          ),
        })(res.success)
      }
    })

export const removeProductFromOrder = (token, productId) => {
  return fetch(ENDPOINTS.REMOVE_FROM_ORDER(token, productId))
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        return R.evolve({
          goods: R.map(
            R.pipe(
              changePropTo('id', 'key'),
              changePropTo('product_id', 'id'),
            ),
          ),
        })(res.success)
      }
    })
}

export const clearOrder = token =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: {} })
    }, 1000)
  }).then(res => {
    if (res.success) {
      return res.success
    }
  })

export const buyOrder = token =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, 3000)
  })

export const getAvalivableTime = token => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(avalivableTime), 3000)
  }).then(res => {
    if (res.success) {
      return res.success.time
    }
  })
}
