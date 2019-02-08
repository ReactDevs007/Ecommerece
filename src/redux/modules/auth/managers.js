import * as R from 'ramda'
import ENDPOINTS from '../../../api'
import { userInfo } from '../../../mocks'

export const getPin = phone =>
  fetch(ENDPOINTS.GET_PIN(phone))
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

export const loginUser = loginLink =>
  fetch(loginLink)
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
    .then(R.prop('token'))

export const getUserInfo = token =>
  fetch(ENDPOINTS.USER_INFO(token), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
      }
      throw new Error('Ошибка получения информации')
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
      throw new Error('Ошибка получения данных')
    })

export const updateUserInfo = (token, data) =>
  fetch(ENDPOINTS.UPDATE_USER(token, data), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
      }
      throw new Error('Ошибка получения информации')
    })
    .then(data => {
      if (data.success) {
        return data.success
      }
      throw new Error('Ошибка получения данных')
    })
    .then(R.prop('response'))
