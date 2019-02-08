import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginRight: 12,
  },
  image: {
    width: 199,
    height: 199,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    lineHeight: 14,
    marginBottom: 2,
    marginTop: 11,
  },
  price: {
    display: 'flex',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 13,
    marginRight: 10,
  },
  discounted: {
    color: '#C4C4C4',
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 13,
    textDecorationLine: 'line-through',
  },
})
