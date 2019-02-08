import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button as FormButton } from 'react-native-elements';
import styles from './styles';

const EmptyButton = ({
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
      disabledStyle
      disabledTitleStyle
      buttonStyle={[
        styles.button,
        active ? styles.active : null,
        customStyles || null
      ]}
      titleStyle={[
        styles.text,
        active ? styles.textActive : null,
      ]}
      title={title}
      onPress={onPress}
      {...rest}
    />
  </View>
);

EmptyButton.propTypes = {
  active: PropTypes.bool,
  keyField: PropTypes.string.isRequired,
  customStyles: PropTypes.any,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default EmptyButton;
