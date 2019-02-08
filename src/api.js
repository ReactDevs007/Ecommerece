import * as R from 'ramda'

const BASE_URI = 'http://test.flowwill.ru/mob_app'

const METHODS = {
  PIN: 'pin',
  LOGIN: 'login',
  GET_INFO: 'info',
  GET_COMPANY: 'getCompany',
  GET_ABOUT_PROGRAM: 'about',
  GET_ABOUT_COMPANY: 'company',
  GET_BONUSES: 'bonuses',
  SAVE_CUSTOMER: 'saveCustomer',
  UPDATE: 'update',
  SPECIALS: 'promo',
}

const updateGenerator = ({
  name,
  lastName,
  phone,
  agreement,
  gender,
  birthday,
  sureName,
}) =>
  `name=${name}&lastName=${lastName || ''}&${phone ||
    ''}&agreement=${agreement || 0}&gender=${gender ||
    ''}&birthday=${birthday || ''}&sureName=${sureName || ''}`

const generateFilters = filters => {
  return filters.length ? `${R.join(';', filters)}` : ''
}

export default {
  GET_PIN: phoneNumber =>
    `${BASE_URI}?action=${METHODS.PIN}&phone=${phoneNumber}&test=1`,
  LOGIN: (pin, pinToken) =>
    `${BASE_URI}?action=${METHODS.LOGIN}&pin=${pin}&token=${pinToken}&test=1`,
  USER_INFO: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=info&token=${accessToken}`,
  SPECIALS: (accessToken, width) =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=promo&token=${accessToken}&screen_width=${width}`,
  GET_ABOUT_COMPANY: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=company&token=${accessToken}`,
  GET_ABOUT_PROGRAM: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=about&token=${accessToken}`,
  UPDATE_USER: (accessToken, data) =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=update&token=${accessToken}&${updateGenerator(
      data,
    )}`,
  GET_CATALOG: token =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=catalog&token=${token}`,
  GET_PRODUCT: (id, token) =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=product&token=${token}&product_id=${id}`,
  GET_BONUSES: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=bonuses&token=${accessToken}`,
  GET_FILTERS: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=get_filter&token=${accessToken}`,
  GET_PRODUCTS: (accessToken, filters, page) =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=products&token=${accessToken}&path=10&page=${page}&filter_ocfilter=${generateFilters(
      filters || [],
    )}`,
  GET_ORDER: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=cart&token=${accessToken}`,
  ADD_TO_OREDER: (accessToken, productId) =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=cart_add&token=${accessToken}&product[0][product_id]=${productId}&product[0][quantity]=1`,
  REMOVE_FROM_ORDER: (accessToken, key) => `
  http://test.flowwill.ru/index.php?route=api/mob_app&action=cart_remove&token=${accessToken}&key=${key}`,
  GET_SHOPS_ON_MAP: accessToken =>
    `http://test.flowwill.ru/index.php?route=api/mob_app&action=addresses&token=${accessToken}`,
}
