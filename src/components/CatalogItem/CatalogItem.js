import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components/native'

const EmptyImage = styled.View`
  width: 199px;
  height: 199px;

  background-color: blue;
`

import AppImage from '../AppImage'

import styles from './styles'

class CatalogItem extends React.Component {
  onProductPress = () => {
    const { onPress } = this.props
    onPress()
  }

  render() {
    const { discount, price, title, image } = this.props

    const normilisePrice = price.split('.')[0] + '₽'

    return (
      <TouchableOpacity onPress={this.onProductPress}>
        <View style={styles.container}>
          {image ? (
            <AppImage styles={styles.image} src={{ uri: image }} />
          ) : (
            <EmptyImage />
          )}
          <Text style={styles.title}>{title}</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}
          >
          <Text style={styles.price}>{discount || normilisePrice}</Text>
          {discount && (
          <Text style={styles.discounted}>{`${normilisePrice}`}</Text>
          )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(CatalogItem)


// <View
//   style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}
// >
//   <Text style={styles.price}>{discount || normilisePrice}</Text>
//   {discount && (
//     <Text style={styles.discounted}>{`${normilisePrice}`}</Text>
//   )}
// </View>