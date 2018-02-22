import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import './Navigation.css'
import style from "../../styles/Navigation"
import signOut from '../../actions/user/sign-out'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, Button
} from 'reactstrap'

const TITLE = 'Hunger Games'

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
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
    });
  }

  renderButton() {
    return (
      <Button color="link" onClick={this.signOut.bind(this)} >
        sign Out
      </Button>
    )
  }

  render() {
    const { signedIn } = this.props
    return (
      <div className="Navigation">
        <Navbar style={style.navigationStyle} color="faded" dark>
          <NavbarBrand href="/" className="mr-auto">{TITLE}</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
              {signedIn ?
                 this.renderButton() :
                <Button color="link" onClick={this.signIn} >sign In</Button> }
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
