/* eslint-disable quotes */
import React from 'react'
import { Image, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Qrcode from 'react-native-qrcode'
import PageLayout from '../components/PageLayout'
import NfcImage from '../../assets/img/nfc-active.png'
import Separator from '../components/Separator'
import EmptyButton from '../components/EmptyButton'
import { NAVIGATORS } from '../constants'
// import NFC from '../containers/NFC';

class WriteOffBonuses extends React.Component {
  static navigationOptions = {
    title: 'Write off bonuses Списание бонусов',
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  onBonusesClick = () => {
    const { navigation } = this.props
    navigation.navigate(NAVIGATORS.MAIN.BONUSES)
  }

  render() {
    const {
      auth: { user },
    } = this.props
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
           Attach the phone to the reader Приложите телефон к считывателю
          </Text>
          <Image
            source={NfcImage}
            style={{
              marginTop: 20,
            }}
          />
        </View>
        <Separator>or или</Separator>
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
           Show the code to the cashier Покажите код кассиру
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
            <Qrcode
              size={160}
              value={user.phone && user.phone.replace(/\D/g, '')}
            />
          </View>
          <EmptyButton
            keyField="get-more"
            active
            customStyles={{
              marginTop: 20,
              marginBottom: 50,
            }}
            onPress={this.onBonusesClick}
            title="My bonuses Мои бонусы"
          />
        </View>
      </PageLayout>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

export default connect(mapStateToProps)(WriteOffBonuses)
