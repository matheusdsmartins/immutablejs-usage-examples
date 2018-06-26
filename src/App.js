import React, { Component } from 'react'
import Form from './components/Form'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Immutable.js Examples</h1>
        </header>
        <Form />
      </div>
    );
  }
}

export default App
