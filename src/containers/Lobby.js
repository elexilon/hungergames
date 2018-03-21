import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Row } from 'reactstrap'
import { fetchGames } from '../actions/game'
import GameCard from '../components/game/GameCard'
import { Button
} from 'reactstrap'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
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
        key={game._id}
        title={game.title}
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
        <Button className="NewGameButton" color="primary" onClick={this.newGame.bind(this)} >
          New Game
        </Button>
        <Row >
          { !games ? null : games.map((game) => this.renderGame(game)) }
        </Row>

        <ModalDialog
          isOpen={ modal }
          body={ <GameForm update={false} /> }
          title="New Game" />
      </Container>
    )
  }
}

const mapStateToProps = ({ games, currentUser, modal }) =>
({ games, currentUser, modal })

export default connect(mapStateToProps,
  { push, fetchGames, openModal })(Lobby)
