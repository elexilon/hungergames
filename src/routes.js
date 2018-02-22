import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Lobby,
  SignUp,
  SignIn,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Lobby} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
