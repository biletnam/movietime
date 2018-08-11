import React, { Component } from 'react';
import '../style/Slider.css';

import { Link } from 'react-router-dom';

import axios from 'axios'

class Slider extends Component {
    constructor(){
        super();
        this.state = {
            movie1: '299536',
            movie2: '353486',
            movie3: '402900',
            movieSlider1: '',
            movieSlider2: '',
            movieSlider3: '',
            movieTitle1: '',
            movieTitle2: '',
            movieTitle3: '',
        }
    }
    componentWillMount(){
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                movieSlider1: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie1}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle1: ambilData.data.original_title,
                movieTagline1: ambilData.data.tagline,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie2}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                movieSlider2: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie2}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle2: ambilData.data.original_title,
                movieTagline2: ambilData.data.tagline,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie3}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                movieSlider3: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie3}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle3: ambilData.data.original_title,
                movieTagline3: ambilData.data.tagline,
            })
        })
    }

  render() {
    return (
      <div className="SLIDER">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active mt-slider">
                    <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider1} alt="Third slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>{this.state.movieTitle1}</h1>
                        <p>{this.state.movieTagline1}</p>
                        <Link to="/movie/jumanji-welcome-to-the-jungle/mv001"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider2} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>{this.state.movieTitle2}</h1>
                        <p>{this.state.movieTagline2}</p>
                        <Link to="/movie/hotel-transylvania-3-welcome-to-the-jungle/mv002"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider3} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <div>
                            <h1>{this.state.movieTitle3}</h1>
                            <p>{this.state.movieTagline3}</p>
                            <Link to="/movie/oceans-8/mv003"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
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
