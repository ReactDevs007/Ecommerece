import React from 'react'
import { RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import PageTitle from '../components/PageTitle'
import BonusCount from '../components/BonusCount'
import Separator from '../components/Separator'
import Button from '../components/Button'
import EmptyButton from '../components/EmptyButton'
import { NAVIGATORS } from '../constants'
import {
  getBonuses,
  getBonusesLoading,
  getBonusesRequest,
} from '../redux/modules/bonuses'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

const ScrollContainer = styled.ScrollView`
  padding-top: 29px;
`

class Bonuses extends React.Component {
  static navigationOptions = {
    title: 'Мои бонусы',
  }

  onMoreClick = () => {
    const { navigation } = this.props
    navigation.navigate(NAVIGATORS.MAIN.MAIN)
  }

  onSpendClick = () => {
    const { navigation } = this.props
    navigation.navigate(NAVIGATORS.MAIN.WRITE_BONUSES)
  }

  render() {
    const { bonuses, isLoading, getBonusesRequest } = this.props

    return (
      <Container>
        <ScrollContainer
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getBonusesRequest}
            />
          }
        >
          <React.Fragment>
            <PageTitle>На вашем счете:</PageTitle>
            <BonusCount count={bonuses} />
            <Separator />
            <EmptyButton
              keyField="get-more"
              active
              onPress={this.onMoreClick}
              title="Получить еще"
            />
            <Button
              keyField="spend"
              active
              onPress={this.onSpendClick}
              customStyles={{
                marginTop: 15,
              }}
              title="Потратить"
            />
          </React.Fragment>
        </ScrollContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  bonuses: getBonuses(state),
  isLoading: getBonusesLoading(state),
})

const mapDispatchToProps = {
  getBonusesRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bonuses)
