import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signUp from '../actions/user/sign-up'
import { Container, Row, Col,
        Button, Form, FormGroup, Label, Input, FormFeedback, Card
} from 'reactstrap'



export class SignUp extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        name: this.refs.name.getValue(),
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      }
      this.props.signUp(user)
    }
    return false
  }

  signIn() {
    this.props.push('/sign-in')
  }

  validateAll() {
    return this.validateName() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation()
  }

  validateName() {
    const { name } = this.refs

    if (name.getValue().length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    this.setState({
      nameError: 'Please provide your name'
    })
    return false
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  validateEmail(event) {
    const email = event.target.value
    console.log(email)
    // if (email.getValue().match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
    //   this.setState({
    //     emailError: null
    //   })
    //   return true
    // }
    //
    // if (email.value === '') {
    //   this.setState({
    //     emailError: 'Please provide your email address'
    //   })
    //   return false
    // }
    //
    // this.setState({
    //   emailError: 'Please provide a valid email address'
    // })
    // return false
  }

  validatePassword() {
    const { password } = this.refs

    if (password.getValue().length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.getValue().match(/[a-zA-Z]+/) && password.getValue().match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return true
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  validatePasswordConfirmation() {
    const { password, passwordConfirmation } = this.refs

    if (password.value === passwordConfirmation.value) {
      this.setState({
        passwordConfirmationError: null
      })
      return true
    }

    this.setState({
      passwordConfirmationError: 'Passwords do not match'
    })
    return false
  }

  render() {
    return (
      <Container>
        <Card body>
          <Form onSubmit={this.submitForm.bind(this)}>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>

                <FormGroup row>
                <Label for="email" sm={4}>Email</Label>
                <Col sm={8}>
                  <Input valid={null}
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
                  <Input valid={null}
                    type="password"
                    name="password" id="password" placeholder="Password"
                    onChange={this.handleChange("password").bind(this)}
                   />
                  <FormFeedback >{ this.state.passwordError }</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                <Label for="passwordConfirmation" sm={4}>Password Confirmation</Label>
                <Col sm={8}>
                  <Input valid={null}
                    type="passwordConfirmation"
                    name="passwordConfirmation" id="passwordConfirmation" placeholder="Password Confirmation"
                    onChange={this.handleChange("passwordConfirmation").bind(this)}
                   />
                  <FormFeedback >{ this.state.passwordConfirmationError }</FormFeedback>
                </Col>
                </FormGroup>

                <Button type="submit" color="success" >Sign Up</Button>
                <Button outline color="primary" >Sign In</Button>

              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    )
  }
}

export default connect(null, { signUp, push })(SignUp)
