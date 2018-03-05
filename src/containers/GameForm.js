import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signUp from '../actions/user/sign-up'
import { Container, Row, Col,
        Button, Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap'
import validate from 'validate.js'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import style from "../styles/GameForm"

export class GameForm extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    const {email, password, passwordConfirmation} = this.state
    if (this.validateAll(email, password, passwordConfirmation)) {
      const user = {
        email: email,
        password: password
      }
      this.props.signUp(user)
    }
    return false
  }

  signIn() {
    this.props.push('/sign-in')
  }

  validateAll(email, password, passwordConfirmation) {
    return this.validateEmail(email) &&
      this.validatePassword(password) &&
      this.validatePasswordConfirmation(passwordConfirmation)
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    switch (name) {
      case 'email':
        this.validateEmail(event.target.value)
        break
      case 'password':
        this.validatePassword(event.target.value)
        break
      case 'passwordConfirmation':
        this.validatePasswordConfirmation(event.target.value)
        break
      default:
        return false
    }
  }

  validateEmail(email) {
    const validationMsg = validate.single(email, {
      presence: true,
      email: true
    })

    if (!!validationMsg) {
      this.setState({
        emailError: validationMsg
      })
      return false
    }

    this.setState({
      emailError: null
    })
    return true
  }

  validatePassword(password) {
    const validationMsg = validate.single(password, {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters'
      }
    })

    if (!!validationMsg) {
      this.setState({
        passwordError: validationMsg
      })
      return false
    }

    this.setState({
      passwordError: null
    })
    return true
  }

  validatePasswordConfirmation(passwordConfirmation) {
    const { password } = this.state

    if (passwordConfirmation !== password && password.length > 5) {
      this.setState({
        passwordConfirmationError: 'password confirmation is different'
      })
      return false
    }

    this.setState({
      passwordConfirmationError: null
    })
    return true
  }

  handleImageUpload(file) {
  let upload = request
    .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    .field('file', file)

  upload.end((err, response) => {
    if (err) {
      console.error(err)
    }

    this.setState({
      picUrl:
        'https://res.cloudinary.com/elexilon/image/upload/h_600,w_600,c_fill,g_face/' +
        response.body.public_id
    })
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
                    valid={ !this.state.descriptionError ? null : false }
                  />
                  <FormFeedback >{ this.state.descriptionError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="starts_at" sm={4}>Starts At</Label>
                <Col sm={8}>
                  <Input
                    type="date"
                    name="starts_at"
                    id="starts_at"
                    placeholder="Starts At"
                    onChange={this.handleChange("startsAt").bind(this)}
                    valid={ !this.state.startsAtError ? null : false }
                  />
                  <FormFeedback >{ this.state.startsAtError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="ends_at" sm={4}>Ends At</Label>
                <Col sm={8}>
                  <Input
                    type="date"
                    name="ends_at"
                    id="ends_at"
                    placeholder="Ends At"
                    onChange={this.handleChange("endsAt").bind(this)}
                    valid={ !this.state.endsAtError ? null : false }
                  />
                  <FormFeedback >{ this.state.endsAtError }</FormFeedback>
                </Col>
                </FormGroup>
                <Button type="submit" color="success" >Create</Button>

              </Col>
            </Row>
          </Form>
      </Container>
    )
  }
}

export default connect(null, { signUp, push })(GameForm)
