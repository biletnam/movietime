import React, { Component } from 'react';
import '../style/NowPlaying.css';

import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            // movie1: '299536',
            // movie2: '353486',
            // movie3: '402900',
            movieLink1: '',
            movieLink2: '',
            movieLink3: '',
            moviePoster1: '',
            moviePoster2: '',
            moviePoster3: '',
            movieTitle1: '',
            movieTitle2: '',
            movieTitle3: '',

        }
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster1: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
                movieLink1: `/movie/${this.props.movie1}`
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle1: ambilData.data.original_title,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster2: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
                movieLink2: `/movie/${this.props.movie2}`
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle2: ambilData.data.original_title,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster3: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
                movieLink3: `/movie/${this.props.movie3}`
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle3: ambilData.data.original_title,
            })
        })
    }

  render() {
    return (
      <div className="NOWPLAYING">
        <div className="mt-nowplaying-title">
            <h1 align="center">NOW PLAYING</h1>
        </div>

        <div className="card-deck">
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster1} alt="Card image cap" /> 
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle1}</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to={this.state.movieLink1}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster2} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle2}</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    <Link to={this.state.movieLink2}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster3} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle3}</h5>
                    <br />
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to={this.state.movieLink3}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>          
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    const movie1 = state.movie1;
    const movie2 = state.movie2;
    const movie3 = state.movie3;
    return { movie1, movie2, movie3 };
}
  
export default withRouter(
    connect(mapStateToProps)(NowPlaying)
);
