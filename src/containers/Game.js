import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Button, Row, FormText, Label, Col, FormGroup  } from 'reactstrap'
import { fetchOneGame } from '../actions/game'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class Game extends PureComponent {
  componentWillMount() {
    this.props.fetchOneGame(this.props.match.params.gameId)
  }

  state = {
    date: null
  }

  goToGame = gameId => event => this.props.push(`/play/${gameId}`)

  isPlayer(game) {
    if (!this.props.currentUser) { return false }
    return game.players.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  editGame = (event) => {
    this.props.openModal()
  }

  handleChangeDate(date) {
    this.setState({
        date: date
    })
  }

  isWeekEnd = date => {
    const day = date.day()
    return day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5
};

  render() {
    const { game, showEdit, modal } = this.props
    if(!game) return null

    return (
      <Container className="Lobby">
        <Title content={game.title} />
        { showEdit ?
          <Button className="NewGameButton" color="primary" onClick={this.editGame.bind(this)} >
            Edit
          </Button> : null
        }
        <Row>

        </Row>
          <img style={{ width: 300, height: 300}} src={game.picUrl} className="img-fluid img-thumbnail" alt={game.title} />
        <Row>



          <FormGroup row>
            <Label for="ends_at" sm={4}>Date</Label>
            <Col sm={8}>
              <DatePicker
                  selected={this.state.date}
                  onChange={this.handleChangeDate.bind(this)}
                  dateFormat="DD/MM/YYYY"
                  minDate={moment(game.starts_at)}
                  maxDate={moment(game.ends_at)}
                  filterDate={this.isWeekEnd}
              />
              <FormText>{this.state.endsAtError}</FormText>
            </Col>
          </FormGroup>
        </Row>
        <ModalDialog
          isOpen={ modal }
          body={ <GameForm
            game={game}
            /> }
          title="New Game" />
      </Container>
    )
  }
}

const mapStateToProps = ({ games, currentUser, modal }, { match }) => {
const game = games.filter(game => game._id === match.params.gameId )[0]
const showEdit = !!game && game.userId === currentUser._id
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
