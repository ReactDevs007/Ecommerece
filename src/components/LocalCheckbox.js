import * as React from 'react'
import styled from 'styled-components/native'

const MainContainer = styled.TouchableOpacity`
  flex-direction: row;
`

const CheckboxContainer = styled.View`
  width: 18px;
  height: 18px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
`

const CheckboxSelect = styled.View`
  width: 12px;
  height: 12px;

  margin: auto;

  background: #01b1ec;
  border-radius: 3px;
`

const Label = styled.Text`
  font-family: Montserrat;
  font-size: 12px;

  margin-left: 10px;

  align-self: center;

  color: #000000;
`

const Checkbox = ({ label, onChange, value, ...rest }) => (
  <MainContainer onPress={onChange} {...rest}>
    <CheckboxContainer>{!!value && <CheckboxSelect />}</CheckboxContainer>
    <Label>{label}</Label>
  </MainContainer>
)

export default Checkbox
