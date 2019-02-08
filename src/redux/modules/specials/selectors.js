import * as R from 'ramda'

const getSpecials = R.prop('specials')

export const getSpecialsData = R.pipe(
  getSpecials,
  R.prop('specials'),
)

export const getSpecialsLoading = R.pipe(
  getSpecials,
  R.prop('isLoading'),
)
