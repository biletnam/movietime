import React, { Component } from 'react';
import './AppInit.css';

// Modules
import { Route, withRouter } from 'react-router-dom';

// Components
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';

// Component for Routes
import MovieDetails from './component/MovieDetails';

// Redux
import { connect } from 'react-redux';
import { movie1 } from './actions';
import { movie2 } from './actions';
import { movie3 } from './actions';

class AppInit extends Component {
  constructor(){
    super();
    this.state = {
      movie1Coba: '299536',
      movie2Coba: '353486',
      movie3Coba: '402900',
    }
  }

  componentDidMount(){
    this.props.movie1(this.state.movie1Coba);
    this.props.movie2(this.state.movie2Coba);
    this.props.movie3(this.state.movie3Coba);
  }

  render() {
    return (
      <div className="AppInit">
        <Header />
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={MovieDetails} />        
        <Footer />
      </div>
    );
  }
}

// export default AppInit;
export default withRouter(
  connect(null, {movie1, movie2, movie3})(AppInit)
);
