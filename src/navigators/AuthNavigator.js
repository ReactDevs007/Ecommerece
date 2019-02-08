import { createStackNavigator } from 'react-navigation'
import { NAVIGATORS } from '../constants'
import Authorization from '../screens/Authorization'

const AuthNavigator = createStackNavigator(
  {
    [NAVIGATORS.AUTH.LOGIN]: {
      screen: Authorization,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#01B1EC',
      },
      headerTitleStyle: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 20,
      },
    },
  },
)

export default AuthNavigator
