import * as R from 'ramda'
import ENDPOINTS from '../../../api'
import {
  catalog,
  productsForCatalog,
  filters,
  product,
  filteredProducts,
} from '../../../mocks'

export const getCatalog = access =>
  fetch(ENDPOINTS.GET_CATALOG(access))
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
    })

export const getCatalogProducts = href =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(productsForCatalog)
    }, 100)
  }).then(data => {
    if (data.success) {
      return data.success
    }
  })

export const getProduct = (id, access) =>
  fetch(ENDPOINTS.GET_PRODUCT(id, access))
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.json()
      }
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
    })

export const getFilters = accessToken =>
  fetch(ENDPOINTS.GET_FILTERS(accessToken))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        return data.success.filters
      }
    })

export const getFilteredProducts = (accessToken, filters, page) => {
  console.log(ENDPOINTS.GET_PRODUCTS(accessToken, filters, page))
  return fetch(ENDPOINTS.GET_PRODUCTS(accessToken, filters, page))
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.json()
      }
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
    })
}
