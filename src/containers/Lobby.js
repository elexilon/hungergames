import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'

import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    // this.props.fetchGames()
    this.props.subscribeToWebsocket()
  }

  goToGame = gameId => event => this.props.push(`/play/${gameId}`)

  isPlayer(game) {
    if (!this.props.currentUser) { return false }
    return game.players.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  renderGame = (game, index) => {

    // if (!game.players[0].name) { this.props.fetchPlayers(game) }
    // const title = game.players.map(p => (p.name || null))
    //   .filter(n => !!n)
    //   .join(' vs ')
    //
    // return (
    //   <MenuItem
    //     key={index}
    //     onClick={this.goToGame(game._id)}
    //     rightIcon={<ActionIcon />}
    //     primaryText={title} />
    // )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentUser }) => ({ games, currentUser })

export default connect(mapStateToProps, { subscribeToWebsocket, push })(Lobby)
