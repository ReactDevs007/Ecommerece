import React from 'react';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    propForForceUpdate: PropTypes.string,
    keyboardType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    inputProps: PropTypes.object,
    customStyles: PropTypes.object,
    error: PropTypes.string,
    keyField: PropTypes.string.isRequired
  };

  state = {
    focused: false
  };

  onFocus = () => {
    this.setState({
      focused: true
    });
  };

  onBlur = () => {
    this.setState({
      focused: false
    });
  };

  render() {
    const {
      keyField,
      inputProps = {},
      name,
      keyboardType,
      customStyles = {},
      onChange,
      propForForceUpdate,
      error = null
    } = this.props;
    const { focused } = this.state;

    return (
      <View>
        {name ? (
          <Text style={styles.label}>
            {name}
          </Text>
        ) : null}
        <TextInput
          {...inputProps}
          keyboardType={keyboardType}
          key={keyField}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChangeText={onChange}
          data-force-key={propForForceUpdate}
          style={[styles.input, customStyles, focused && styles.inputFocus]}
        />
        {error && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}

export default Input;
