import * as R from 'ramda'

const getOrder = R.prop('order')

export const getIsGettingOrder = R.pipe(
  getOrder,
  R.prop('isGettingOrder'),
)

export const getUserOrder = R.pipe(
  getOrder,
  R.prop('userOrder'),
  order => {
    if (R.isEmpty(order)) {
      return {}
    }

    const { goods, totalPrice } = order

    ordersCount = R.length(goods)

    return { ...order, totalPrice, ordersCount }
  },
)

export const getIsSendAction = R.converge((x, y, z) => x || y || z, [
  R.pipe(
    getOrder,
    R.prop('isSendActionDelete'),
  ),
  R.pipe(
    getOrder,
    R.prop('isSendActionAdd'),
  ),
  R.pipe(
    getOrder,
    R.prop('isSendActionClear'),
  ),
])

export const getUserOrderCount = R.pipe(
  getUserOrder,
  R.prop('goods'),
  R.length,
)
