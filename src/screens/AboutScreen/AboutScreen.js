import React from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components'

const Preloader = styled.ActivityIndicator`
  margin: auto;
`

const Container = styled.View`
  flex: 1;
`

const TitleContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${({ isCompany }) => (isCompany ? 20 : 40)}px;
`

const LogoContainer = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 30px;
  background: #c4c4c4;
`

const Title = styled.Text`
  margin-top: 10px;
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  line-height: 17px;
`

const InfoContainer = styled.View`
  margin: 0px 35px 40px 40px;
`

const InfoText = styled.Text`
  font-size: 12;
  font-family: 'Montserrat-Regular';
  line-height: 19px;
`

const ButtonBlock = styled.View`
  margin: 37px 0;
`

const Seprator = styled.View`
  height: 1px;
  background: rgba(189, 207, 213, 0.5);
`

const Button = styled.TouchableOpacity`
  margin-left: 35;
`

const ButtonText = styled.Text`
  padding: 15px 0;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Montserrat-Medium';
`

const InfoButton = ({ title, withSeparator, onPress }) => (
  <React.Fragment>
    {withSeparator && <Seprator />}
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
    <Seprator />
  </React.Fragment>
)

class AboutScreeb extends React.Component {
  componentDidMount() {
    const { getInfo } = this.props
    getInfo()
  }

  goToDeveloperWebsite = () =>
    Linking.canOpenURL('http://e-bash.today').then(supported => {
      if (supported) {
        Linking.openURL('http://e-bash.today')
      }
    })

  navigateToHelpService = () => this.props.navigateToHelpService()

  render() {
    const { info, isLoading, title, isCompany } = this.props

    return isLoading ? (
      <Preloader />
    ) : (
      <Container>
        <TitleContainer isCompany={isCompany}>
          {!isCompany && <LogoContainer />}
          <Title>{!!title && title}</Title>
        </TitleContainer>
        {!isCompany && (
          <ButtonBlock>
            <InfoButton
              onPress={this.goToDeveloperWebsite}
              withSeparator
              title="Сайт разработчика"
            />
            <InfoButton
              onPress={this.navigateToHelpService}
              title="Служба поддержки"
            />
          </ButtonBlock>
        )}
        <InfoContainer>
          <InfoText>{info}</InfoText>
        </InfoContainer>
      </Container>
    )
  }
}

export default AboutScreeb
