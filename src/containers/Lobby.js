import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Row } from 'reactstrap'
import fetchGames from '../actions/game/fetch'
import GameCard from '../components/game/GameCard'
import { Authenticated } from '../actions/user/sign-in'
import { Button
} from 'reactstrap'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'

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

  newGame = (event) => {
    this.props.openModal()
  }

  renderGame = (game) => {
    return (
      <GameCard
        playerNumber={ game.players.length }
        starts={ game.starts_at }
        ends={ game.ends_at }
        picUrl={ game.picUrl }
        id={ game._id }
      />
    )
  }

  render() {
    const { games, modal } = this.props
    return (
      <Container className="Lobby">
        <Title content={"Your Games!"} />
          <Button color="primary" onClick={this.newGame.bind(this)} >
            New Game
          </Button>
        <Row>
          { !games ? null : games.map(game => this.renderGame(game)) }
        </Row>

        <ModalDialog isOpen={ modal } body={ <GameForm /> } title="New Game" />
      </Container>
    )
  }
}

const mapStateToProps = ({ games, currentUser, modal }) =>
({ games, currentUser, modal })

export default connect(mapStateToProps,
  { Authenticated, push, fetchGames, openModal })(Lobby)
