import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const ElementContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`

const OuterRadio = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
`

const InnerRadio = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${({ selected }) => (selected ? '#01b1ec' : 'white')};
`

const Radio = ({ selected }) => (
  <View>
    <OuterRadio>
      <InnerRadio selected={selected} />
    </OuterRadio>
  </View>
)

class RadioField extends Component {
  componentWillMount() {
    this.setState({ value: this.props.radio_props[0].value })
  }

  render() {
    return (
      <element>
        {this.props.radio_props.map((element, index) => (
          <ElementContainer
            key={element.value}
            onPress={() => this._handlePress(element.value)}
          >
            <Radio selected={element.value === this.state.value} />
            <Text>{element.label}</Text>
          </ElementContainer>
        ))}
      </element>
    )
  }

  _handlePress = value => {
    this.setState({ value })
    this.props.input.onChange(value)
  }
}

export default RadioField
