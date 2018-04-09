import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../components/ui/Title'
import { Container, Button, Row, FormText, Label, FormGroup, 
  Input, Form, Popover, PopoverBody, ListGroupItem, ListGroup,
  Card, CardText, Table   } from 'reactstrap'
import { fetchOneGame, updateWeight } from '../actions/game'
import { openModal } from '../actions/modal'
import { GameForm } from '../containers'
import ModalDialog from '../components/ui/ModalDialog'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import validate from 'validate.js'


function getFilterDates(game) {
  return game.weights
    .map(weight => weight.date)
    .filter((date, index, self) => {
      return self.indexOf(date) === index;
    })
    .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());
}


class Game extends PureComponent {
  componentWillMount() {
    this.props.fetchOneGame(this.props.match.params.gameId)
  }

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      weight: ""
    }
  }

  submitForm(event) {
    event.preventDefault()
    const { updateWeight, game, currentUser } = this.props
    const { weight, date } = this.state
    if (this.validateAll(weight, date)) {
      const newWeight = { 
        userId: currentUser._id,
        weight: Number(weight),
        date: new Date(date)
       }
      updateWeight(newWeight, game._id)
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
    return day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 0
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  toggle = name => event => {
    this.setState({
      [name]: !this.state[name]
    });
  }

  renderDate(date, index) {
    const popo = "popo"
    const weights = this.props.game.weights
      .filter(weight => weight.date === date)
      .map(weight => {
        const startWeight = this.props.game.weights.filter((wei) =>
          wei.userId.toString() === weight.userId.toString())
          .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())[0].weight

        const diffWeight = weight.weight - startWeight
        return { ...weight, diffWeight }
      })
      .sort((a, b) => a.diffWeight - b.diffWeight)

    return (
      <div style={{ marginTop: 20 }} key={popo + index}>
        <ListGroupItem 
          style={{ color: "white", textAlign: "center", backgroundColor: "#ff6600", cursor: "pointer"}} 
          id={popo + index} 
          onClick={this.toggle(popo + index).bind(this)
        }>
          <b>{moment(date).format("DD/MM/YYYY")}</b>
        </ListGroupItem>

        <Popover placement="bottom" isOpen={this.state[popo + index]} target={popo + index} toggle={this.toggle(popo + index).bind(this)}>
          <PopoverBody>
            <Table dark striped size="sm" responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody>
                {weights.map(weight => this.renderWeight(weight))}
              </tbody>
            </Table>
          </PopoverBody>
        </Popover>

      </div>
    )
  }

  renderWeight(weight, index)
  {
    return (
        <tr key={weight.userId}>
          <th>{weight.userId}</th>
          <th>{weight.weight}</th>
          <th>{weight.diffWeight}</th>
        </tr>
    )
  }

  render() {
    const { game, showEdit, modal } = this.props
    if(!game) return null

    const dates = getFilterDates(game)

    return (
      <Container  >
        <Title content={game.title} />
        { showEdit ?
          <Button className="NewGameButton" color="primary" onClick={this.editGame.bind(this)} >
            Edit
          </Button> : null
        }

        <Row style={{ marginBottom: 30 }}>
          <div className="col-12 col-md-6" >
            <img src={game.picUrl} className="img-fluid img-thumbnail" alt={game.title} />
          </div>
          <div className="col-12 col-md-6" >
            <Card body>
              <CardText>{game.description}</CardText>
            </Card>
          </div>
        </Row> 

          <Form inline onSubmit={this.submitForm.bind(this)}>
            
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
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Button className="mr-sm-2" type="submit" color="success" >Send</Button>
            </FormGroup>
          </Form>

        <ListGroup>
          { dates.map((date, index) => this.renderDate(date, index)) }
        </ListGroup>

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
const game = games.filter(game => game._id === match.params.gameId)[0]
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
  { push, fetchOneGame, openModal, updateWeight })(Game)
