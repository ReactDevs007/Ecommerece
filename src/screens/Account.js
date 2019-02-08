/* eslint-disable quotes */
import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Alert, Dimensions, Modal } from 'react-native'
import MainButton from '../components/MainButton'
import GenderSelect from '../components/GenderSelect'
import Checkbox from '../components/Checkbox'
import { cleanPhone } from '../Utils'
import {
  logout,
  updateUserInfoRequest,
  getIsUpdatingUser,
  getSavingTrigger,
  saveTriggerAlert,
} from '../redux/modules/auth'
import { reduxForm, Field } from 'redux-form'
import { getUserInfo } from '../redux/modules/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StyledInput from '../components/StyledInput'
import DateInput from '../components/DateInput'
import { NAVIGATORS } from '../constants'

const requiredPredicate = value =>
  R.pipe(
    R.isEmpty,
    R.not,
  )(value) &&
  R.pipe(
    R.isNil,
    R.not,
  )(value)

export const required = value =>
  requiredPredicate(value) ? undefined : 'Это поле обязательно'

const phonePredicate = value => requiredPredicate(value) && value.length === 18

export const phone = value =>
  phonePredicate(value) ? undefined : 'Номер неверной длины'

const MainContainer = styled(KeyboardAwareScrollView).attrs({
  extraScrollHeight: 60,
  enableOnAndroid: true,
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  flex: 1;
  background-color: #fff;

  padding-left: 37px;
  padding-right: 38px;
`

const SaveButton = styled(MainButton)`
  margin-top: 20px;
  align-self: center;
`

const LogoutButton = styled(MainButton)`
  margin-top: 10px;
  align-self: center;

  width: 220px;
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

const ModalContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  background: rgba(0, 0, 0, 0.6);
`

const CheckNumberContainer = styled.View`
  align-self: center;
  align-items: center;

  margin-top: 154px;

  width: 327px;
  height: 212px;
  z-index: 1;

  background: #ffffff;
`

class Account extends React.Component {
  static navigationOptions = {
    title: 'Личный кабинет',
  }

  render() {
    const { handleSubmit, updateUserInfoRequest, isUpdating } = this.props
    return (
      <React.Fragment>
        <MainContainer>
          <Field
            editable={!isUpdating}
            name="lastName"
            component={this._renderInput}
            label={'Фамилия'}
            validate={[required]}
            firstInput
          />
          <Field
            editable={!isUpdating}
            name="name"
            validate={[required]}
            component={this._renderInput}
            label={'Имя'}
          />
          <Field
            editable={!isUpdating}
            name="sureName"
            component={this._renderInput}
            label={'Отчество'}
          />
          <Field
            name="gender"
            disabled={isUpdating}
            component={this._renderGender}
          />
          <Field
            name="birthday"
            disabled={isUpdating}
            component={this._renderDate}
          />
          <Field
            disabled={isUpdating}
            name="agreement"
            component={this._renderCheckbox}
            label={'Обработка персональных данных'}
          />
          <Field
            name="phone"
            editable={false}
            validate={[phone]}
            type="phone"
            component={this._renderInput}
            style={{ marginTop: 20 }}
            title={'Ваш номер телефона'}
            options={{ mask: '+7 (999) 999-99-99' }}
            keyboardType="phone-pad"
            type="phone"
          />
          <SaveButton
            text="Сохранить"
            backgroundColor={'#01b1ec'}
            isLoading={isUpdating}
            disabledBackgroundColor={'#BDCFD5'}
            onPress={handleSubmit(updateUserInfoRequest)}
          />
          <LogoutButton
            onPress={this._onLogoutPress}
            text="Выйти из учётной записи"
            backgroundColor={'#01b1ec'}
            disabledBackgroundColor={'#BDCFD5'}
          />
        </MainContainer>
        <Modal visible={this.props.modal} transparent={true}>
          <ModalContainer>
            <CheckNumberContainer>
              <TitlteText style={{ marginTop: 37 }}>
                Изменения успешно сохранены
              </TitlteText>
              <MainButton
                onPress={() => {
                  this.props.saveTriggerAlert(false)
                  this.props.navigation.navigate(NAVIGATORS.MAIN.CATALOG)
                }}
                text="Продолжить"
                style={{ marginTop: 15 }}
                backgroundColor={'#01b1ec'}
                disabledBackgroundColor={'#BDCFD5'}
              />
            </CheckNumberContainer>
          </ModalContainer>
        </Modal>
      </React.Fragment>
    )
  }

  _onLogoutPress = () => {
    const { logout } = this.props
    Alert.alert('Подтверждение', 'Вы уверены?', [
      { onPress: logout, text: 'Да', style: 'destructive' },
      { text: ' Нет' },
    ])
  }

  _renderInput = ({
    label,
    input: { onChange, value },
    meta: { touched, error },
    firstInput,
    type,
    ...rest
  }) => (
    <StyledInput
      style={{ marginTop: firstInput ? 25 : 10 }}
      onChangeText={
        type === 'phone'
          ? R.pipe(
              cleanPhone,
              onChange,
            )
          : onChange
      }
      focused={touched}
      value={value}
      title={label}
      error={touched && error}
      {...rest}
    />
  )

  _renderGender = ({ input: { value, onChange }, ...rest }) => (
    <GenderSelect active={value} onPress={onChange} {...rest} />
  )

  _renderDate = ({ input, ...rest }) => (
    <DateInput
      label="Дата рождения"
      {...input}
      style={{ marginTop: 20 }}
      {...rest}
    />
  )

  _renderCheckbox = ({ input, label, ...rest }) => (
    <Checkbox {...input} label={label} style={{ marginTop: 15 }} {...rest} />
  )
}

const mapStateToProps = R.applySpec({
  isUpdating: getIsUpdatingUser,
  modal: getSavingTrigger,
  initialValues: getUserInfo,
})

const mapDispatchToProps = {
  logout,
  updateUserInfoRequest,
  saveTriggerAlert,
}

export default R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({ form: 'editAccaunt', initialValues: {} }),
)(Account)
