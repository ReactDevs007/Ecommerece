import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  separator: {
    marginTop: 15,
    height: 30,
    marginBottom: 15,
  },
  line: {
    top: 15,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  children: {
    backgroundColor: 'white',
    zIndex: 3,
    width: 84,
    marginLeft: -42,
    alignItems: 'center',
    height: 20,
    top: 2,
    left: '50%'
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    height: 20
  }
});
