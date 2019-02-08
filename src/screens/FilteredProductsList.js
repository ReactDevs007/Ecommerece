import * as React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  getIsLoadingProducts,
  getLoadedProducts,
  productsLength,
  canLoadNext,
  getProductsRequest,
  getProductRequest,
} from '../redux/modules/catalog'
import styled from 'styled-components/native'
import CartWidjet from '../components/CartWidjet'

const filterButtonSouce = require('../../assets/img/filterBtn.png')

const FilterImage = styled.Image`
  width: 100%;
  height: 164px;
`

const TextFilter = styled.Text`
  font-family: Montserrat;
  font-weight: bold;
  line-height: 12px;
  font-size: 11px;

  color: #ffffff;

  margin-top: 12px;
`

const priceNormiliser = price => price.toString().split('.')[0] + '₽'

const descriptionNormiliser = val => val.toString().split('.')[0]

const ProductsList = styled.FlatList`
  padding: 0 12px;
`

const HeaderContainer = styled.View`
  margin-top: 30px;
`

const HeaderTitleText = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

const HeaderExtraText = styled.Text`
  margin-top: 4px;

  font-family: Montserrat;
  line-height: 11px;
  font-size: 10px;

  color: #787878;
`

const Preloader = styled.ActivityIndicator`
  margin: auto;
`

const ProductContainer = styled.TouchableOpacity`
  width: 45%;

  margin-top: 16px;
`

const ProductTitle = styled.Text`
  font-family: Montserrat;
  line-height: 14px;
  font-size: 13px;

  color: #000000;

  margin-top: 11px;
`

const CostWrapper = styled.View`
  flex-direction: row;
  margin-top: 11px;
`

const ProductCost = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #000000;
`

const ProductCostOld = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  line-height: 13px;
  font-size: 12px;
  text-decoration-line: line-through;

  color: #c4c4c4;

  margin-left: 10px;
`

const EmptyImage = styled.View`
  width: 100%;
  height: 164px;

  background-color: blue;
`

const FilterButton = styled.TouchableOpacity`
  margin-bottom: 10px;

  width: 150px;
  height: 35px;

  background: #01b1ec;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  flex-direction: row;
  align-items: center;
  align-content: center;
`

class FilteredProductsList extends React.Component {
  render() {
    const { isLoading, products, canLoadNext, getProductsRequest } = this.props
    return (
      <React.Fragment>
        <ProductsList
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={isLoading && Preloader}
          data={products}
          numColumns={2}
          keyExtractor={R.prop('id')}
          renderItem={this._renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          onEndReached={canLoadNext && getProductsRequest}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
        <CartWidjet withFilterWidjet={true} />
      </React.Fragment>
    )
  }

  _renderHeader = () => {
    const { total } = this.props
    return (
      <HeaderContainer>
        <HeaderTitleText>Результаты подбора</HeaderTitleText>
        <HeaderExtraText>{total} товаров</HeaderExtraText>
      </HeaderContainer>
    )
  }

  _renderItem = ({ item: { title, price, discount, id, image } }) => {
    const { getProductRequest } = this.props
    return (
      <ProductContainer onPress={() => getProductRequest(id)}>
        {image ? <FilterImage source={{ uri: image }} /> : <EmptyImage />}
        <ProductTitle>{title}</ProductTitle>
        <CostWrapper>
          <ProductCost>{!!discount ? discount : price}</ProductCost>
          {!!discount && <ProductCostOld>{price}</ProductCostOld>}
        </CostWrapper>
      </ProductContainer>
    )
  }
}

const mapStateToProps = R.applySpec({
  isLoading: getIsLoadingProducts,
  products: getLoadedProducts,
  total: productsLength,
  canLoadNext,
})

export default connect(
  mapStateToProps,
  { getProductsRequest, getProductRequest },
)(FilteredProductsList)
