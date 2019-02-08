import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  filterTitle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
    marginTop: 26,
  },
  touchableArea: {},
  checkbox: {
    borderWidth: 0,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
  },
  checkboxWrapper: {
    alignSelf: 'flex-start',
    width: 120,
    marginRight: 46,
  },
  checkboxText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
  },
  flatlist: {
    marginBottom: 26,
  },
})
