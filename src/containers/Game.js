import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Button } from 'reactstrap'
import fetchOneGame from '../actions/game/fetch'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'

class Game extends PureComponent {
  componentWillMount() {
    this.props.fetchOneGame()
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

  render() {
    const { game, showEdit, modal } = this.props
    console.log(game);
    if(!game) return null
    return (
      <Container className="Lobby">
        <Title content={game.title} />
          { showEdit ?
            <Button color="primary" onClick={this.newGame.bind(this)} >
              Edit
            </Button> : null
          }


        <ModalDialog isOpen={ modal } body={ <GameForm /> } title="New Game" />
      </Container>
    )
  }
}

const mapStateToProps = ({ games, currentUser, modal }, { match }) => {
const game = games.filter(game => game._id === match.params.gameId )
const showEdit = games.userId === currentUser._id
return (
  {
    game,
    currentUser,
    modal,
    showEdit
  })
}

export default connect(mapStateToProps,
  { push, fetchOneGame, openModal })(Game)
