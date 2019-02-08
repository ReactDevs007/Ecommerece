import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
  infoWrapper: {
    paddingLeft: 37,
    paddingRight: 37
  },
  filterTitle: {
    fontFamily: 'Montserrat',
    fontSize: 14
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 26
  },
  touchableArea: {
    width: 20,
    height: 20
  },
  showBtn: {
    borderRadius: 0,
    marginTop: 12
  },
  priceFilterContainer: {
    flexDirection: 'row',
    marginBottom: 26
  },
  priceInput: {
    width: 80,
    height: 30,
    borderStyle: 'solid',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    textAlign: 'center'
  },
  priceRangeContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30
  }
});
