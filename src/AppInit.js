import React, { Component } from 'react';
import Header from './component/Header'
import Slider from './component/Slider'

class AppInit extends Component {
  render() {
    return (
      <div className="AppInit">
        <Header />
        <Slider />
      </div>
    );
  }
}

export default AppInit;
