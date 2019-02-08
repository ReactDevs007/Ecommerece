import { createSwitchNavigator } from 'react-navigation'
import { NAVIGATORS } from '../constants'
import Welcome from '../screens/Welcome'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'

const AppNavigator = createSwitchNavigator({
  [NAVIGATORS.APP.CHECK_TOKENS]: Welcome,
  [NAVIGATORS.APP.AUTH]: AuthNavigator,
  [NAVIGATORS.APP.MAIN]: MainNavigator,
})

export default AppNavigator
