import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer } from 'redux-form'

import auth from './auth'
 import specials from './specials'
 import { bonuses } from './bonuses'
import info from './info'
import catalog from './catalog'
import order from './order'
import shops from './shops'

export default combineReducers({
  routing: routerReducer,
  auth,
  specials,
  bonuses,
  catalog,
  info,
  form: reducer,
  order,
  shops,
})
