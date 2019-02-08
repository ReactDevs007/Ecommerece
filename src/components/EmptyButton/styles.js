import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    minWidth: 180,
    height: 44,
    backgroundColor: 'white',
    borderColor: '#BDCFD5',
    borderWidth: 2,
    borderRadius: 20
  },
  active: {
    borderColor: '#01B1EC'
  },
  text: {
    justifyContent: 'center',
    color: '#BDCFD5',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12
  },
  textActive: {
    color: '#01B1EC'
  }
});
