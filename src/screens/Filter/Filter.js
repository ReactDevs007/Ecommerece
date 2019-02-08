import * as React from 'react'
import { TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import * as R from 'ramda'
import { reduxForm, Field, change, reset } from 'redux-form'
import {
  getFilters,
  getProductsRequest,
  setProductsTotal,
  resetProducts,
  setSelectedFilters,
  resetSelectedFilters,
} from '../../redux/modules/catalog'
import Checkbox from '../../components/Checkbox'
import StyledInput from '../../components/StyledInput'
import { NAVIGATORS } from '../../constants'

const openFilter = require('../../../assets/img/openFilter.png')

const MainContainer = styled.View`
  flex: 1;

  background-color: #fff;
`

const ImageItem = styled.Image`
  width: 12px;
  height: 12px;

  transform: rotateZ(${({ visible }) => (visible ? '45deg' : '90deg')});
`

const WrapperCheckbox = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 10px;
`

const FilterItemContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const TitleFilterItemText = styled.Text`
  font-family: Montserrat;
  font-size: 16px;

  color: #000000;
`

const Wrapper = styled.View`
  padding: 33px 33px 0 33px;
`

const WrapperPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Separator = styled.View`
  height: 1px;
  margin: 26px 33px 5px 33px;

  background-color: #eaeaea;
`

const Button = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width};
  height: 48px;

  background-color: #01b1ec;
`

const ButtonText = styled.Text`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 13px;
  font-size: 12px;

  color: #ffffff;
  margin: auto;
`

const HeaderClearText = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 13px;

  color: #ffffff;

  opacity: 0.8;
`

class FilterItem extends React.Component {
  state = {
    visible: false,
  }

  render() {
    const { title, children } = this.props
    return (
      <React.Fragment>
        <Wrapper>
          <FilterItemContainer>
            <TitleFilterItemText>{title}</TitleFilterItemText>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() =>
                this.setState(({ visible }) => ({ visible: !visible }))
              }
            >
              <ImageItem visible={this.state.visible} source={openFilter} />
            </TouchableOpacity>
          </FilterItemContainer>
          {this.state.visible && children}
        </Wrapper>
        <Separator />
      </React.Fragment>
    )
  }
}

const clearSelected = () => change('fiter', 'selectedFilters', [])
const clearPriceFrom = () => change('filter', 'from', '')
const clearPriceTo = () => change('filter', 'to', '')

const HeaderClearComponent = R.compose(
  reduxForm({
    form: 'fiter',
  }),
  connect(
    undefined,
    { clearSelected, clearPriceFrom, clearPriceTo, resetSelectedFilters },
  ),
)(({ reset }) => (
  <TouchableOpacity
    onPress={() => {
      reset()
      resetSelectedFilters()
    }}
    style={{ marginRight: 12 }}
  >
    <HeaderClearText>Очистить</HeaderClearText>
  </TouchableOpacity>
))

class Filter extends React.Component {
  static navigationOptions = {
    headerRight: <HeaderClearComponent />,
  }

  render() {
    const { filters = [], handleSubmit } = this.props

    return (
      <MainContainer>
        <ScrollView>
          {filters.map(item => this._renderItem({ item, key: item.id }))}
        </ScrollView>
        <Button onPress={handleSubmit(this._submit)}>
          <ButtonText>ПОКАЗАТЬ</ButtonText>
        </Button>
      </MainContainer>
    )
  }

  _submit = ({ selectedFilters }) => {
    const {
      getProductsRequest,
      setProductsTotal,
      resetProducts,
      setSelectedFilters,
    } = this.props

    setProductsTotal(0)
    resetProducts()

    setSelectedFilters(selectedFilters)

    getProductsRequest(selectedFilters)
    this.props.navigation.navigate(NAVIGATORS.MAIN.FILTERED_PRODUCTS_LIST)
  }

  _renderItem = ({ item }) => {
    return (
      <Field name="selectedFilters" {...item} component={this._renderFilter} />
    )
  }

  _renderPrice = ({ input: { onChange, value }, ...rest }) => {
    return (
      <StyledInput
        style={{ width: '40%' }}
        onChangeText={onChange}
        value={value}
        keyboardType="phone-pad"
        {...rest}
      />
    )
  }

  _renderFilter = ({ params, title, input: { onChange, value } }) => {
    const countSelected = R.reduce(
      (val, e) => {
        if (R.contains(e.id, value)) {
          return val + 1
        }

        return val
      },
      0,
      params,
    )
    return (
      <FilterItem
        title={title + (!!countSelected ? ` (${countSelected})` : '')}
      >
        <WrapperCheckbox>
          {params.map(element => (
            <Checkbox
              style={{ width: '40%', margin: 9, marginLeft: 0 }}
              label={element.title}
              key={element.id}
              value={R.contains(element.id, value)}
              onChange={() => {
                const selected = R.contains(element.id, value)

                if (selected) {
                  onChange(R.without([element.id], value))
                } else {
                  onChange([...value, element.id])
                }
              }}
            />
          ))}
        </WrapperCheckbox>
      </FilterItem>
    )
  }
}

const mapStateToProps = R.applySpec({ filters: getFilters })

export default R.compose(
  reduxForm({
    form: 'fiter',
    destroyOnUnmount: false,
    initialValues: { selectedFilters: [] },
  }),
  connect(
    mapStateToProps,
    {
      getProductsRequest,
      setProductsTotal,
      resetProducts,
      setSelectedFilters,
      resetSelectedFilters,
    },
  ),
)(Filter)
