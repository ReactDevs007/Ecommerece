import * as React from 'react'
import * as R from 'ramda'
import { Dimensions, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import styled from 'styled-components/native'
import Checkbox from '../components/Checkbox'
import LocalCheckbox from '../components/LocalCheckbox'
import StyledInput from '../components/StyledInput'
import DateInput from '../components/DateInput'
import Picker from '../components/Picker'
import Radio from '../components/RadioField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cleanPhone } from '../Utils'
import { paymentRequest } from '../redux/modules/order/actions'
import { getUserOrder } from '../redux/modules/order/selectors'

const ScrollContainer = styled(KeyboardAwareScrollView).attrs({
  extraScrollHeight: 60,
  enableOnAndroid: true,
})`
  background-color: #fff;
`

const MainContainer = styled.View`
  flex: 1;
  padding: 30px 38px 0 37px;
`

const TitleReceive = styled.Text`
  flex: 1;
  font-family: Montserrat;
  font-weight: 500;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

const ReceiveUserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 31px;
`

const UserContainer = styled.View`
  width: 100%;
`

const UserExtraInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Separator = styled.View`
  margin-top: 30px;
  width: 100%;
  height: 1px;

  background-color: #eaeaea;
`

const InfoText = styled.Text`
  margin-top: 15px;
  font-family: Montserrat;
  font-size: 12px;
`

const BoldText = styled.Text`
  align-self: center;
  margin-top: 10px;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 16px;
`

const ButtonText = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #ffffff;
  margin: auto;
`

const Button = styled.TouchableOpacity`
  margin-top: 27px;
  margin-left: -37px;
  width: ${Dimensions.get('window').width};
  height: 48px;

  background-color: #01b1ec;
`

class Order extends React.Component {
  state = {
    text: true,
    selfTaken: false,
    extra: true,
    anon: false,
  }

  dottedLine = () => '.'.repeat(300)

  renderCompositionItem = ({ title, quantity }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'baseline',
        padding: 0,
      }}
    >
      <View>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>{title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: '#BDCFD5', fontSize: 12 }}>
          {this.dottedLine()}
        </Text>
      </View>
      <View>
        <Text
          style={{ fontFamily: 'Montserrat', fontSize: 12 }}
        >{`${quantity} ₽`}</Text>
      </View>
    </View>
  )

  render() {
    const price = this.props.userOrder.totalPrice
    const totalPrice = this._renderPrice()

    return (
      <ScrollContainer>
        <MainContainer>
          {this._localCheckbox({
            label: 'Написать текст открытки (это бесплатно)',
            name: 'text',
          })}
          {this.state.text && (
            <React.Fragment>
              <Field name="comment" component={this._comment} />
              {this._receiver({
                leftTitle: 'Получатель',
                label: 'Я сам заберу заказ',
                name: 'selfTaken',
              })}
              {!this.state.selfTaken && (
                <UserContainer>
                  <Field
                    name="name"
                    component={this._renderInput}
                    title="Имя"
                  />
                  <Field
                    name="phone"
                    component={this._renderInput}
                    title="Телефон"
                    type="phone"
                    title={'Ваш номер телефона'}
                    options={{ mask: '+7 (999) 999-99-99' }}
                    keyboardType="phone-pad"
                  />
                  <UserExtraInfo>
                    <Field
                      name="address"
                      component={this._renderInput}
                      title="address Адрес"
                      style={{ flex: 2 }}
                    />
                    <Field
                      name="home"
                      component={this._renderInput}
                      title="home Офис/ кварт."
                      style={{ flex: 1, marginLeft: 5 }}
                    />
                  </UserExtraInfo>
                </UserContainer>
              )}
            </React.Fragment>
          )}
          {/* {!this.state.selfTaken && (
            <UserContainer>
              <Field name="name" component={this._renderInput} title="Имя" />
              <Field
                name="phone"
                component={this._renderInput}
                title="Телефон"
                type="phone"
                title={'Ваш номер телефона'}
                options={{ mask: '+7 (999) 999-99-99' }}
                keyboardType="phone-pad"
              />
              <UserExtraInfo>
                <Field
                  name="address"
                  component={this._renderInput}
                  title="Адрес"
                  style={{ flex: 2 }}
                />
                <Field
                  name="home"
                  component={this._renderInput}
                  title="Офис/ кварт."
                  style={{ flex: 1, marginLeft: 5 }}
                />
              </UserExtraInfo>
              {this._extraCheckbox({
                label: 'Дополнительная информация',
                name: 'extra',
              })}
            </UserContainer>
          )} */}
          <Separator />
          {!this.state.selfTaken &&
            this._extraCheckbox({
              label: 'Комментарии к заказу',
              name: 'extra',
            })}
          {this.state.extra && !this.state.selfTaken && (
            <View>
              <TitleReceive style={{ marginTop: 20 }}>
                Когда доставить
              </TitleReceive>
              <Field
                name="date"
                component={this._renderDateInput}
                label="Выберите дату"
                style={{ marginTop: 18 }}
              />
              <Field
                name="time"
                component={Picker}
                type="time"
                style={{ marginTop: 18 }}
              />
              <Field
                name="specificTime"
                component={this._checkBox}
                label="Точное время (±15 мин) +500₽"
                style={{ marginTop: 18 }}
              />
              {this.props.formValues.specificTime && (
                <Field
                  name="specificTimeTime"
                  component={this._renderTimeInput}
                  label="Выберите точное время"
                  style={{ marginTop: 18 }}
                />
              )}
              <Separator />
              {this._anonCheckbox({ leftTitle: 'От кого', label: 'Анонимно' })}
              {!this.state.anon && (
                <View>
                  <Field
                    name="fromName"
                    component={this._renderInput}
                    title="Имя"
                  />
                  <Field
                    name="fromPhone"
                    component={this._renderInput}
                    title="Телефон"
                    type="phone"
                    title={'Ваш номер телефона'}
                    options={{ mask: '+7 (999) 999-99-99' }}
                    keyboardType="phone-pad"
                  />
                  <Field
                    name="fromEmail"
                    component={this._renderInput}
                    title="E-mail"
                  />
                  <InfoText>Send a check and a photo with a bouquet Отправим чек и фото с букетом</InfoText>
                </View>
              )}

              <Separator />
            </View>
          )}
          <TitleReceive style={{ marginTop: 20, marginBottom: 15 }}>
            Способ оплаты
          </TitleReceive>
          <Field
            name="paymentMethod"
            component={this._renderPaymentMethodInput}
          />
          <Separator />
          <TitleReceive style={{ marginTop: 20, marginBottom: 15 }}>
            К оплате
          </TitleReceive>
          {this.renderCompositionItem({
            title: 'Сумма заказа',
            quantity: price,
          })}
          {this.renderCompositionItem({
            title: 'Доставка',
            quantity: this.state.selfTaken ? 0 : 320,
          })}
          <BoldText>{totalPrice} ₽</BoldText>
          <Button onPress={this.props.handleSubmit(this._submit)}>
            <ButtonText>ПЕРЕЙТИ К ОПЛАТЕ</ButtonText>
          </Button>
        </MainContainer>
      </ScrollContainer>
    )
  }

  _renderPrice = () => {
    let price = this.props.userOrder.totalPrice

    if (!this.state.selfTaken) {
      price += 320
    }

    if (this.props.formValues.specificTime) {
      price += 500
    }

    return price
  }

  _submit = values => this.props.paymentRequest(values)

  _localCheckbox = ({ label, name }) => {
    onChange = () => this.setState(({ text }) => ({ [name]: !text }))
    return (
      <LocalCheckbox
        onChange={onChange}
        value={this.state.text}
        label={label}
      />
    )
  }

  _extraCheckbox = ({ label }) => {
    onChange = () => this.setState({ extra: !this.state.extra })
    return (
      <LocalCheckbox
        style={{ marginTop: this.state.text ? 12 : 20 }}
        onChange={onChange}
        value={this.state.extra}
        label={label}
      />
    )
  }

  _anonCheckbox = ({ leftTitle, label }) => {
    onChange = () => this.setState({ anon: !this.state.anon })
    return (
      <ReceiveUserContainer>
        <TitleReceive>{leftTitle}</TitleReceive>
        <LocalCheckbox
          onChange={onChange}
          value={this.state.anon}
          label={label}
        />
      </ReceiveUserContainer>
    )
  }

  _checkBox = ({ input, ...rest }) => <Checkbox {...input} {...rest} />

  _comment = ({ input: { value, onChange } }) => (
    <StyledInput isComment value={value} onChangeText={onChange} />
  )

  _receiver = ({ leftTitle, label }) => {
    onChange = () =>
      this.setState({
        selfTaken: !this.state.selfTaken,
        extra: this.state.selfTaken,
      })
    return (
      <ReceiveUserContainer>
        <TitleReceive>{leftTitle}</TitleReceive>
        <LocalCheckbox
          onChange={onChange}
          value={this.state.selfTaken}
          label={label}
        />
      </ReceiveUserContainer>
    )
  }

  _renderInput = ({ input: { value, onChange }, type, ...rest }) => (
    <StyledInput
      value={value}
      onChangeText={
        type === 'phone'
          ? R.pipe(
              cleanPhone,
              onChange,
            )
          : onChange
      }
      {...rest}
    />
  )

  _renderDateInput = ({ input, ...rest }) => <DateInput {...input} {...rest} />

  _renderTimeInput = ({ input, ...rest }) => (
    <DateInput
      initialTitle="Выберите точное время"
      type={'time'}
      {...input}
      {...rest}
    />
  )

  _renderPaymentMethodInput = ({ input }) => (
    <Radio
      radio_props={[
        { label: 'Оплата при доставке', value: 'afterShipment' },
        { label: 'Оплата с банковской карты', value: 'bank' },
        { label: 'Оплата с Яндекс.Кошелька', value: 'yandex' },
      ]}
      input={input}
    />
  )
}

export default R.compose(
  reduxForm({
    form: 'order',
    initialValues: { paymentMethod: 'afterShipment', specificTime: false },
  }),
  connect(
    R.applySpec({
      userOrder: getUserOrder,
      formValues: getFormValues('order'),
    }),
    { paymentRequest },
  ),
)(Order)
