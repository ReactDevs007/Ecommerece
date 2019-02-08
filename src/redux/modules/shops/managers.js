import { shops } from '../../../mocks'
import * as R from 'ramda'
import ENDPOINTS from '../../../api'
import { changePropTo } from '../../../helpers'

// export const getShopsOnMap = () =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(shops), 3000)
//   }).then(data => {
//     if (data.success) {
//       return data.success.shops
//     }
//   })

export const getShopsOnMap = accessToken =>
  fetch(ENDPOINTS.GET_SHOPS_ON_MAP(accessToken))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        return data.success
      }
    })
    .then(R.values)
    .then(R.map(changePropTo('name', 'title')))
    .then(data => data.map((x, i) => ({ ...x, id: i.toString() })))
