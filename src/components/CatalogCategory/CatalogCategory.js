import React from 'react'
import { withNavigation } from 'react-navigation'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import {
  getProductRequest,
  setProductsTotal,
  resetProducts,
  getProductsRequest,
  setSelectedFilters,
  resetSelectedFilters,
} from '../../redux/modules/catalog'
import { NAVIGATORS } from '../../constants'

import styles from './styles'
import CatalogItem from '../CatalogItem'


const CatalogCategory = ({
  title: category,
  description: subTitle,
  filters,
  products,
  getProductRequest,
  navigation,
  setProductsTotal,
  resetProducts,
  getProductsRequest,
}) => (

  <TouchableOpacity style={styles.container}>
    <TouchableOpacity
      onPress={() => {
        setProductsTotal(0)
        resetProducts()
        setSelectedFilters(filters)
        getProductsRequest()
        navigation.navigate(NAVIGATORS.MAIN.FILTERED_PRODUCTS_LIST)
      }}
    >
    {<Text style={styles.subTitle}>{subTitle}</Text>}
    {<Text style={styles.title}>{category}</Text>}
    </TouchableOpacity>
    { <ScrollView showsHorizontalScrollIndicator={false} horizontal>
    {products
      ? products.map(product => (
          <CatalogItem
            {...product}
            key={product.id}
            onPress={() => {
              getProductRequest(product.id)
            }}
          />
        ))
      : null}
    </ScrollView> }

  </TouchableOpacity>
)

export default R.compose(
  withNavigation,
  connect(
    undefined,
    {
      getProductRequest,
      setProductsTotal,
      resetProducts,
      getProductsRequest,
      setSelectedFilters,
      resetSelectedFilters,
    },
  ),
)(CatalogCategory)
