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
                    <img className="d-block w-100 mt-crop" src={require('../img/rz3TAyd5kmiJmozp3GUbYeB5Kep.jpg')} alt="Third slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Jumanji: Welcome to The Jungle</h1>
                        <p>Wanna be like them?</p>
                        <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-crop" src={require('../img/xVCwX0p8uZ0ieD8JozZmdi1wUjK.jpg')} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Hotel Transylvania 3: Summer Vacation</h1>
                        <p>The monster vacay continues! Got tix?</p>
                        <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-crop" src={require('../img/zBIfBeStaDdDdhBrSx8InhgFUVa.jpg')} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <div>
                            <h1>Ocean's 8</h1>
                            <p>Girls power is back! Got tix?</p>
                            <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>
                        </div>
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
