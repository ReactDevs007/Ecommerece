import * as React from 'react'
import * as R from 'ramda'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;

  padding: 20px;
`

const TabContainer = styled.View`
  flex-direction: row;
  border: 1px solid ${R.prop('borderColorContainer')};
  border-radius: 5px;

  height: 30px;
  width: 100%;

  margin-top: 16px;

  background-color: #fff;
`

const ItemContainer = styled.TouchableOpacity`
  background-color: ${({ selected, selectedColor, emptyColor }) =>
    selected ? selectedColor : emptyColor};

  flex: 1;
  border-radius: 5px;
`

const TabTitle = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

const TabText = styled.Text`
  margin: auto;

  font-family: Montserrat;
  font-weight: 500;
  line-height: 13px;
  font-size: 12px;

  color: ${({ selected, textColor, selectedTextColor }) =>
    selected ? selectedTextColor : textColor};
`

class Tab extends React.Component {
  render() {
    const {
      title,
      items,
      selected = 0,
      selectedBackground = '#BDCFD5',
      borderColorContainer = '#BDCFD5',
      selectedTextColor = '#fff',
      textColor = '#000',
      onChangeItem,
      style,
    } = this.props

    return (
      <Container style={style}>
        {title && <TabTitle>{title}</TabTitle>}
        <TabContainer borderColorContainer={borderColorContainer}>
          {items.map((x, i) => {
            return (
              <ItemContainer
                selected={selected === i}
                selectedColor={selectedBackground}
                emptyColor={'#fff'}
                onPress={() => onChangeItem(i)}
              >
                <TabText
                  selected={selected === i}
                  selectedTextColor={selectedTextColor}
                  textColor={textColor}
                >
                  {x}
                </TabText>
              </ItemContainer>
            )
          })}
        </TabContainer>
      </Container>
    )
  }
}

export default Tab
