import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '80%',
    marginLeft: '10%',
    marginTop: 20,
    marginBottom: 20,
  },
  touchable: {
    width: '50%',
    justifyContent: 'center',
  },
  img: {
    height: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
  },
  icon: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
    marginTop: 7,
  },
  iconActive: {
    borderBottomColor: '#01B1EC',
    borderBottomWidth: 4,
    marginTop: 5,
  },
})
