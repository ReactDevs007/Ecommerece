import * as React from 'react'
import * as R from 'ramda'
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components/native'
import MainButton from '../components/MainButton'
import { TouchableOpacity, Linking } from 'react-native'
import { onPressCall } from '../helpers'
import Communications from 'react-native-communications'

const Container = styled.View`
  flex: 1;
`

const MarkerImage = styled.Image.attrs({
  source: require('../../assets/img/marker.png'),
})`
  tint-color: ${({ selected }) => (selected ? '#01B1EC' : '#fff')};
`

const MarkerCustom = styled.View`
  width: 28px;
  height: 38px;

  align-items: center;
`

const InfoContainer = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 30 },
})`
  position: absolute;
  width: 100%;
  height: 303px;
  bottom: 0;
  background: #fff;

  padding: 35px;
`

const Empty = styled.View`
  height: 30px;
`

const Circle = styled.View`
  position: absolute;
  width: 17px;
  height: 17px;

  margin: 6.15px 5.19px 14.41px 0;

  background: ${({ selected }) => (selected ? '#fff' : '#01B1EC')};

  border-radius: 8.5px;
`

const ShopTitle = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;

  color: #000000;
`

const AddressText = styled.Text`
  font-family: Montserrat;
  font-size: 12px;

  color: #787878;

  margin-top: 4px;
`

const ValueText = styled.Text`
  font-family: Montserrat;
  font-size: 14px;

  color: #000000;

  margin-top: 3px;
`

const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: rgba(189, 207, 213, 0.5);

  margin-top: 30px;
`

const TitlePhoneText = styled.Text`
  font-family: Montserrat;
  font-size: 12px;

  color: #787878;

  margin-top: 24px;
`

class MapComponent extends React.Component {
  state = {
    region: {
      latitude: 55,
      longitude: 37,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  render() {
    const {
      title,
      address,
      phone,
      workHours = {},
      lat,
      lon,
    } = this._getSelectedCompany()
    const { shops, selectShop, selected, openGps = () => {} } = this.props

    console.log(this.props)
    return (
      <Container>
        <MapView style={{ flex: 1 }} initialRegion={this.state.region}>
          {shops.map(({ latitude, longitude, id }) => {
            console.log(latitude, longitude, id)
            return (
              <Marker
                image={
                  id === selected
                    ? require('../../assets/img/marker-a.png')
                    : require('../../assets/img/marker.png')
                }
                key={id}
                coordinate={{
                  latitude: Number.parseFloat(latitude),
                  longitude: Number.parseFloat(longitude),
                }}
                onPress={() => selectShop(id)}
                style={{
                  zIndex: 2,
                  width: 28,
                  height: 38,
                  alignItems: 'center',
                }}
              />
            )
          })}
        </MapView>
        {selected !== null && (
          <InfoContainer>
            <ShopTitle>{title}</ShopTitle>
            <AddressText>{address}</AddressText>
            <Separator />
            <TouchableOpacity
              onPress={() => {
                Communications.phonecall(phone, true)
              }}
            >
              <TitlePhoneText>Телефон</TitlePhoneText>
              <ValueText>{phone}</ValueText>
            </TouchableOpacity>
            <TitlePhoneText style={{ marginTop: 18 }}>
              Режим работы
            </TitlePhoneText>
            <ValueText>Пн-Пт: {workHours.weekdays || 'Не указано'},</ValueText>
            <ValueText>Сб-Вс: {workHours.holidays || 'Не указано'}</ValueText>
            <MainButton
              onPress={() => openGps({ lat, lon })}
              text="Построить маршрут сюда"
              style={{ alignSelf: 'center', marginTop: 26, width: '100%' }}
              backgroundColor={'#01b1ec'}
              disabledBackgroundColor={'#BDCFD5'}
            />
            <Empty />
          </InfoContainer>
        )}
      </Container>
    )
  }

  _onRegionChange = region => this.setState({ region: region })

  _getSelectedCompany = () => {
    const { shops, selected } = this.props

    return R.find(x => x.id === selected, shops) || {}
  }
}

export default MapComponent
