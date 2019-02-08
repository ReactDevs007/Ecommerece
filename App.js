

import React from 'react'
 import { StatusBar } from 'react-native'
 import { createStore, applyMiddleware, compose } from 'redux'
 import sagaMiddleware from 'redux-saga'
 import { Provider } from 'react-redux'
 import thunk from 'redux-thunk'
 import rootReducer from './src/redux/modules/reducer'
 import AppNavigator from './src/navigators'
 import NavigationService from './src/services/NavigationService'
 import rootSaga from './src/redux/modules/saga'

 require('es6-promise').polyfill()
 require('fetch-everywhere')

 const saga = sagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(saga, thunk)),
)

saga.run(rootSaga)

const App = () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <Provider store={store} key="provider">
      <AppNavigator ref={NavigationService.setNavigator} />
    </Provider>
  </React.Fragment>
)

export default App



// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class App extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Hello world!</Text>
//       </View>
//     );
//   }
// }
