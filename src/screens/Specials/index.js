import { connect } from 'react-redux'
import * as R from 'ramda'
import Specials from './Specials'
import {
  getSpecialsRequest,
  getSpecialsData,
  getSpecialsLoading,
} from '../../redux/modules/specials'

const mapStateToProps = R.applySpec({
  specials: getSpecialsData,
  isLoading: getSpecialsLoading,
})

const mapDispatchTopProps = {
  getSpecialsRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchTopProps,
)(Specials)
