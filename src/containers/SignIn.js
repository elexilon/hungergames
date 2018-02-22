import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signIn from '../actions/user/sign-in'
import { Container, Row, Col,
        Button, Form, FormGroup, Label, Input, FormFeedback, Card
} from 'reactstrap'
import Title from '../components/ui/Title'
import validate from 'validate.js'

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    const {email, password} = this.state
    if (this.validateEmail(email)) {
      const user = {
        email: email,
        password: password
      }
      this.props.signIn(user)
    }
    return false
  }

  signUp() {
    this.props.push('/sign-up')
  }


  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  validateEmail(email) {
    const validationMsg = validate.single(email, {
      presence: true,
      email: true
    })
    if (!!validationMsg && email.length > 0) {
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

  render() {
    return (
      <Container>
        <Title content={"Sign In"} />
        <Card body>
          <Form onSubmit={this.submitForm.bind(this)}>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>

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
                  <Input type="password"
                    name="password" id="password" placeholder="Password"
                    onChange={this.handleChange("password").bind(this)}
                  />
                  <FormFeedback >{ this.state.passwordError }</FormFeedback>
                </Col>
                </FormGroup>

                <Button type="submit" color="success" >Sign In</Button>
                <Button
                  outline
                  color="primary"
                  onClick={ this.signUp.bind(this) }
                  >Sign Up</Button>

              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    )
  }
}

export default connect(null, { signIn, push })(SignIn )
