import ENDPOINTS from '../../../api'

export const getCompanyInfo = accessToken =>
  fetch(ENDPOINTS.GET_ABOUT_COMPANY(accessToken))
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

export const getAppInfo = accessToken =>
  fetch(ENDPOINTS.GET_ABOUT_PROGRAM(accessToken))
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
