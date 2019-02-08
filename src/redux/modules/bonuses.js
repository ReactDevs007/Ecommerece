import { getToken } from './auth'
import { handleActions } from 'redux-actions'
import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as R from 'ramda'
import { createAction } from 'redux-actions'
import { preloadersCreator, payloadExtractor } from '../../helpers'
import ENDPOINTS from '../../api'
import { bonuses as bonusesMock } from '../../mocks'

//Actions

const GET_BONUSES_REQUEST = 'app/bonuses/GET_BONUSES_REQUEST'
const GET_BONUSES_FAILURE = 'app/bonuses/GET_BONUSES_FAILURE'
const GET_BONUSES_SUCCESS = 'app/bonuses/GET_BONUSES_SUCCESS'

export const getBonusesRequest = createAction(GET_BONUSES_REQUEST)

const getBonusesSucces = createAction(GET_BONUSES_SUCCESS)

//reducers

const isBonusesLoading = handleActions(
  preloadersCreator(
    GET_BONUSES_REQUEST,
    GET_BONUSES_SUCCESS,
    GET_BONUSES_FAILURE,
  ),
  false,
)

const bonusesData = handleActions(
  {
    [GET_BONUSES_SUCCESS]: payloadExtractor,
    [GET_BONUSES_FAILURE]: R.always(null),
  },
  null,
)

export const bonuses = combineReducers({
  isBonusesLoading,
  bonusesData,
})

//Managers

const getBonusesManager = token =>
  fetch(ENDPOINTS.GET_BONUSES(token))
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
      }
      throw new Error('Ошибка получения данных')
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
      throw new Error('Ошибка получения данных')
    })

//Sagas

function* getBonusesSaga() {
  const token = yield call(getToken)
  const bonuses = yield call(getBonusesManager, token)
   const { bonus } = bonuses

   yield put(getBonusesSucces(bonus))
}

export const bonusesSaga = function*() {
  yield all([takeLatest(GET_BONUSES_REQUEST, getBonusesSaga)])
}

//selectors

export const getBonuses = R.path(['bonuses', 'bonusesData'])

export const getBonusesLoading = R.path(['bonuses', 'isBonusesLoading'])
