import React, { Component } from 'react'
import { Animated, View, Dimensions, ScrollView } from 'react-native'

import PropTypes from 'prop-types'

import AppImage from '../AppImage'
import styles from './styles'

const deviceWidth = Dimensions.get('window').width

const BAR_SPACE = 10

export default class Corousel extends Component {
  static propTypes = {
    images: PropTypes.array,
    ContainerCustomStyles: PropTypes.object,
  }

  itemWidth = 6

  animVal = new Animated.Value(0)

  render() {
    const { images, ContainerCustomStyles } = this.props

    const imagesToLoop = images || ['']

    const imageArray = []
    const barArray = []

    imagesToLoop.forEach((image, i) => {
      const thisImage = (
        <AppImage
          key={`image${i}`}
          src={image}
          styles={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: '100%',
                width: this.itemWidth,
                transform: [{ translateX: scrollBarVal }],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View style={ContainerCustomStyles}>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.animVal } } },
            ])}
          >
            {imageArray}
          </ScrollView>
          <View style={styles.barContainer}>{barArray}</View>
        </View>
      </View>
    )
  }
}
