/* eslint-disable quotes */
import React from 'react'
import * as R from 'ramda'
import { Image, View, Text, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Qrcode from 'react-native-qrcode'
import PageLayout from '../components/PageLayout'
import NfcImage from '../../assets/img/nfc-active.png'
import Separator from '../components/Separator'
import EmptyButton from '../components/EmptyButton'
import { getUserInfo } from '../redux/modules/auth'

import { NAVIGATORS } from '../constants'

class Main extends React.Component {
  static navigationOptions = {
    title: 'Зачисление бонусов',
  }

  onBonusesClick = () => {
    const { navigation } = this.props
    navigation.navigate(NAVIGATORS.MAIN.BONUSES)
  }

  render() {
    const { user = { phone: null } } = this.props
    return (
      <PageLayout scrolled>
        {/* <NFC /> */}
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}
          >
            Приложите телефон к считывателю
          </Text>
          <Image
            source={NfcImage}
            style={{
              marginTop: 20,
            }}
          />
        </View>
        <Separator>или</Separator>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 20,
              fontFamily: 'Montserrat-Medium',
            }}
          >
            Покажите код кассиру
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: 200,
              padding: 20,
              borderColor: '#EBEBEB',
              height: 200,
            }}
          >
            {user && user.phone && (
              <Qrcode
                size={160}
                value={user.phone && user.phone.replace(/\D/g, '')}
              />
            )}
          </View>
          <EmptyButton
            keyField="get-more"
            active
            customStyles={{
              marginTop: 20,
              marginBottom: 50,
            }}
            onPress={this.onBonusesClick}
            title="Мои бонусы"
          />
        </View>
      </PageLayout>
    )
  }
}

const mapStateToProps = R.applySpec({
  user: getUserInfo,
})

export default connect(mapStateToProps)(Main)
