import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button as FormButton } from 'react-native-elements';
import styles from './styles';

const Button = ({
  keyField,
  active = false,
  title,
  onPress,
  customStyles = null,
  ...rest
}) => (
  <View style={styles.container}>
    <FormButton
      key={keyField}
      medium
      buttonStyle={[
        styles.button,
        active ? styles.active : null,
        customStyles || null
      ]}
      titleStyle={styles.text}
      title={title}
      icon={{ type: 'octicon' }}
      onPress={onPress}
      {...rest}
    />
  </View>
);

Button.propTypes = {
  active: PropTypes.bool,
  keyField: PropTypes.string.isRequired,
  customStyles: PropTypes.any,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
