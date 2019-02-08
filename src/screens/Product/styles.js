import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 18,
    marginTop: 36,
    marginBottom: 18,
  },
  infoContainer: {
    minWidth: 300,
    paddingLeft: 36,
    paddingRight: 36,
  },
  price: {
    display: 'flex',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    marginRight: 10,
  },
  discounted: {
    color: '#C4C4C4',
    fontFamily: 'Montserrat',
    fontSize: 14,
    lineHeight: 15,
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
    marginBottom: 22,
  },
  composition: {
    marginTop: 22,
  },
  stock: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 13,
    color: '#85E483',
  },
  checkoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})
