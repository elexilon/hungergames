import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Row } from 'reactstrap'
import fetchGames from '../actions/game/fetch'
import GameCard from '../components/game/GameCard'
import { Authenticated } from '../actions/user/sign-in'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.Authenticated()
    this.props.fetchGames()
  }

  goToGame = gameId => event => this.props.push(`/play/${gameId}`)

  isPlayer(game) {
    if (!this.props.currentUser) { return false }
    return game.players.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  renderGame = (game) => {
    return (
      <GameCard
        playerNumber={ game.players.length }
        starts={ game.starts_at }
        ends={ game.ends_at }
        urlPic={ game.urlPic }
        id={ game._id }
      />
    )
  }

  render() {
    const { games } = this.props
    return (
      <Container className="Lobby">
        <Title content={"Your Games!"} />
        <Row>
          { !games ? null : games.map(game => this.renderGame(games)) }
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ games, currentUser }) => ({ games, currentUser })

export default connect(mapStateToProps, { Authenticated, push, fetchGames })(Lobby)
