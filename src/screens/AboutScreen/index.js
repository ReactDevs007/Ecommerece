import { connect } from 'react-redux'
import * as R from 'ramda'
import AboutScreen from './AboutScreen'
import {
  getCompanyInfo,
  getIsLoadingCompanyInfo,
  getCompanyInfoRequest,
} from '../../redux/modules/info'

const mapStateToProps = R.applySpec({
  info: getCompanyInfo,
  isLoading: getIsLoadingCompanyInfo,
  isCompany: R.always(true),
})

const mapDispatchToProps = {
  getInfo: getCompanyInfoRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutScreen)
