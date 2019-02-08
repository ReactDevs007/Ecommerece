import * as R from 'ramda'

const getInfoModule = R.prop('info')

export const getIsLoadingCompanyInfo = R.pipe(
  getInfoModule,
  R.prop('isLoadingCompanyInfo'),
)

export const getIsLoadingAppInfo = R.pipe(
  getInfoModule,
  R.prop('isLoadingAppInfo'),
)

export const getCompanyInfo = R.pipe(
  getInfoModule,
  R.prop('companyInfo'),
)

export const getAppInfo = R.pipe(
  getInfoModule,
  R.prop('appInfo'),
)
