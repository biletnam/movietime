import React, { Component } from 'react';
import '../style/Slider.css';

class Slider extends Component {
  render() {
    return (
      <div className="Slider">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active mt-slider">
                    <img className="d-block w-100 mt-crop" src={require('../img/zBIfBeStaDdDdhBrSx8InhgFUVa.jpg')} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <div align="left">
                            <h1 className="mt-text-poster"><strong>Ocean's 8</strong>
                            {/* <br/><small className="mt-text-muted">Girls power is back! Got tix?</small> */}
                            </h1>
                            <p>Debbie Ocean, a criminal mastermind, gathers a crew of seven other female thieves to pull off the heist of the century at New York's annual Met Gala.</p>
                            <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">Buy Ticket</button>
                        </div>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-crop" src={require('../img/xVCwX0p8uZ0ieD8JozZmdi1wUjK.jpg')} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Ocean's 8</h5>
                        <p>Wanna be like them?</p>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-crop" src={require('../img/xu1K9wch9iu5Pqd1wIGHFs2yTfV.jpg')} alt="Third slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Ocean's 8</h5>
                        <p>Wanna be like them?</p>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

      </div>
    );
  }
}

export default Slider;
