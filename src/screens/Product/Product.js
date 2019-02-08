import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { View, Text, Alert, RefreshControl } from 'react-native'
import {
  getSelectedProduct,
  getIsLoadingProduct,
  getProductRequest,
} from '../../redux/modules/catalog'
import Button from '../../components/MainButton'
import BackButton from '../../components/BackButton'
import {
  getIsSendAction,
  addProductToOrderRequest,
} from '../../redux/modules/order'
import Image from 'react-native-image-progress'

const priceNormiliser = price => price.toString().split('.')[0] + '₽'

const descriptionNormiliser = val => val.toString().split('.')[0]

const EmptyImage = styled.View`
  width: 100%;
  height: 375px;
  background-color: blue;
`

const MainContainer = styled.ScrollView`
  flex: 1;

  background-color: #fff;
`

const ContentContainer = styled.View`
  padding: 0 37px;
`

const ContentImage = styled(Image)`
  width: 100%;
  height: 375px;
`

const TitleText = styled.Text`
  font-family: Montserrat;
  font-weight: 600;
  line-height: 18px;
  font-size: 16px;

  color: #000000;

  margin-top: 37px;
`

const ExtraText = styled.Text`
  font-family: Montserrat;
  font-weight: normal;
  font-size: 12px;

  color: #787878;
`

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const Wrapper = styled.View``

const CurrentPriceText = styled.Text`
  font-family: Montserrat;
  font-weight: bold;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

const OldPriceText = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  font-size: 14px;
  text-decoration-line: line-through;

  color: #c4c4c4;

  margin-left: 10px;
`

const StockText = styled.Text`
  font-family: Montserrat;
  line-height: 13px;
  font-size: 12px;

  color: ${({ inStock }) => (inStock ? '#85e483' : 'red')};
`

const BuyInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 20px;
`

const DescriptionText = styled.Text`
  font-family: Montserrat;
  line-height: 18px;
  font-size: 12px;

  color: #000000;

  margin-top: 20px;
`

const Separator = styled.View`
  margin: 22.5px 0;

  width: 100%;
  height: 1px;
  background-color: #eaeaea;
`

class Product extends React.Component {
  static navigationOptions = {
    headerLeft: <BackButton />,
    drawerLabel: () => null,
  }

  dottedLine = () => '.'.repeat(300)

  renderCompositionItem = ({ title, quantity }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'baseline',
        padding: 0,
      }}
    >
      <View>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>{title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: '#BDCFD5', fontSize: 12 }}>
          {this.dottedLine()}
        </Text>
      </View>
      <View>
        <Text
          style={{ fontFamily: 'Montserrat', fontSize: 12 }}
        >{`${quantity} шт.`}</Text>
      </View>
    </View>
  )

  render() {
    const {
      product: {
        id,
        title,
        description,
        price,
        discount,
        inStock = false,
        image,
        width = 0,
        height = 0,
        params,
        extra,
      },
      isLoading,
      isSendAction,
      getProductRequest,
    } = this.props

    return (
      <MainContainer
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getProductRequest(id)}
          />
        }
      >
        {!isLoading && (
          <React.Fragment>
            {image ? <ContentImage source={{ uri: image }} /> : <EmptyImage />}
            <ContentContainer>
              {!!title && <TitleText>{title}</TitleText>}
              <ExtraText>{extra}</ExtraText>
              <BuyInfoContainer>
                <Wrapper style={{ alignSelf: 'center' }}>
                  <PriceContainer>
                    <CurrentPriceText>
                      {!!discount
                        ? priceNormiliser(discount)
                        : priceNormiliser(price)}
                    </CurrentPriceText>
                    {!!discount && (
                      <OldPriceText>{priceNormiliser(price)}</OldPriceText>
                    )}
                  </PriceContainer>
                  <StockText inStock={inStock}>
                    {inStock ? 'Есть в наличии' : 'Нет в наличии'}
                  </StockText>
                </Wrapper>
                <Button
                  isLoading={isSendAction}
                  disabledBackgroundColor="#C4C4C4"
                  text="Купить"
                  backgroundColor="#01B1EC"
                  onPress={this._buyProduct}
                  style={{ width: 130, height: 40 }}
                />
              </BuyInfoContainer>
              {!!description && (
                <DescriptionText>{description}</DescriptionText>
              )}
            </ContentContainer>
            <Separator />
            <ContentContainer>
              {params.map(({ title, data: quantity }, index) =>
                this.renderCompositionItem({ title, quantity, key: index }),
              )}
            </ContentContainer>
          </React.Fragment>
        )}
      </MainContainer>
    )
  }

  _buyProduct = () => {
    const {
      product: { inStock, id },
      addProductToOrderRequest,
    } = this.props
    inStock
      ? Alert.alert(' Подтверждение', 'Добавить товар в корзину?', [
          { text: 'Да', onPress: () => addProductToOrderRequest(id) },
          { text: 'Нет' },
        ])
      : Alert.alert('Предпреждение', 'Товара нет в наличии')
  }
}

const mapStateToProps = R.applySpec({
  isLoading: getIsLoadingProduct,
  product: getSelectedProduct,
  isSendAction: getIsSendAction,
})

export default connect(
  mapStateToProps,
  { addProductToOrderRequest, getProductRequest },
)(Product)
