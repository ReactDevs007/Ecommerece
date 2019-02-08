import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import MenuIcon from '../../../assets/img/menu-icon.png';

const MenuButton = props => (
  <View style={{ paddingRight: 14 }}>
    <TouchableOpacity onPress={() => props.openDrawer()}>
      <Image source={MenuIcon} />
    </TouchableOpacity>
  </View>
);

MenuButton.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

export default MenuButton;
