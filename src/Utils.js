import { Platform, StatusBar } from 'react-native'

/**
 * Validate phone by format - +7 (ххх) xxx-xx-xx
 * @param str
 * @returns {boolean}
 */

// hardcoded cause of Header.Height deprecation warning
export const getKeyboardVerticalOffset = () =>
  Platform.OS === 'ios' ? 64 : 56 + StatusBar.currentHeight

export const validatePhone = (str = '') => {
  // Only numbers
  // eslint-disable-next-line no-useless-escape
  const regexp = /^\+7\s\(\d{3}\)\s\d{3}[\-]\d{2}[\-]\d{2}$/
  // +7 (ххх) xxx-xx-xx
  return regexp.test(str)
}

/**
 * ToDo - refactor this
 * Transform to +7 (ххх) xxx-xx-xx format
 * @param phone
 * @returns {string}
 */
export const cleanPhone = (phone = '') => {
  let cleanedPhone = '+7 ('
  const allowed = '0123456789'

  const oldPhone = phone
    .replace(cleanedPhone, '')
    .replace('+7', '')
    .replace('(', '')
    .replace(/-/g, '')
    .replace(/ /g, '')
    .replace(')', '')

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < oldPhone.length; i++) {
    if (i === 3) {
      cleanedPhone += ') '
    }
    if (i === 6 || i === 8) {
      cleanedPhone += '-'
    }
    if (allowed.indexOf(oldPhone[i]) > -1) {
      cleanedPhone += oldPhone[i]
    }
  }

  cleanedPhone = cleanedPhone.substr(0, 18)

  return cleanedPhone
}

export default {
  validatePhone,
  cleanPhone,
}
