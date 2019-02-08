import * as React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { NAVIGATORS } from '../constants'

import Specials from '../screens/Specials'
import Account from '../screens/Account'
import Bonuses from '../screens/Bonuses'
import Main from '../screens/Main'
import WriteOffBonuses from '../screens/WriteOffBonuses'
import AboutCompany from '../screens/AboutScreen'
import Catalog from '../screens/Catalog'
import Product from '../screens/Product'
import ShopingCart from '../screens/ShopingCart'
import Filter from '../screens/Filter'
import Order from '../screens/Order'
import FilteredProductsList from '../screens/FilteredProductsList'

import MenuButton from '../components/MenuButton'
import MenuComponent from '../components/Menu'
import { AboutApp } from '../screens/AboutScreen/AboutApp'
import BackButton from '../components/BackButton'
import Payment from '../screens/Payment'
import Map from '../screens/Map'

const headerStyle = {
  backgroundColor: '#01B1EC',
}

const headerTitleStyle = {
  color: 'white',
  flex: 1,
  fontSize: 16,
  alignSelf: 'center',
  textAlign: 'center',
  fontFamily: 'Montserrat-Medium',
}

const getNavOptions = title => ({
  navigationOptions: ({ navigation }) => {
    const innerRoutes = navigation.state.routes
    const routeIndex = navigation.state.index
    let routeTitle = title
    try {
      const classRoute = routeList[innerRoutes[routeIndex].key]
      routeTitle = classRoute.navigationOptions.title
    } catch (err) {
      // alert
    }
    return {
      title: routeTitle,
      headerStyle,
      headerTitleStyle,
      headerLeft: <Text style={{ paddingLeft: 12 }}>Logo</Text>,
      headerRight: <MenuButton openDrawer={navigation.openDrawer} />,
      gesturesEnabled: false,
    }
  },
})

const MainNavigatorStack = createStackNavigator(
  {
    [NAVIGATORS.MAIN.MAIN]: { screen: Main },
    [NAVIGATORS.MAIN.PRODUCT]: {
      screen: Product,
      navigationOptions: {
        title: null,
      },
    },
    [NAVIGATORS.MAIN.CATALOG]: {
      screen: Catalog,
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(NAVIGATORS.MAIN.FILTER)}
                hitSlop={{ top: 2, bottom: 2, left: 5, right: 5 }}
              >
                <Image
                  style={{
                    width: 14,
                    height: 16,
                    marginRight: 23,
                    marginTop: 4,
                  }}
                  source={require('../../assets/img/filterBtn.png')}
                />
              </TouchableOpacity>
              <MenuButton openDrawer={navigation.openDrawer} />
            </View>
          ),
        }
      },
    },
    [NAVIGATORS.MAIN.FILTER]: {
      screen: Filter,
      navigationOptions: {
        headerLeft: <BackButton />,
        title: 'Фильтр',
      },
    },
    [NAVIGATORS.MAIN.WRITE_BONUSES]: { screen: WriteOffBonuses },
    [NAVIGATORS.MAIN.SPECIALS]: { screen: Specials },
    [NAVIGATORS.MAIN.BONUSES]: { screen: Bonuses },
    [NAVIGATORS.MAIN.ACCOUNT]: { screen: Account },
    [NAVIGATORS.MAIN.ABOUT_COMPANY]: {
      screen: AboutCompany,
      navigationOptions: {
        title: 'О компании',
      },
    },
    [NAVIGATORS.MAIN.ABOUT_APP]: {
      screen: AboutApp,
      navigationOptions: {
        title: 'О программе',
      },
    },
    [NAVIGATORS.MAIN.SHOPING_CART]: {
      screen: ShopingCart,
    },
    [NAVIGATORS.MAIN.ORDER]: {
      screen: Order,
      navigationOptions: {
        title: 'Оформление',
        headerTitleStyle: {
          fontFamily: 'Montserrat',
          fontSize: 16,
          color: '#fff',
          fontWeight: 'normal',
        },
      },
    },
    [NAVIGATORS.MAIN.FILTERED_PRODUCTS_LIST]: {
      screen: FilteredProductsList,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Cartegoryaa: Каталог',
          headerRight: (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(NAVIGATORS.MAIN.FILTER)}
              >
                <Image
                  style={{
                    width: 14,
                    height: 16,
                    marginRight: 23,
                    marginTop: 4,
                  }}
                  source={require('../../assets/img/filterBtn.png')}
                />
              </TouchableOpacity>
              <MenuButton openDrawer={navigation.openDrawer} />
            </View>
          ),
        }
      },
    },
    [NAVIGATORS.MAIN.PAYMENT]: {
      screen: Payment,
      navigationOptions: {
        title: 'Оплата',
        headerTitleStyle: {
          fontFamily: 'Montserrat',
          fontSize: 16,
          color: '#fff',
          fontWeight: 'normal',
        },
      },
    },
    [NAVIGATORS.MAIN.MAP]: {
      screen: Map,
    },
  },
  {
    initialRouteName: NAVIGATORS.MAIN.CATALOG,
    ...getNavOptions('Главная'),
  },
)

const MainNavigatorDrawer = createDrawerNavigator(
  {
    [NAVIGATORS.MAIN.INIT]: MainNavigatorStack,
  },
  {
    drawerPosition: 'left',
    contentComponent: MenuComponent,
    initialRouteName: NAVIGATORS.MAIN.INIT,
  },
)

export default MainNavigatorDrawer
