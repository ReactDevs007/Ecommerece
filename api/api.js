import fixtures from './fixture'
import { store } from '../App'
import { logout, setAuthError, setAuthStep } from '../src/redux/modules/auth'
// const fetchAPi = __DEV__ ? fetchMock : fetch;

const endpoints = require('./dev_endpoints')
// if (__DEV__) {
// endpoints = require('./dev_endpoints');
// } else {
// endpoints = require('./endpoints');
// }

const headers = {
  'Content-Type': 'application/json',
}

const fetchMock = (...args) =>
  new Promise(resolve => {
    setTimeout(() => resolve(fixtures[args[0]]), 500)
  })

// const fetchAPi = __DEV__ ? fetchMock : fetch;
const fetchAPi = fetch

const handleError = error => {}

const handleResponse = (res, resourceType = null) => {
  store.dispatch(setAuthError(null))

  if (!res.ok) {
    store.dispatch(
      setAuthError({
        [resourceType]: 'Ошибка на сервере',
      }),
    )
    return false
  }
  try {
    return res.json().then(data => {
      if (data && data.success) {
        if (resourceType === 'authorize') {
          store.dispatch(setAuthStep('code'))
        }
        return data.success
      } else {
        if (
          (data.error.code || data.error.error).toString().indexOf(401) > -1
        ) {
          store.dispatch(logout())
        }
        if (resourceType && data.error) {
          store.dispatch(
            setAuthError({
              [resourceType]: data.error.message,
            }),
          )
        }
      }
    })
  } catch (e) {
    //
  }
}

export const authorize = phone =>
  fetchAPi(`${endpoints.userAuthorize}&phone=${phone}`, {
    headers,
    method: 'GET',
  })
    .then(data => handleResponse(data, 'authorize'))
    .catch(handleError)

export const login = ({ token, code }) =>
  fetchAPi(`${endpoints.loginWithPin}&token=${token}&pin=${code}`, {
    headers,
    method: 'POST',
  })
    .then(data => handleResponse(data, 'login'))
    .catch(handleError)

export const getUserData = ({ token }) =>
  fetchAPi(`${endpoints.getUserInfo}&token=${token}`, {
    headers,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)

export const updateUserData = (payload, { token }) => {
  let queryPost = ''
  Object.keys(payload).forEach(k => {
    queryPost = queryPost.concat(`&${k}=${encodeURIComponent(payload[k])}`)
  })

  return fetchAPi(`${endpoints.userUpdate}&token=${token}${queryPost}`, {
    headers: {
      ...headers,
      Accept: 'application/json',
    },
    method: 'POST',
  })
    .then(handleResponse)
    .catch(handleError)
}

export const getAboutCompany = token =>
  fetchAPi(`${endpoints.getAboutCompany}&token=${token}`, {
    headers,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)

export const getAboutApp = token =>
  fetchAPi(`${endpoints.getAboutProgram}&token=${token}`, {
    headers,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)

export const getBonuses = token =>
  fetchAPi(`${endpoints.getBonuses}&token=${token}`, {
    headers,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)

export const fetchSpecials = (token, screenWidth) =>
  fetchAPi(`${endpoints.specials}&token=${token}&screen_width=${screenWidth}`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(x => {
      return x
    })
    .catch(handleError)
