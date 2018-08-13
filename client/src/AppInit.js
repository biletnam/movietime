import React, { Component } from 'react';
import './AppInit.css';

// Modules
import { Route, withRouter } from 'react-router-dom';

// Components
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';
import PaymentSuccess from './component/PaymentSuccess'
import Admin from './component/Admin';

// Component for Routes
import MovieDetails from './component/MovieDetails';
import Payment from './component/Payment';

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
          <Route exact path="/" component={Home} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/payment" component={Payment} />
          <Route path="/paymentsuccess" component={PaymentSuccess} />        
        <Footer />
      </div>
    );
  }
}

export default AppInit