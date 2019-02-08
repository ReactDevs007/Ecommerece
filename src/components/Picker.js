import React, { Component } from 'react'
import { View, Modal, Picker, Button, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { getAvalivableTime } from '../redux/modules/order/managers'

const Input = styled.Text`
  font-family: Montserrat;
  font-size: 13px;
  color: #000000;

  height: 35px;
  width: 100%;

  background: #fcfcfc;
  border: 1px solid #e2e2e2;
  border-radius: 20px;

  margin-top: 7px;
  padding: 9px 10px 9px 20px;
`

class PickerComponent extends Component {
  state = {
    modalVisible: false,
    time: '',
    input: 'Выберите время получения',
    avalivableTime: ['Неизвестно'],
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  componentDidMount() {
    getAvalivableTime().then(res => this.setState({ avalivableTime: res }))
  }

  render() {
    const timeList = this.state.avalivableTime

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <Input>{this.state.input}</Input>
        </TouchableOpacity>
        <Modal visible={this.state.modalVisible}>
          <Picker
            selectedValue={this.state.time}
            onValueChange={this._handleInputChange}
          >
            {timeList.map(time => (
              <Picker.Item label={time} key={time} value={time} />
            ))}
          </Picker>
          <Button onPress={this._handleSubmit} title="Подтвердить" />
        </Modal>
      </View>
    )
  }

  _handleSubmit = () => {
    this.props.input.onChange(this.state.time)
    this.setModalVisible(!this.state.modalVisible)
  }

  _handleInputChange = itemValue => {
    this.setState({ time: itemValue })
    this.setState({ input: itemValue })
  }
}

export default PickerComponent
