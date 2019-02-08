import { connect } from 'react-redux'
import * as R from 'ramda'
import AboutScreeb from './AboutScreen'
import {
  getAppInfo,
  getIsLoadingAppInfo,
  getAppInfoRequest,
  navigateToHelpService,
} from '../../redux/modules/info'

const mapStateToProps = R.applySpec({
  info: getAppInfo,
  isLoading: getIsLoadingAppInfo,
  title: R.always('Версия 1.0.3'),
})

const mapDispatchToProps = {
  getInfo: getAppInfoRequest,
  navigateToHelpService,
}

export const AboutApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutScreeb)
