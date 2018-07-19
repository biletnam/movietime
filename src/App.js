import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import AppInit from './AppInit';
import MovieDetails from './component/MovieDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={AppInit} />
          <Route path="/jumanji-welcome-to-the-jungle" component={MovieDetails}/>
        </div>
    </div>

    );
  }
}

export default App;
