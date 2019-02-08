import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 30,
    justifyContent: 'center',
    borderWidth: 0
  },
  input: {
    width: '82%',
    marginLeft: '9%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
    borderRadius: 20,
    borderColor: '#E2E2E2',
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'hidden'
  },
  inputFocus: {
    borderColor: '#01B1EC',
  },
  label: {
    width: '82%',
    marginLeft: '9%',
    marginBottom: 8,
    marginTop: 0,
    textAlign: 'left',
    color: '#878787',
    fontFamily: 'Montserrat-Regular',
    fontSize: 11
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
});
