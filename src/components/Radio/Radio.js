import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';

const Radio = ({
  keyField,
  styles = {},
  radioProps,
  onPress
}) => (
  <View style={styles}>
    <RadioForm
      formHorizontal
      labelHorizontal={false}
      buttonColor="#2196f3"
      animation
      radio_props={radioProps}
      initial={radioProps[0].value}
      key={keyField}
      onPress={onPress}
    />
  </View>
);

Radio.propTypes = {
  onPress: PropTypes.func.isRequired,
  styles: PropTypes.object,
  radioProps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired,
  keyField: PropTypes.string.isRequired
};

export default Radio;
