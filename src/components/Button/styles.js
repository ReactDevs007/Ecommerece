import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    width: 180,
    justifyContent: 'center',
    borderRadius: 20,
    height: 44,
    backgroundColor: '#BDCFD5',
  },
  active: {
    backgroundColor: '#01B1EC'
  },
  text: {
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12
  }
});
