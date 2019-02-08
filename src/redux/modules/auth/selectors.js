 import * as R from 'ramda'

 const getAuthModule = R.prop('auth')

export const getSmsData = R.pipe(
  getAuthModule,
  R.prop('smsData'),
)

export const getVisibleCode = R.pipe(
  getAuthModule,
  R.prop('visibleCode'),
)

export const getUserInfo = R.pipe(
  getAuthModule,
  R.prop('user'),
)

export const getIsLoadingPin = R.pipe(
  getAuthModule,
  R.prop('isLoadingPin'),
)

export const getIsLoadingLogin = R.pipe(
  getAuthModule,
  R.prop('isLoadingLogin'),
)

export const getIsUpdatingUser = R.pipe(
  getAuthModule,
  R.prop('isUpdatingUser'),
)

export const getSavingTrigger = R.pipe(
  getAuthModule,
  R.prop('savingTrigger'),
)
