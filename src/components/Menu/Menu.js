import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { MaleIcon, FeMaleIcon } from '../GenderSelect'
import styles from './styles'
import { getBonuses, getBonusesLoading } from '../../redux/modules/bonuses'
import { getUserInfo } from '../../redux/modules/auth'
import { NAVIGATORS } from '../../constants'

const MenuItem = ({ title, onPress, selected }) => (
  <TouchableOpacity onPress={onPress} style={{ margin: 15 }}>
    <Text
      style={{
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Montserrat-Regular',
        fontWeight: selected ? 'bold' : 'normal',
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

class Menu extends React.Component {
  constructor() {
    super()

    this.menuItems = [
      {
        title: 'Category',// Каталог',
        route: NAVIGATORS.MAIN.CATALOG,
      },
      {
        title: 'Bonus crediting',// Зачисление бонусов',
        route: NAVIGATORS.MAIN.MAIN,
      },
      {
        title: 'Write off bonuses',// Списание бонусов',
        route: NAVIGATORS.MAIN.WRITE_BONUSES,
      },
      {
        title: 'Promotions',// Акции',
        route: NAVIGATORS.MAIN.SPECIALS,
      },
      {
        title: 'My bonuses',// Мои бонусы',
        route: NAVIGATORS.MAIN.BONUSES,
      },
      {
        title: 'Personal Area',// Личный кабинет',
        route: NAVIGATORS.MAIN.ACCOUNT,
      },

      { title: 'About company О компании', route: NAVIGATORS.MAIN.ABOUT_COMPANY },
      { title: 'About the program О программе', route: NAVIGATORS.MAIN.ABOUT_APP },
      { title: 'Shops on the map Магазины на карте', route: NAVIGATORS.MAIN.MAP },
    ]

    this.state = {
      selectedIndex: 0,
    }
  }

  render() {
    const {
      navigation,
      user = { gender: null },
      bonuses,
      isLoadingBonuses,
      ...rest
    } = this.props
    const { selectedIndex } = this.state

    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: '0', horizontal: 'never' }}
        >
          <TouchableOpacity
            style={styles.user}
            onPress={() => {
              navigation.navigate(NAVIGATORS.MAIN.ACCOUNT)
              navigation.closeDrawer()
            }}
          >
            <View style={styles.userAvatar}>
              {user && user.gender === 'female' ? (
                <FeMaleIcon active />
              ) : (
                <MaleIcon active />
              )}
            </View>
            <View>
              <Text style={styles.userName}>
                {user &&
                  user.name &&
                  `${user.name} ${user.lastName ? user.lastName[0] + '.' : ''}`}
              </Text>
              <Text style={styles.userBonus}>
                {isLoadingBonuses ? 'Идет получение' : `${bonuses} баллов`}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {this.menuItems.map((item, i) => (
              <MenuItem
                selected={i === selectedIndex}
                key={item.route}
                title={item.title}
                onPress={() => {
                  navigation.navigate(item.route)
                  navigation.closeDrawer()
                  this.setState({ selectedIndex: i })
                }}
              />
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const mapStateToState = state => ({
  user: getUserInfo(state),
  bonuses: getBonuses(state),
  isLoadingBonuses: getBonusesLoading(state),
})

export default connect(mapStateToState)(Menu)
