import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FlatList, View } from 'react-native'

import CatalogCategory from '../components/CatalogCategory'
import styled from 'styled-components/native'
import {
  getCatalogRequest,
  getIsLoadingCatalog,
  getIsLoadingProducts,
  selectProduct,
  getProductRequest,
  setSelectedFilters,
  resetSelectedFilters,
  getLoadedCatalog,
} from '../redux/modules/catalog'
import CartWidjet from '../components/CartWidjet'

class Catalog extends React.Component {
  static navigationOptions = {
    title: 'Categoryb: Каталог',
  }

  static propTypes = {
    catalog: PropTypes.array,
    getData: PropTypes.func,
  }

  componentDidMount() {
    this.props.getCatalogRequest()
  }

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '90%',
        backgroundColor: '#E5E5E5',
        marginLeft: '5%',
      }}
    />
  )

  keyExtractor = item => item.id.toString()

  renderCategory = ({ item }) => {
    return (
      item.products && (
        <CatalogCategory
          {...item}
          selectProduct={this.props.selectProduct}
          getProductRequest={getProductRequest}
        />
      )
    )
  }

  render() {
    const {
      catalog,
      isLoadingCatalog,
      isLoadingProducts,
      getCatalogRequest,
    } = this.props
    console.log("cata start");
    console.log(catalog);
    let value1 = 33;
    console.log("start",value1);
    console.log("this catalog start");
    console.log(this.renderCategory);
    //console.debug("start",value1);
    return (

      <React.Fragment>
        <FlatList
          contentContainerStyle={{ paddingBottom: 48 }}
          style={{ backgroundColor: 'white' }}
          data={catalog}//this.catalog}
          ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator={false}
          //renderItem={<View>aaa</View>}//</Text>this.renderCategory}
          renderItem={this.renderCategory}
          keyExtractor={this.keyExtractor}
          refreshing={isLoadingCatalog || isLoadingProducts}
          onRefresh={getCatalogRequest}
        />
        <CartWidjet />
      </React.Fragment>
    )
  }
}

const mapStateToProps = R.applySpec({
  catalog: getLoadedCatalog,
  isLoadingCatalog: getIsLoadingCatalog,
  isLoadingProducts: getIsLoadingProducts,
})

const mapDispatchToProps = {
  getCatalogRequest,
  selectProduct,
  getProductRequest,
  setSelectedFilters,
  resetSelectedFilters,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Catalog)
