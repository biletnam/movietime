import React, { Component } from 'react';
import './AppInit.css';

// Modules
import { Route, Router } from 'react-router-dom';

// Components
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';

// Component for Routes
import MovieDetails from './component/MovieDetails';

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/movie/:title/:id" component={MovieDetails} />        
        <Footer />
      </div>
    );
  }
}

export default AppInit;
