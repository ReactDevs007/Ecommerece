/* eslint-disable react/prop-types */
import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import MailActive from '../../../assets/img/male-active.png'
import Mail from '../../../assets/img/male.png'
import FeMail from '../../../assets/img/female.png'
import FeMailActive from '../../../assets/img/female-active.png'

export const MaleIcon = ({ active }) => (
  <Image style={styles.img} source={active ? MailActive : Mail} />
)

export const FeMaleIcon = ({ active }) => (
  <Image style={styles.img} source={active ? FeMailActive : FeMail} />
)

const GenderSelect = ({ active = null, onPress, error = null, disabled }) => (
  <View
    style={{
      flexDirection: 'row',
      marginTop: 20,
    }}
  >
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress('male')}
      style={styles.touchable}
    >
      <MaleIcon active={active === 'male'} />
      <Text style={styles.text}>Male Мужской</Text>
      <View style={active === 'male' ? styles.iconActive : styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress('female')}
      style={styles.touchable}
      disabled={disabled}
    >
      <FeMaleIcon active={active === 'female'} />
      <Text style={styles.text}>female Женский</Text>
      <View style={active === 'female' ? styles.iconActive : styles.icon} />
    </TouchableOpacity>
    {error && <Text>{error}</Text>}
  </View>
)

GenderSelect.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.string,
  error: PropTypes.string,
}

export default GenderSelect
