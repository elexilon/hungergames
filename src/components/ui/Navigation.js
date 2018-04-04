import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import './Navigation.css'
import { Navigation as NavStyle } from "../../styles"
import signOut from '../../actions/user/sign-out'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, Button
} from 'reactstrap'
import { Authenticated } from '../../actions/user/sign-in'


const TITLE = 'Hunger Games'

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      modal: false,
    };

  }

  componentWillMount() {
    this.props.Authenticated()
  }

  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }


  signIn = () => {
    this.props.push('/sign-in')
  }

  goHome = () => {
    this.props.push('/')
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderSignedInButtons() {
    return (
      <Nav navbar>
        <NavItem>

        </NavItem>
        <NavItem>
          <Button style={ NavStyle.navigationButtonStyle } color="link" onClick={this.signOut.bind(this)} >
            sign Out
          </Button>
        </NavItem>
      </Nav>
    )
  }

  renderSignedOutButtons() {
    return (
      <Nav navbar>
        <NavItem>
          <Button color="link" onClick={this.signIn} >sign In</Button>
        </NavItem>
      </Nav>
    )
  }

  render() {
    const { signedIn } = this.props

    return (
      <div className="Navigation">
        <Navbar style={NavStyle.navigationStyle} color="faded" dark>
          <NavbarBrand href="/" className="mr-auto">{TITLE}</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            { signedIn ? this.renderSignedInButtons() :
              this.renderSignedOutButtons() }
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, modal }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  modal
})

export default connect(mapStateToProps, { push, signOut, Authenticated })(Navigation)
