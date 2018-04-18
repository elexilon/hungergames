import React, { Component } from 'react'
import Navigation from './components/ui/Navigation'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Routes />
      </div>
    )
  }
}

export default App
