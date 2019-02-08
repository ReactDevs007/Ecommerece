import ENDPOINTS from '../../../api'

export const getSpecials = (token, width) => {
  return fetch(ENDPOINTS.SPECIALS(token, width))
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
}
