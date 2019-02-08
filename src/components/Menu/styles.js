import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuContainer: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  menuItem: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
    fontSize: 16
  },
  activeLabelStyle: {
    color: 'black',
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'normal',
    fontSize: 16
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#01B1EC'
  },
  userName: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular'
  },
  userBonus: {
    color: '#9DE4FC',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold'
  },
  userAvatar: {
    backgroundColor: 'white',
    borderRadius: 150,
    width: 48,
    height: 48,
    padding: 10,
    marginRight: 15
  }
});
