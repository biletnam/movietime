import React, { Component } from 'react';
import './AppInit.css';

// Modules
import { Route } from 'react-router-dom';

// Components
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';

// Component for Routes
import MovieDetails from './component/MovieDetails';
import Login from './component/Login';
import Payment from './component/Payment';
import PaymentSuccess from './component/PaymentSuccess';

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/jumanji-welcome-to-the-jungle" component={MovieDetails}/>
        <Route path="/login" component={Login}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/paymentsuccess" component={PaymentSuccess}/>
        <Footer />
      </div>
    );
  }
}

export default AppInit;
