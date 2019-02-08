import * as R from 'ramda'
import { Linking } from 'react-native'

export const preloadersCreator = (request, success, failure) => ({
  [request]: R.T,
  [success]: R.F,
  [failure]: R.F,
})

export const payloadExtractor = R.pipe(
  R.nthArg(1),
  R.prop('payload'),
)

export const appendToState = R.useWith(
  (state, payload) => [...state, ...payload],
  [R.identity, R.prop('payload')],
)

export const uniqByObj = R.curry((objProp, list) => {
  const objPropElements = R.pipe(
    R.map(R.prop(objProp)),
    R.uniq,
  )(list)

  return R.map(x => R.find(element => element[objProp] === x, list))(
    objPropElements,
  )
})

export const changePropTo = R.curry((oldProp, newProp, obj) =>
  R.dissoc(oldProp, { ...obj, [newProp]: obj[oldProp] }),
)
export const createMailLink = (name, phone) =>
  `mailto:mobapp@e-bash.today?subject=Приложение%20CityRose&body=${encodeURIComponent(
    name.trim(),
  )},${phone}`

export const onPressCall = phone => {
  const url = 'tel:' + phone
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url).catch(() => null)
    }
  })
}
