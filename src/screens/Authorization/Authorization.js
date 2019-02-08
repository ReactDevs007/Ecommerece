import React from 'react'
import { Modal, TextInput, Dimensions } from 'react-native'
import * as R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Separator from '../../components/Separator'
import StyledInput from '../../components/StyledInput'
import MainButton from '../../components/MainButton'
import {
  loginRequest,
  getPinRequest,
  getVisibleCode,
  getIsLoadingLogin,
  getIsLoadingPin,
} from '../../redux/modules/auth'
import { cleanPhone } from '../../Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SEND_TIMEOUT = 60

const Container = styled(KeyboardAwareScrollView).attrs({
  extraScrollHeight: 60,
  enableOnAndroid: true,
})`
  flex: 1;
  background-color: #fff;

  padding-left: 37px;
  padding-right: 38px;
`

const TitlteText = styled.Text`
  align-self: center;

  max-width: 216px;
  margin-top: 40px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  font-size: 16px;
  text-align: center;

  color: #000000;
`

const NewSmsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 14px;
`

const SmsWrapper = styled.View`
  align-self: center;
`

const SmsHelpText = styled.Text`
  font-family: Montserrat;
  font-size: 11px;

  color: #000000;
`

const ModalContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  background: rgba(0, 0, 0, 0.6);
`

const CheckNumberContainer = styled.View`
  align-self: center;
  align-items: center;

  padding: 0 20px;

  margin-top: 154px;

  width: 327px;
  height: 212px;
  z-index: 1;

  background: #ffffff;
`

class Authorization extends React.Component {
  constructor() {
    super()

    this.state = {
      phone: '+7 (',
      code: '',
      timeToNewCode: SEND_TIMEOUT,
      showModal: false,
    }
  }

  static navigationOptions = {
    title: 'Регистрация в системе',
  }

  componentDidUpdate() {
    if (this.state.timeToNewCode === 0) {
      clearInterval(this._interval)
    }
  }

  componentWillUnmount() {
    if (this._interval) {
      clearInterval(this._interval)
    }
  }

  render() {
    const { phone, code, timeToNewCode, showModal } = this.state
    const { visibleCodeField, isGettingPin, isLogin } = this.props
    return (
      <React.Fragment>
        <Container>
          <TitlteText>
            {!visibleCodeField
              ? 'Мы пришлём вам код подтверждения'
              : 'Мы отправили вам код подтверждения'}
          </TitlteText>
          <StyledInput
            type="phone"
            keyboardType="phone-pad"
            onChangeText={this._onChangePhone}
            value={phone}
            editable={!visibleCodeField}
            style={{ alignSelf: 'center' }}
            title={'Ваш номер телефона'}
            options={{ mask: '+7 (999) 999-99-99' }}
          />
          {!visibleCodeField && (
            <MainButton
              onPress={this._getPin}
              text="Продолжить"
              style={{ alignSelf: 'center', marginTop: 30 }}
              disabled={phone.length !== 18}
              isLoading={isGettingPin}
              backgroundColor={'#01b1ec'}
              disabledBackgroundColor={'#BDCFD5'}
            />
          )}
          {visibleCodeField && (
            <React.Fragment>
              <Separator />
              <TitlteText>Введите полученный код</TitlteText>
              <StyledInput
                keyboardType="phone-pad"
                style={{ alignSelf: 'center' }}
                title={'Код из смс-сообщения'}
                onChangeText={this._onChangePin}
                options={{ mask: '999999' }}
                value={code}
              />
              <NewSmsContainer>
                <SmsWrapper>
                  <SmsHelpText>Не получили смс?</SmsHelpText>
                  <SmsHelpText style={{ fontWeight: 'bold' }}>
                    Выслать через: {timeToNewCode}
                  </SmsHelpText>
                </SmsWrapper>
                <MainButton
                  style={{ width: 130, height: 40 }}
                  onPress={this._openModal}
                  textColor={'#01b1ec'}
                  disabledTextColor={'#BDCFD5'}
                  text="Отправить ещё"
                  disabled={timeToNewCode !== 0}
                />
              </NewSmsContainer>
              <MainButton
                onPress={this._loginRequest}
                text="Подтвердить"
                style={{ alignSelf: 'center', marginTop: 24 }}
                disabled={code.length < 4}
                isLoading={isLogin}
                backgroundColor={'#01b1ec'}
                disabledBackgroundColor={'#BDCFD5'}
              />
            </React.Fragment>
          )}
        </Container>
        <Modal onRequestClose={() => {}} visible={showModal} transparent={true}>
          <ModalContainer>
            <CheckNumberContainer>
              <TitlteText style={{ marginTop: 38 }}>
                Проверьте правильность
              </TitlteText>
              <StyledInput
                type="phone"
                keyboardType="phone-pad"
                onChangeText={this._onChangePhone}
                value={phone}
                editable={!visibleCodeField}
                options={{ mask: '+7 (999) 999-99-99' }}
              />
              <MainButton
                onPress={this._checkPhone}
                text="Продолжить"
                style={{ marginTop: 20 }}
                disabled={phone.length !== 18}
                backgroundColor={'#01b1ec'}
                disabledBackgroundColor={'#BDCFD5'}
              />
            </CheckNumberContainer>
          </ModalContainer>
        </Modal>
      </React.Fragment>
    )
  }

  _checkPhone = () => {
    this._onModalClose()
    this._getPin()
  }

  _onModalClose = () => {
    this.setState({ showModal: false })
  }

  _openModal = () => {
    this.setState({ showModal: true })
  }

  _onChangePhone = text => {
    this.setState({ phone: cleanPhone(text) })
  }

  _onChangePin = text => {
    this.setState({ code: text })
  }

  _getPin = () => {
    const { phone } = this.state
    const { getPinRequest } = this.props

    const normilisePhone = R.pipe(
      R.reject(
        x => x === ' ' || x === '+' || x === '(' || x === ')' || x === '-',
      ),
      R.join(''),
    )(phone)

    phone.length === 18 && getPinRequest(normilisePhone)

    this.setState(
      { timeToNewCode: SEND_TIMEOUT },
      () => (this._interval = setInterval(this._updateTime, 1000)),
    )
  }

  _updateTime = () => {
    const { timeToNewCode } = this.state
    this.setState({ timeToNewCode: timeToNewCode - 1 })
  }

  _loginRequest = () => {
    const { loginRequest } = this.props
    const { code } = this.state

    code.length >= 4 && loginRequest(code)
  }
}

const mapStateToProps = R.applySpec({
  visibleCodeField: getVisibleCode,
  isGettingPin: getIsLoadingPin,
  isLogin: getIsLoadingLogin,
})

const mapDispatchToProps = {
  loginRequest,
  getPinRequest,
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authorization)

export default connected
