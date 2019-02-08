import React, { Component } from 'react'
import styled from 'styled-components/native'
import Polygon from '../../assets/img/Polygon.png'
import MainButton from '../components/MainButton'
import { TouchableOpacity, Linking } from 'react-native'
import Communications from 'react-native-communications'

const ArrowButton = styled.TouchableOpacity.attrs({
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})``

const ArrowIcon = styled.Image.attrs({
  source: Polygon,
})`
  transform: ${({ selected }) => (selected ? null : 'rotate(180deg)')};
`

const Container = styled.View`
  padding-top: 100px;
`

const List = styled.FlatList``

const ItemContainer = styled.View`
  justify-content: center;

  padding: 30px 35px;

  border: solid #ccc;
  border-bottom-width: 0.5px;
  border-top-width: 0.5px;

  background-color: ${({ selected }) =>
    selected ? 'rgba(189, 207, 213, 0.1)' : 'white'};
`

const ShopTitle = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`

const ShopDescription = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  color: #787878;
`

const ContactsContainer = styled.View`
  margin: 10px 0;
`

const ContactsText = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`

const ExtraInfo = styled.View`
  margin-top: 10px;
`

const MainInfo = styled.View``

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const WorkingHours = ({ workHours }) => (
  <element>
    <ContactsText>Пн-Пт: {workHours.weekdays}</ContactsText>
    <ContactsText>Сб-Вс: {workHours.holidays}</ContactsText>
  </element>
)

const Item = ({ shop, selectShop, selected, openGps }) => (
  <ItemContainer selected={selected === shop.id}>
    <TopContainer>
      <MainInfo>
        <ShopTitle>{shop.title}</ShopTitle>
        <ShopDescription>{shop.address}</ShopDescription>
      </MainInfo>
      <ArrowButton
        onPress={() =>
          selected === shop.id ? selectShop(null) : selectShop(shop.id)
        }
      >
        <ArrowIcon selected={shop.id === selected} />
      </ArrowButton>
    </TopContainer>
    {selected === shop.id && (
      <ExtraInfo>
        <ContactsContainer>
          <TouchableOpacity
            onPress={() => {
              Communications.phonecall(shop.phone, true)
            }}
          >
            <ShopDescription>Телефон</ShopDescription>
            <ContactsText>{shop.phone}</ContactsText>
          </TouchableOpacity>
        </ContactsContainer>
        <ContactsContainer>
          <ShopDescription>Режим работы</ShopDescription>
          {shop.workHours ? (
            <WorkingHours workHours={shop.workHours} />
          ) : (
            <ContactsText>Неизвестно</ContactsText>
          )}
        </ContactsContainer>
        <MainButton
          onPress={() => {
            openGps && openGps({ lat: shop.lat, lon: shop.lon })
          }}
          text="Построить маршрут сюда"
          style={{ alignSelf: 'center', marginTop: 26, width: '100%' }}
          backgroundColor={'#01b1ec'}
          disabledBackgroundColor={'#BDCFD5'}
        />
      </ExtraInfo>
    )}
  </ItemContainer>
)

class MapListComponent extends Component {
  render() {
    return (
      <Container>
        <List
          data={this.props.shops}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </Container>
    )
  }

  _renderItem = ({ item }) => (
    <Item
      openGps={this.props.openGps}
      shop={item}
      selected={this.props.selected}
      selectShop={this.props.selectShop}
    />
  )

  _keyExtractor = item => item.id
}

export default MapListComponent
