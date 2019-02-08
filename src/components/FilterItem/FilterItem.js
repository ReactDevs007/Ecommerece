import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import styles from './styles'

class FilterItem extends React.Component {
  static propTypes = {
    filterTitle: PropTypes.string.isRequired,
    filterOptions: PropTypes.array.isRequired,
    appliedFilters: PropTypes.array.isRequired,
    setFiltersToStore: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    customStyles: PropTypes.object,
  }

  state = {
    filterOpened: false,
    checkedFilters: [],
  }

  componentDidMount() {
    const { filterOptions, appliedFilters } = this.props
    this.applyInitialFilters(filterOptions, appliedFilters)
  }

  componentWillReceiveProps({ appliedFilters }) {
    const { filterOptions } = this.props
    this.applyInitialFilters(filterOptions, appliedFilters)
  }

  applyInitialFilters = (localOptions, appliedFilters) => {
    const filtered = localOptions.filter(filter =>
      appliedFilters.includes(filter.id),
    )
    let filtersToApply = []
    filtered.forEach(item => filtersToApply.push(item.id))
    this.setState({
      checkedFilters: filtersToApply,
    })
  }

  toggleFilter = () =>
    this.setState({
      filterOpened: !this.state.filterOpened,
    })

  onCheckBoxPress = filter => {
    const { checkedFilters } = this.state
    const { setFiltersToStore, removeFilter } = this.props

    if (checkedFilters.includes(filter.id)) {
      const indexToRemove = checkedFilters.indexOf(filter.id)
      const newState = checkedFilters
        .slice(0, indexToRemove)
        .concat(checkedFilters.slice(indexToRemove + 1))
      this.setState({
        checkedFilters: newState,
      })
      removeFilter(filter)
    } else {
      this.setState({
        checkedFilters: [...checkedFilters, filter.id],
      })
      setFiltersToStore(filter.id)
    }
  }

  isChecked = filter => {
    return this.state.checkedFilters.includes(filter.id)
  }

  render() {
    const { filterTitle, filterOptions } = this.props

    const buttonSource = this.state.filterOpened
      ? require('../../../assets/img/closeFilter.png')
      : require('../../../assets/img/openFilter.png')
    const selectedLength = this.state.checkedFilters.length
    return (
      <View>
        <View style={styles.filterBox}>
          <Text style={styles.filterTitle}>
            {selectedLength > 0
              ? `${filterTitle} (${selectedLength})`
              : filterTitle}
          </Text>
          <TouchableOpacity
            hitSlop={{ bottom: 10, top: 10, left: 10, right: 10 }}
            style={styles.touchableArea}
            onPress={this.toggleFilter}
          >
            <Image source={buttonSource} />
          </TouchableOpacity>
        </View>
        {this.state.filterOpened && (
          <View style={styles.flatlist}>
            <FlatList
              data={filterOptions}
              extraData={this.state}
              numColumns={2}
              columnWrapperStyle={styles.checkboxColumns}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={styles.checkboxWrapper}>
                  <CheckBox
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                    checkedIcon="check-square"
                    size={18}
                    checked={this.isChecked(item)}
                    onPress={() => this.onCheckBoxPress(item)}
                    title={item.title}
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    )
  }
}

export default FilterItem
