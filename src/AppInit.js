import React, { Component } from 'react';

import Header from './component/Header';
import Slider from './component/Slider';
import NowPlaying from './component/NowPlaying';
import Footer from './component/Footer';

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
        <Slider />
        <NowPlaying />
        <Footer />
      </div>
    );
  }
}

export default AppInit;
