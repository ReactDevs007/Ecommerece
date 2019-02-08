import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  margin: auto;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

class Payment extends React.Component {
  render() {
    return (
      <Container>
        <Text>Thank you for your purchase!</Text>
        <Text>Our operator will contact you!</Text>
      </Container>
    )
  }
}

export default Payment
//<Text>Спасибо за покупку!</Text>
//<Text>Наш оператор свяжется с Вами!</Text>