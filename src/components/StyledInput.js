import * as React from 'react'
import styled from 'styled-components/native'

const MainInputContainer = styled.View`
  margin-top: 15px;

  width: 100%;
`

const InputTitle = styled.Text`
  font-family: Montserrat;
  font-size: 11px;

  color: #878787;
`

const Input = styled.TextInput`
  font-family: Montserrat;
  font-size: 13px;
  color: #000000;

  height: 35px;
  width: 100%;

  border-width: 1px;
  border-radius: 20px;

  margin-top: 7px;
  padding: 9px 10px 9px 20px;
`

const ErrorText = styled.Text`
  font-family: Montserrat;
  font-size: 10px;
  text-align: center;

  color: red;
`

const StyledInput = ({
  type,
  keyboardType,
  onChangeText,
  value,
  editable,
  options,
  title,
  focused,
  error,
  isComment,
  ...rest
}) => (
  <MainInputContainer {...rest}>
    {title && <InputTitle>{title}</InputTitle>}
    <Input
      multiline={isComment}
      style={{
        borderColor: focused ? '#01b1ec' : '#BDCFD5',
        height: isComment ? 64 : undefined,
      }}
      maxLength={isComment ? undefined : 18}
      editable={editable}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
    />
    {!!error && <ErrorText>{error}</ErrorText>}
  </MainInputContainer>
)

export default StyledInput
