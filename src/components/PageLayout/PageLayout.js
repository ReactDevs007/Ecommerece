import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import styles from './styles';

const PageLayout = ({ scrolled, children }) => (
  scrolled ? (
    <ScrollView style={styles.container}>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.container}>
      {children}
    </View>
  )
);

PageLayout.propTypes = {
  children: PropTypes.node,
  scrolled: PropTypes.bool
};

PageLayout.defaultProps = {
  children: null
};

export default PageLayout;
