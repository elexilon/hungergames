import React, { Component } from 'react'
import './App.css'
import Navigation from './components/ui/Navigation'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Routes />
      </div>
    )
  }
}

export default App
