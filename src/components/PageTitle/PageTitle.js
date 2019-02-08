/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import styles from './styles';

const PageTitle = ({ children }) => (
  <Text style={styles.title}>
    { children }
  </Text>
);

PageTitle.propTypes = {
  children: PropTypes.node
};

export default PageTitle;
