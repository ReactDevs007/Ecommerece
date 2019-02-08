import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox as CheckBoxComponent } from 'react-native-elements';
import styles from './styles';

const CheckBox = ({
  keyField,
  checked = false,
  name,
  onPress,
  error = null
}) => (
  <View style={styles}>
    <CheckBoxComponent
      key={keyField}
      containerStyle={styles.container}
      textStyle={styles.text}
      checkedIcon="check-square"
      size={18}
      checked={checked}
      onPress={onPress}
      title={name}
    />
    {error ? (
      <Text>
        { error }
      </Text>
    ) : null}
  </View>
);

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.string,
  keyField: PropTypes.string.isRequired
};

export default CheckBox;
