import * as React from 'react'
import * as R from 'ramda'
import styled from 'styled-components/native'

const MainButtonContaiener = styled.TouchableOpacity`
  background: ${({ disabled, bg, disabledBackgroundColor }) =>
    disabled ? disabledBackgroundColor : bg};
  border-radius: 30px;
  border-width: 2px;
  border-color: ${({ disabled }) => (disabled ? '#BDCFD5' : '#01b1ec')};
  width: 180px;
  height: 44px;
`

const ButtonText = styled.Text`
  font-family: Montserrat;
  font-size: 12px;

  color: ${R.prop('textColor')};
  margin: auto;
`
const Preloader = styled.ActivityIndicator`
  margin: auto;
`

const MainButton = ({
  disabled,
  backgroundColor = '#fff',
  disabledBackgroundColor = '#fff',
  textColor = '#fff',
  disabledTextColor = '#fff',
  isLoading,
  text,
  onPress,
  ...rest
}) => (
  <MainButtonContaiener
    bg={backgroundColor}
    disabledBackgroundColor={disabledBackgroundColor}
    disabled={disabled || isLoading}
    onPress={onPress}
    {...rest}
  >
    {isLoading ? (
      <Preloader />
    ) : (
      <ButtonText textColor={disabled ? disabledTextColor : textColor}>
        {text}
      </ButtonText>
    )}
  </MainButtonContaiener>
)

export default MainButton
