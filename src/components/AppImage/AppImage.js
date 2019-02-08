import React from 'react'
import PropTypes from 'prop-types'
import Image from 'react-native-image-progress'

const AppImage = ({ styles, src, ...rest }) => {
  const srcToDisplay = src
    ? typeof src === 'string'
      ? { uri: src }
      : src
    : require('../../../assets/img/imagePlaceholder.png')
  const stylesTodisplay = src ? styles : { ...styles, alignSelf: 'center' }
  return <Image {...rest} source={srcToDisplay} style={stylesTodisplay} />
}

AppImage.propTypes = {
  styles: PropTypes.object.isRequired,
  src: PropTypes.any,
}

export default AppImage
