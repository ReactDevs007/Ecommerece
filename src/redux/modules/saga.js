import { call, all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { specialsSaga } from './specials'
import { infoSaga } from './info'
import { catalogSaga } from './catalog'
import { orderSaga } from './order'
import { bonusesSaga } from './bonuses'
import { shopsSaga } from './shops'

export default function*() {
  yield all([
    call(authSaga),
    call(infoSaga),
    call(catalogSaga),
    call(orderSaga),
    call(specialsSaga),
    call(infoSaga),
    call(bonusesSaga),
    call(shopsSaga),
  ])
}
