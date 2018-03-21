import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { create, update } from '../actions/game'
import { Container, Row, Col,
        Button, Form, FormGroup, FormText,
        Label, Input, FormFeedback
} from 'reactstrap'
import validate from 'validate.js'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import style from '../styles/GameForm'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'


export class GameForm extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    game: PropTypes.object
  }

  componentWillMount() {
    if(!this.props.game) return
    this.setState({
        _id: this.props.game._id,
        ends_at: moment(this.props.game.ends_at),
        starts_at: moment(this.props.game.starts_at),
        title: this.props.game.title,
        description: this.props.game.description,
        picUrl: this.props.game.picUrl
    })
  }

  state = {
    starts_at: moment(),
    ends_at: moment(),
    title: ""
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll(this.state.title, this.state.starts_at, this.state.ends_at )) {
      if(!this.state._id){
        this.props.create(this.state)
      } else {
        this.props.update(this.state)
      }
    }
  }

  validateAll(title, startsAt, endsAt) {
    return this.validateTitle(title) &&
    this.validateStartsAt(startsAt) &&
    this.validateEndsAt(endsAt)
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  validateTitle(title) {
    const validationMsg = validate.single(title, {
      presence: true,
      length: {
        minimum: 2,
        maximum: 12,
        message: 'Must be at least 2 characters and maximun 12'
      }
    })

    if (!!validationMsg) {
      this.setState({
        titleError: validationMsg
      })
      return false
    }

    this.setState({
      titleError: null
    })
    return true
  }

  validateStartsAt(startsAt) {

    const validationMsg = validate.single(startsAt, {
      presence: true
    })

    if (!!validationMsg) {
      this.setState({
        startsAtError: validationMsg
      })
      return false
    }

    if(!validate.isDate(new Date(startsAt))){
      this.setState({
        startsAtError: "Must be a valid date"
      })
      return false
    }

    this.setState({
      startsAtError: null
    })
    return true
  }

  validateEndsAt(endsAt) {

    const validationMsg = validate.single(endsAt, {
      presence: true
    })

    if (!!validationMsg) {
      this.setState({
        startsAtError: validationMsg
      })
      return false
    }

    this.setState({
      startsAtError: null
    })
    return true
  }

  handleImageUpload(file) {
    if(!!file){
      let upload = request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        .field('file', file)

      upload.end((err, response) => {
        if (err) {
          console.error(err)
          return false
        }
        this.setState({
          picUrl:
            'https://res.cloudinary.com/elexilon/image/upload/' +
            response.body.public_id
        })
      })
    }



  }

  handleChangeStartsAt(date) {
    const startD = new Date(date).getTime()
    const endD = new Date(this.state.ends_at).getTime()

    if(startD > endD){
      this.setState({
          ends_at: date
      })
    }

    this.setState({
        starts_at: date
    })
  }

  handleChangeEndsAt(date) {
    this.setState({
        ends_at: date
    })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  render() {
    const {
      picUrl
    } = this.state
    return (
      <Container>
          <Form onSubmit={this.submitForm.bind(this)}>
            <Row>
              <Col sm="12">

                <FormGroup row>
                  <Dropzone
                    style={style.imgStyle}
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}
                  >
                    {picUrl === '' || !picUrl ? (
                      <p>Drop an image or click to select a file to upload.</p>
                    ) : (
                        <div>
                          <img style={style.imgStyle} src={picUrl} alt="" />
                        </div>
                      )}
                  </Dropzone>
                </FormGroup>
                <FormGroup row>
                <Label for="title" sm={4}>Title</Label>
                <Col sm={8}>
                  <Input
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={this.handleChange("title").bind(this)}
                    valid={ !this.state.titleError ? null : false }
                    value={ this.state.title }
                  />
                <FormFeedback >{ this.state.titleError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="description" sm={4}>Description</Label>
                <Col sm={8}>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={this.handleChange("description").bind(this)}
                    value={ this.state.description }
                  />
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="starts_at" sm={4}>Starts At</Label>
                <Col sm={8}>

                  <DatePicker
                      className="form-control"
                      selected={this.state.starts_at}
                      onChange={this.handleChangeStartsAt.bind(this)}
                      dateFormat="DD/MM/YYYY"

                  />
                  <FormText>{this.state.startsAtError}</FormText>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="ends_at" sm={4}>Ends At</Label>
                <Col sm={8}>

                  <DatePicker
                      className="form-control"
                      selected={this.state.ends_at}
                      onChange={this.handleChangeEndsAt.bind(this)}
                      dateFormat="DD/MM/YYYY"
                      minDate={this.state.starts_at}
                  />
                <FormText>{this.state.endsAtError}</FormText>
                </Col>
                </FormGroup>
                {
                  !!this.state._id ?
                  <Button type="submit" color="success" >Update</Button> :
                  <Button type="submit" color="success" >Create</Button>
                }
              </Col>
            </Row>
          </Form>
      </Container>
    )
  }
}

export default connect(null, { push, create, update })(GameForm)
