import * as R from 'ramda'

const getShops = R.prop('shops')

export const getShopsOnMap = R.pipe(
  getShops,
  R.prop('shopsOnMap'),
)

export const getIsLoading = R.pipe(
  getShops,
  R.prop('isLoading'),
)
