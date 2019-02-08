import * as React from 'react'
import styled from 'styled-components/native'
import DatePicker from 'react-native-modal-datetime-picker'

const Wrapper = styled.View``

const MainContainer = styled.TouchableOpacity`
  width: 100%;

  background: #fcfcfc;
  border: 1px solid #e2e2e2;
  border-radius: 20px;

  padding: 9px 0px 10px 20px;

  margin-top: 7px;
`

const ValueText = styled.Text`
  font-family: Montserrat;
  font-size: 13px;

  color: #000000;
`

const InputTitle = styled.Text`
  font-family: Montserrat;
  font-size: 11px;

  color: #878787;
`

const normilizerDateValue = num => {
  const value = num.toString()
  return value.length === 1 ? '0' + value : value
}

class DateInput extends React.Component {
  state = {
    isDateTimePickerVisible: false,
  }

  render() {
    const {
      name,
      value,
      label,
      disabled,
      type,
      initialTitle,
      ...rest
    } = this.props

    return (
      <React.Fragment>
        <DatePicker
          titleIOS={name === 'date' ? 'Выберите дату' : 'Выберите точное время'}
          isVisible={this.state.isDateTimePickerVisible}
          confirmTextIOS="Ок"
          cancelTextIOS="Отмена"
          mode={type || 'date'}
          onCancel={this._hideDateTimePicker}
          onConfirm={this._handleDatePicked}
        />
        <Wrapper {...rest}>
          <InputTitle>{label}</InputTitle>
          <MainContainer disabled={disabled} onPress={this._showDateTimePicker}>
            <ValueText>{value || initialTitle || 'Выберите дату'} </ValueText>
          </MainContainer>
        </Wrapper>
      </React.Fragment>
    )
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = date => {
    const { onChange, type } = this.props

    onChange(
      type === 'time'
        ? `${normilizerDateValue(date.getHours())} : ${normilizerDateValue(
            date.getMinutes(),
          )}`
        : `${normilizerDateValue(date.getDate())}. ${normilizerDateValue(
            date.getMonth() + 1,
          )}. ${date.getFullYear()}`,
    )
    this._hideDateTimePicker()
  }
}

export default DateInput
