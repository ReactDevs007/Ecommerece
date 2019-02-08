import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ModalComponent from 'react-native-modal';
import styles from './styles';

const Modal = ({
  isVisible = false, height = 200, children, ...rest
}) => (
  <View>
    <ModalComponent
      isVisible={isVisible}
      style={[styles.modal, { height }]}
      {...rest}
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </ModalComponent>
  </View>
);

Modal.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
