import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { withNavigation } from 'react-navigation'

class BackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          source={require('../../../assets/img/backBtn.png')}
          style={{ height: 15, width: 8, marginLeft: 20 }}
        />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(BackButton)
