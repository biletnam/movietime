import React, { Component } from 'react';
import Header from './component/Header';
import Slider from './component/Slider';
import NowPlaying from './component/NowPlaying';
import Footer from './component/Footer';
import MovieDetails from './component/MovieDetails';

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
        <Slider />
        <NowPlaying />
        <Footer />
        <MovieDetails />
      </div>
    );
  }
}

export default AppInit;
