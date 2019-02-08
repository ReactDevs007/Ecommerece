/* eslint-disable quotes */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import styles from './styles';

const BonusCount = ({ count }) => (
  <View>
    <Text style={styles.count}>
      {count}
    </Text>
    <Text style={styles.text}>
      баллов
    </Text>
  </View>
);

BonusCount.propTypes = {
  count: PropTypes.number
};

export default BonusCount;
