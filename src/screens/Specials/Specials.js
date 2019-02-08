import React from 'react'
import PropTypes from 'prop-types'
import { Linking } from 'react-native'
import styled from 'styled-components'

const Container = styled.ScrollView`
  flex: 1;
`

const ScrollContainer = styled.View`
  flex: 1;
`

const Preloader = styled.ActivityIndicator`
  margin: auto;
`

const Button = styled.TouchableOpacity`
  width: 100%;
  height: ${({ scrHeight }) => scrHeight};
`

const Image = styled.Image`
  width: 100%;
  height: ${({ scrHeight }) => scrHeight};
`

export default class Specials extends React.Component {
  static navigationOptions = {
    title: 'Акции',
  }

  openUrl = url =>
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
      }
    })

  static propTypes = {
    specials: PropTypes.array,
    getData: PropTypes.func,
  }

  componentDidMount() {
    this.props.getSpecialsRequest()
  }

  render() {
    const { specials, isLoading } = this.props

    return (
      <Container>
        {isLoading ? (
          <Preloader />
        ) : (
          <ScrollContainer>
            {specials.map(({ image, screen_height, link }, i) => (
              <Button
                scrHeight={screen_height}
                key={i}
                onPress={() => this.openUrl(link)}
              >
                <Image scrHeight={screen_height} source={{ uri: image }} />
              </Button>
            ))}
          </ScrollContainer>
        )}
      </Container>
    )
  }
}
