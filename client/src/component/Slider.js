// import React, { Component } from 'react';
// import '../style/Slider.css';

// import axios from 'axios'
// import { Link, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// class Slider extends Component {
//     state = {
//         // movie1: '/movie/299536/',
//         // movie2: '353486',
//         // movie3: '402900',
//         movieLink1: '',
//         movieLink2: '',
//         movieLink3: '',
//         movieSlider1: '',
//         movieSlider2: '',
//         movieSlider3: '',
//         movieTitle1: '',
//         movieTitle2: '',
//         movieTitle3: '',
//     }

//     componentDidMount() {
//         // console.log(this.props.movie1)
//         { this.createCarousel() }
//     }

//     createCarousel() {
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 movieSlider1: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
//                 movieLink1: `/movie/${this.props.movie1}`
//             })
//         })
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle1: ambilData.data.original_title,
//                 movieTagline1: ambilData.data.tagline,
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 movieSlider2: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
//                 movieLink2: `/movie/${this.props.movie2}`
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle2: ambilData.data.original_title,
//                 movieTagline2: ambilData.data.tagline,
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 movieSlider3: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
//                 movieLink3: `/movie/${this.props.movie3}`
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle3: ambilData.data.original_title,
//                 movieTagline3: ambilData.data.tagline,
//             })
//         })
//   }

//   render() {
//     return (
//       <div className="SLIDER">
//         <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//             <ol className="carousel-indicators">
//                 <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//                 <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//                 <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//             </ol>
//             <div className="carousel-inner">
//                 <div className="carousel-item active mt-slider">
//                     <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider1} alt="Third slide"/>
//                     <div className="carousel-caption d-none d-md-block">
//                         <h1>{this.state.movieTitle1}</h1>
//                         <p>{this.state.movieTagline1}</p>
//                         <Link to={this.state.movieLink1}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
//                     </div>
//                 </div>
//                 <div className="carousel-item mt-slider">
//                     <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider2} alt="Second slide"/>
//                     <div className="carousel-caption d-none d-md-block">
//                         <h1>{this.state.movieTitle2}</h1>
//                         <p>{this.state.movieTagline2}</p>
//                         <Link to={this.state.movieLink2}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
//                     </div>
//                 </div>
//                 <div className="carousel-item mt-slider">
//                     <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider3} alt="First slide" />
//                     <div className="carousel-caption d-none d-md-block">
//                         <div>
//                             <h1>{this.state.movieTitle3}</h1>
//                             <p>{this.state.movieTagline3}</p>
//                             <Link to={this.state.movieLink3}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="sr-only">Previous</span>
//             </a>
//             <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="sr-only">Next</span>
//             </a>
//         </div>

//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//     const movie1 = state.movie1;
//     const movie2 = state.movie2;
//     const movie3 = state.movie3;
//     return { movie1, movie2, movie3 };
// }
  
// export default withRouter(
//     connect(mapStateToProps)(Slider)
// );

import React, { Component } from 'react';
import '../style/Slider.css';

import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Slider extends Component {
    state = {
        // movie1: '402900',
        // movie2: '420814',
        // movie3: '353081',
        movie1: '',
        movie2: '',
        movie3: '',
        movieLink1: '',
        movieLink2: '',
        movieLink3: '',
        movieSlider1: '',
        movieSlider2: '',
        movieSlider3: '',
        movieTitle1: '',
        movieTitle2: '',
        movieTitle3: '',
    }

    //Get moviedb_id from database
    componentDidMount() {
        axios.get('http://localhost:5001/latestmovies')
        .then((response) => {
            // console.log(response)
            this.setState({
                movie1: response.data[0].moviedb_id,
                movie2: response.data[1].moviedb_id,
                movie3: response.data[2].moviedb_id,
            })
            this.createCarousel();
        })
    }

    //Create movie state based on moviedb_id
    createCarousel() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                movieSlider1: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
                movieLink1: `/movie/${this.state.movie1}`
            })
            // console.log(this.state.movieSlider1)
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
                movieLink2: `/movie/${this.state.movie2}`
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
                movieLink3: `/movie/${this.state.movie3}`
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
                        <Link to={this.state.movieLink1}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider2} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>{this.state.movieTitle2}</h1>
                        <p>{this.state.movieTagline2}</p>
                        <Link to={this.state.movieLink2}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
                    </div>
                </div>
                <div className="carousel-item mt-slider">
                    <img className="d-block w-100 mt-slider-crop" src={this.state.movieSlider3} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <div>
                            <h1>{this.state.movieTitle3}</h1>
                            <p>{this.state.movieTagline3}</p>
                            <Link to={this.state.movieLink3}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>
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