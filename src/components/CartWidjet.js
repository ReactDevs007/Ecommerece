import * as React from 'react'
import * as R from 'ramda'
import { getFormValues } from 'redux-form'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import basketIcon from '../../assets/img/basket.png'
import {
  getUserOrder,
  getIsGettingOrder,
  getIsSendAction,
} from '../redux/modules/order'
import { NAVIGATORS } from '../constants'
import filterButtonIcon from '../../assets/img/filterBtn.png'
import { View } from 'react-native'

const nameNormiliser = digit => {
  const digitStr = digit.toString()
  const lastSymbol = R.last(digitStr)

  switch (lastSymbol) {
    case '1':
      return digitStr + ' элемент'
    case '2':
    case '3':
    case '4':
      return digitStr + ' элемента'
    default:
      return digitStr + ' элементов'
  }
}

const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const FilterIcon = styled.Image.attrs({ source: filterButtonIcon })`
  margin-left: 14px;
`

const FilterText = styled.Text`
  margin-left: 12px;

  font-family: Montserrat;
  font-weight: bold;
  line-height: 12px;
  font-size: 11px;

  color: #ffffff;
`

const ShopIcon = styled.Image.attrs({ source: basketIcon })`
  width: 24px;
  height: 18px;
`

const ShopingCartContainer = styled.View`
  width: 100%;
  height: 48px;

  flex-direction: row;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`

const FilterButton = styled.TouchableOpacity`
  align-self: center;

  width: 150px;
  height: 35px;

  background: #01b1ec;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  margin-bottom: 10px;
`

const ToOrderText = styled.Text`
  font-family: Montserrat;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #01b1ec;
`

const BasketView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const Button = styled.TouchableOpacity``

const FilterContainer = styled.View``

const DescriptionContainer = styled.View`
  margin-left: 10px;
  flex-direction: row;
`

const DescriptionText = styled.Text`
  font-family: Montserrat;
  line-height: 14px;
  font-size: 13px;

  color: #000000;
`

const CartWidjet = ({
  navigation,
  order: { ordersCount = 0, totalPrice = 0 } = {},
  isLoading,
  isAction,
  withFilterWidjet,
  filtersCount,
}) =>
  !!ordersCount &&
  !isLoading &&
  !isAction && (
    <Container>
      {withFilterWidjet && !!filtersCount && (
        <FilterButton
          onPress={() => navigation.navigate(NAVIGATORS.MAIN.FILTER)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <FilterIcon />
            <FilterText>{nameNormiliser(filtersCount)}</FilterText>
          </View>
        </FilterButton>
      )}
      <ShopingCartContainer>
        <BasketView>
          <Button
            onPress={() => {
              navigation.navigate(NAVIGATORS.MAIN.SHOPING_CART)
            }}
            style={{ marginLeft: 20 }}
          >
            <ShopIcon />
          </Button>

          <DescriptionContainer>
            <DescriptionText>{ordersCount} товара на</DescriptionText>
            <DescriptionText style={{ fontWeight: 'bold' }}>
              {' '}
              {`${totalPrice}`} ₽
            </DescriptionText>
          </DescriptionContainer>
        </BasketView>

        <Button
          onPress={() => navigation.navigate(NAVIGATORS.MAIN.ORDER)}
          style={{ marginRight: 20 }}
        >
          <ToOrderText>Оформить</ToOrderText>
        </Button>
      </ShopingCartContainer>
    </Container>
  )

const mapStateToProps = R.applySpec({
  order: getUserOrder,
  isLoading: getIsGettingOrder,
  isAction: getIsSendAction,
  filtersCount: R.pipe(
    getFormValues('fiter'),
    R.prop('selectedFilters'),
    R.length,
  ),
})

export default R.compose(
  connect(mapStateToProps),
  withNavigation,
)(CartWidjet)
