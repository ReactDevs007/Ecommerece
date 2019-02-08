import { NavigationActions, StackActions } from 'react-navigation'

let navigator

const setNavigator = nav => (navigator = nav)

const navigate = (routeName, params) =>
  navigator.dispatch(NavigationActions.navigate({ routeName, params }))

const goBack = () => navigator.dispatch(NavigationActions.back())

const clearStack = () =>
  navigator.dispatch(
    StackActions.reset({
      index: 0,
    }),
  )

const NavigationService = {
  setNavigator,
  navigate,
  goBack,
  clearStack,
}

export default NavigationService
