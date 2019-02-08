import * as R from 'ramda'

const getCatalog = R.prop('catalog')

export const getLoadedCatalog = R.pipe(
  getCatalog,
  R.prop('catalog'),
)

export const getIsLoadingCatalog = R.pipe(
  getCatalog,
  R.prop('isLoadingCatalog'),
)

export const getIsLoadingProducts = R.pipe(
  getCatalog,
  R.prop('isLoadingProducts'),
)

export const getLoadedProducts = R.pipe(
  getCatalog,
  R.prop('products'),
)

export const getSelectedProduct = R.pipe(
  getCatalog,
  R.prop('selectedProduct'),
)

export const getIsLoadingProduct = R.pipe(
  getCatalog,
  R.prop('isLoadingProduct'),
)

export const getFilters = R.pipe(
  getCatalog,
  R.prop('filters'),
)

export const productsLength = R.pipe(
  getCatalog,
  R.prop('productsTotal'),
)

export const canLoadNext = R.converge((loaded, all) => loaded.length < all, [
  getLoadedProducts,
  productsLength,
])

export const getSelectedFilters = R.pipe(
  getCatalog,
  R.prop('selectedFilters'),
)
