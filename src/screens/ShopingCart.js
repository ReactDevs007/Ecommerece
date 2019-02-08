import * as React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  Alert,
  TouchableOpacity,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import BackButton from '../components/BackButton'
import Tab from '../components/Tab'
import closeFilter from '../../assets/img/closeFilter.png'
import addIcon from '../../assets/img/openFilter.png'
import { NAVIGATORS } from '../constants'
import {
  getIsGettingOrder,
  getUserOrder,
  getOrderListRequest,
  getIsSendAction,
  addProductToOrderRequest,
  removeProductFromOrderRequest,
  clearRequest,
  getUserOrderCount,
} from '../redux/modules/order'
import { getProductRequest } from '../redux/modules/catalog'

const MainContainer = styled.FlatList`
  align-self: center;
  /* padding: 20px 27px 0 28px; */
  padding: 20px 0 0 0;
`

const ActionIcon = styled.Image``

const EmptyImage = styled.View`
  width: 48px;
  height: 48px;

  border-radius: 5px;

  background-color: #bdcfd5;
`

const TitleText = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;

  color: #ffffff;
`

const ClearText = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 13px;

  color: #ffffff;

  opacity: 0.8;
`

const Button = styled.TouchableOpacity`
  margin-right: 12px;
`

const GoodContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const GoodText = styled.Text`
  font-family: Montserrat;
  line-height: 14px;
  font-size: 13px;

  color: #000000;
`

const PriceText = styled.Text`
  font-family: Montserrat;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #000000;
`

const OldPriceText = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  line-height: 13px;
  font-size: 12px;
  text-decoration-line: line-through;

  color: #c4c4c4;

  margin-left: 10px;
`

const Separator = styled.View`
  margin-top: 21px;

  width: 100%;
  height: 1px;

  background-color: #bdcfd5;
`

const Good = ({
  title,
  discount: price,
  price: oldPrice,
  action,
  onActionPress,
  onItemPress,
}) => (
  <View onPress={onItemPress} style={{ margin: 10, flex: 1, height: 68 }}>
    <GoodContainer onPress={onItemPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <EmptyImage />
          <View style={{ marginLeft: 14, width: '70%' }}>
            <GoodText numberOfLines={1}>{title}</GoodText>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <PriceText>{price || oldPrice}</PriceText>
              {price && (
                <OldPriceText
                  style={{
                    fontWeight: 'normal',
                    color: '#C4C4C4',
                  }}
                >
                  {oldPrice}
                </OldPriceText>
              )}
            </View>
          </View>
        </View>
        <Button onPress={onActionPress}>
          <ActionIcon
            style={{ tintColor: action ? '#01B1EC' : undefined }}
            source={action ? addIcon : closeFilter}
          />
        </Button>
      </View>
    </GoodContainer>
    <Separator />
  </View>
)

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 48px;

  background: ${({ disabled }) => (disabled ? '#C4C4C4' : '#01b1ec')};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  position: absolute;
  bottom: 0;
`

const ButtonText = styled.Text`
  margin: auto;

  font-family: Montserrat;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #ffffff;
`

const Preloader = styled.ActivityIndicator`
  margin: auto;
`

const ButtonOrder = ({ title, onPress, isLoading, disabled }) => (
  <ButtonContainer disabled={isLoading || disabled} onPress={onPress}>
    {isLoading ? <Preloader /> : <ButtonText>{title}</ButtonText>}
  </ButtonContainer>
)

const HeaderTitle = ({ value }) => <TitleText>{`Корзина (${value})`}</TitleText>

const HeaderClear = ({ onPress = () => {}, isLoading }) => (
  <Button
    onPress={() => {
      onPress &&
        Alert.alert('Подтверждение', 'Вы уверены?', [
          { onPress, style: 'cancel', text: 'Да' },
          { text: 'Нет' },
        ])
    }}
  >
    {isLoading ? <ActivityIndicator /> : <ClearText>Очистить</ClearText>}
  </Button>
)

//TODO: move to components
const mapStateToProps = R.applySpec({ value: getUserOrderCount })
const HeaderTitleContainer = connect(mapStateToProps)(HeaderTitle)
const HeaderClearContainer = connect(
  R.applySpec({ isLoading: getIsSendAction }),
  { onPress: clearRequest },
)(HeaderClear)

const WidjetContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`

const WidjetTitleTextContainer = styled.View`
  flex-direction: row;
`

const WidjetTitleText = styled.Text`
  font-family: Montserrat;
  line-height: 18px;
  font-size: 16px;

  color: #000000;
`

class ShopingCart extends React.Component {
  static navigationOptions = {
    headerLeft: <BackButton />,
    headerTitle: <HeaderTitleContainer />,
    headerRight: <HeaderClearContainer />,
  }
  state = {
    selectedTab: 0,
  }
  render() {
    const {
      isLoading,
      data: { goods: pruducts, additionals: offers },
      getOrderListRequest,
      isSendAction,
    } = this.props

    return (
      <React.Fragment>
        <MainContainer
          keyExtractor={x => x.key || x.id}
          data={[
            ...R.filter(x => !!x.key, pruducts),
            { id: 'widjet', widjet: true },
            ...R.pipe(
              R.ifElse(
                R.equals(1),
                R.pipe(
                  R.always(offers),
                  R.filter(x => x.type === 'postcard'),
                ),
                R.always(offers),
              ),
              R.map(R.assoc('action', true)),
            )(this.state.selectedTab),
          ]}
          renderItem={this._renderItem}
          contentContainerStyle={{ paddingBottom: 60 }}
          refreshing={isLoading}
          onRefresh={getOrderListRequest}
          extraData={R.pipe(
            R.filter(x => !!x.key),
            R.length,
          )(pruducts)}
        />
        <ButtonOrder
          isLoading={isSendAction}
          onPress={() => {
            Alert.alert('Подтверждение', 'Вы уверены?', [
              {
                text: 'Да',
                onPress: () =>
                  this.props.navigation.navigate(NAVIGATORS.MAIN.ORDER),
              },
              { text: 'Нет' },
            ])
          }}
          title="ОФОРМИТЬ ЗАКАЗ"
        />
      </React.Fragment>
    )
  }

  _changeTab = index => {
    this.setState({ selectedTab: index })
  }

  _renderItem = ({ item }) => {
    if (item.widjet) {
      return this._widjetGenerator()
    }

    const {
      addProductToOrderRequest,
      removeProductFromOrderRequest,
      getProductRequest,
    } = this.props

    return (
      <Good
        {...item}
        onItemPress={() => getProductRequest(item.id)}
        onActionPress={() =>
          Alert.alert('Подтверждение', 'Вы уверены?', [
            {
              text: 'Да',
              onPress: () => {
                item.action
                  ? addProductToOrderRequest(item.id)
                  : removeProductFromOrderRequest(item.key)
              },
            },
            {
              text: 'Нет',
            },
          ])
        }
      />
    )
  }

  _widjetGenerator = () => {
    const {
      data: { totalPrice: orderSum },
    } = this.props

    return (
      <WidjetContainer>
        <WidjetTitleTextContainer>
          <WidjetTitleText>Сумма заказа: </WidjetTitleText>
          <WidjetTitleText style={{ fontWeight: 'bold' }}>
            {orderSum} ₽
          </WidjetTitleText>
        </WidjetTitleTextContainer>
        <Separator
          style={{ marginTop: 36, width: Dimensions.get('window').width }}
        />
        <Tab
          title={'Дополнительные товары'}
          onChangeItem={this._changeTab}
          selected={this.state.selectedTab}
          items={['Все', 'Открытки']}
          style={{ marginTop: 30 }}
        />
      </WidjetContainer>
    )
  }
}

export default connect(
  R.applySpec({
    isLoading: getIsGettingOrder,
    data: getUserOrder,
    isSendAction: getIsSendAction,
  }),
  {
    getOrderListRequest,
    addProductToOrderRequest,
    removeProductFromOrderRequest,
    getProductRequest,
  },
)(ShopingCart)
