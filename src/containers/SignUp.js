import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signUp from '../actions/user/sign-up'
import { Container, Row, Col,
        Button, Form, FormGroup, Label, Input, FormFeedback, Card
} from 'reactstrap'
import Title from '../components/ui/Title'
import validate from 'validate.js'

export class SignUp extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    const {email, password, passwordConfirmation, name} = this.state
    if (this.validateAll(email, password, passwordConfirmation, name)) {
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

  validateAll(email, password, passwordConfirmation, name) {
    return this.validateName(name) &&
      this.validateEmail(email) &&
      this.validatePassword(password) &&
      this.validatePasswordConfirmation(passwordConfirmation)
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    switch (name) {
      case 'email':
        this.validateEmail(event.target.value)
        break
      case 'name':
        this.validateName(event.target.value)
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

  validateName(name) {
    const validationMsg = validate.single(name, {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters'
      }
    })

    if (!!validationMsg) {
      this.setState({
        nameError: validationMsg
      })
      return false
    }

    this.setState({
      nameError: null
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

  render() {
    return (
      <Container>
        <Title content={"Sign Up"} />
        <Card body>
          <Form onSubmit={this.submitForm.bind(this)}>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>

                <FormGroup row>
                  <Label for="name" sm={4}>Name</Label>
                  <Col sm={8}>
                    <Input valid={!this.state.nameError ? null : false}
                      name="name" id="name" placeholder="Name"
                      onChange={this.handleChange("name").bind(this)}
                    />
                    <FormFeedback >{this.state.nameError}</FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="email" sm={4}>Email</Label>
                <Col sm={8}>
                  <Input valid={ !this.state.emailError ? null : false }
                    type="email"
                    name="email" id="email" placeholder="Email"
                    onChange={this.handleChange("email").bind(this)}
                   />
                  <FormFeedback >{ this.state.emailError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="password" sm={4}>Password</Label>
                <Col sm={8}>
                  <Input valid={ !this.state.passwordError ? null : false }
                    type="password"
                    name="password" id="password" placeholder="Password"
                    onChange={ this.handleChange("password").bind(this) }
                   />
                  <FormFeedback >{ this.state.passwordError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="passwordConfirmation" sm={4}>Password Confirmation</Label>
                <Col sm={8}>
                  <Input
                    valid={
                      !this.state.passwordConfirmationError ? null : false
                    }
                    type="password"
                    name="passwordConfirmation" id="passwordConfirmation"
                    placeholder="Password Confirmation"
                    onChange={
                      this.handleChange("passwordConfirmation").bind(this)
                    }
                   />
                  <FormFeedback >{ this.state.passwordConfirmationError }</FormFeedback>
                </Col>
                </FormGroup>

                <Button type="submit" color="success" >Sign Up</Button>
                <Button
                  outline
                  color="primary"
                  onClick={ this.signIn.bind(this) }
                  >Sign In</Button>

              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    )
  }
}

export default connect(null, { signUp, push })(SignUp)
