import React, { Component } from 'react';
import Upload from 'typicons.font/src/svg/upload.svg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">BJJ - STALKER</h1>
          <img src={Upload} alt="upload" />
        </header>

      </div>
    );
  }
}

export default App;
