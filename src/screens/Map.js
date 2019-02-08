import * as React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import {
  getIsLoading,
  getShopsOnMap,
  getShopsRequest,
} from '../redux/modules/shops'
import Tab from '../components/Tab'
import { Platform, Linking } from 'react-native'
import MapComponent from '../components/MapComponent'
import MapListComponent from '../components/MapListComponent'
import openMap from 'react-native-open-maps'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

const Preloader = styled.ActivityIndicator`
  margin: auto;
`

class Map extends React.Component {
  static navigationOptions = {
    title: 'Магазины на карте',
  }

  state = {
    selectedTab: 0,
    selectedShop: null,
  }

  componentDidMount() {
    this.props.getShopsRequest()
  }

  openGps = ({ lat, lon }) => {
    openMap({ latitude: lat, longitude: lon })
  }

  openExternalApp(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      }
    })
  }

  render() {
    const { isLoading, shops } = this.props
    const { selectedTab, selectedShop } = this.state
    return (
      <React.Fragment>
        <Tab
          selectedBackground={'#01B1EC'}
          onChangeItem={this._changeTab}
          selected={this.state.selectedTab}
          items={['Карта', 'Список']}
          style={{
            zIndex: 1,
            position: 'absolute',
            alignSelf: 'center',
            flex: 1,
            width: '80%',
          }}
        />
        <Container>
          {isLoading ? (
            <Preloader />
          ) : selectedTab === 0 ? (
            <MapComponent
              shops={shops}
              selectShop={this._selectShop}
              selected={selectedShop}
              openGps={this.openGps}
            />
          ) : (
            <MapListComponent
              shops={shops}
              selectShop={this._selectShop}
              selected={selectedShop}
              openGps={this.openGps}
            />
          )}
        </Container>
      </React.Fragment>
    )
  }

  _changeTab = index => {
    this.setState({ selectedTab: index })
  }

  _selectShop = id => {
    this.setState({ selectedShop: id })
  }
}

const mapStateToProps = R.applySpec({
  isLoading: getIsLoading,
  shops: getShopsOnMap,
})

export default connect(
  mapStateToProps,
  {
    getShopsRequest,
  },
)(Map)
