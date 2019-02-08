import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'
import { login } from '../redux/modules/auth'

class Welcome extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator style={{ margin: 'auto' }} />
      </View>
    )
  }

  componentDidMount() {
    const { login } = this.props
    login()
  }
}

export default connect(
  undefined,
  { login },
)(Welcome)
