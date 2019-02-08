import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 6,
    borderRadius: 100
  },
  bar: {
    backgroundColor: '#fff',
    height: 6,
    borderRadius: 100,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
