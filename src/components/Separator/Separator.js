import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const Separator = ({ show = true, children }) => (
  show ? (
    <View style={styles.separator}>
      <View style={styles.line} />
      {children ? (
        <View style={styles.children}>
          <Text style={styles.text}>{children}</Text>
        </View>
      ) : null}
    </View>
  ) : null
);

Separator.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Separator;
