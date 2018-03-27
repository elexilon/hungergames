import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Button, Row, FormText, Label, FormGroup, 
  FormFeedback, Input, Form  } from 'reactstrap'
import { fetchOneGame } from '../actions/game'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import validate from 'validate.js'

class Game extends PureComponent {
  componentWillMount() {
    this.props.fetchOneGame(this.props.match.params.gameId)
  }

  state = {
    date: null,
    weight: ""
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll(this.state.weight, this.state.date)) {

    }
  }

  validateAll(weight, date) {
    return this.validateWeigt(weight) &&
      this.validateDate(date)
  }

  validateWeigt(weight) {
    const validationMsg = validate.single(weight, {
      presence: true,
      numericality: true
    })
    if (!!validationMsg) {
      this.setState({
        weightError: validationMsg
      })
      return false
    }

    if (validate.isNumber(weight)) {
      this.setState({
        weightError: "Must be a number"
      })
      return false
    }

    this.setState({
      weightError: null
    })
    return true
  }

  validateDate(date) {
    const validationMsg = validate.single(date, {
      presence: true
    })

    if (!!validationMsg) {
      this.setState({
        dateError: validationMsg
      })
      return false
    }

    if (!validate.isDate(new Date(date))) {
      this.setState({
        dateError: "Must be a valid date"
      })
      return false
    }

    this.setState({
      dateError: null
    })
    return true
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
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { game, showEdit, modal } = this.props
    if(!game) return null

    return (
      <Container  >
        <Title content={game.title} />
        { showEdit ?
          <Button className="NewGameButton" color="primary" onClick={this.editGame.bind(this)} >
            Edit
          </Button> : null
        }
        <Row>

        </Row>

          <img style={{ height: 300, marginBottom: 30 }} src={game.picUrl} className="img-fluid img-thumbnail" alt={game.title} />      

          
          <Form inline onSubmit={this.submitForm.bind(this)}>
            <Row>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Weight" className="mr-sm-2">Weight</Label>
                <Input
                  name="weight"
                  id="weight"
                  placeholder="Weight"
                  onChange={this.handleChange("weight").bind(this)}
                  value={this.state.weight}
                  />
                <FormText>{this.state.weightError}</FormText>
              </FormGroup>

              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="date" className="mr-sm-2" >Date</Label>
                <DatePicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.handleChangeDate.bind(this)}
                  dateFormat="DD/MM/YYYY"
                  minDate={moment(game.starts_at)}
                  maxDate={moment(game.ends_at)}
                  filterDate={this.isWeekEnd}
                />
                <FormText>{this.state.dateError}</FormText>
              </FormGroup>

              <Button type="submit" color="success" >Send</Button>
            </Row>
          </Form>
        
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
