import React, { Component } from 'react';
import '../style/Home.css';

// Components
import Slider from './Slider';
import NowPlaying from './NowPlaying';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Slider />
        <NowPlaying />
      </div>
    );
  }
}

export default Home;
