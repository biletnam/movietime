// import React, { Component } from 'react';
// import '../style/NowPlaying.css';

// import { Link, withRouter } from 'react-router-dom';
// import axios from 'axios'
// import { connect } from 'react-redux';

// class NowPlaying extends Component {
//     constructor() {
//         super();
//         this.state = {
//             // movie1: '299536',
//             // movie2: '353486',
//             // movie3: '402900',
//             movieLink1: '',
//             movieLink2: '',
//             movieLink3: '',
//             moviePoster1: '',
//             moviePoster2: '',
//             moviePoster3: '',
//             movieTitle1: '',
//             movieTitle2: '',
//             movieTitle3: '',

//         }
//     }

//     componentDidMount(){
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 moviePoster1: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
//                 movieLink1: `/movie/${this.props.movie1}`
//             })
//         })
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie1}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle1: ambilData.data.original_title,
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 moviePoster2: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
//                 movieLink2: `/movie/${this.props.movie2}`
//             })
//         })
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie2}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle2: ambilData.data.original_title,
//             })
//         })

//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         .then((ambilData) => {
//             this.setState({
//                 moviePoster3: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
//                 movieLink3: `/movie/${this.props.movie3}`
//             })
//         })
//         axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie3}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         .then((ambilData) => {
//             this.setState({
//                 movieTitle3: ambilData.data.original_title,
//             })
//         })
//     }


//   render() {

//     return (
//       <div className="NOWPLAYING">
//         <div className="mt-nowplaying-title">
//             <h1 align="center">NOW PLAYING</h1>
//         </div>
//         <center>
//             <input type='text' placeholder='Find Movie' ref='cari'/>
//             <button onClick={()=> {this.findMovie()}}>Find</button>
//         </center>
//         <br />
//         <div className="card-deck">
//             <div className="card">
//                 <img className="card-img-top" src={this.state.moviePoster1} alt="Card image cap" /> 
//                 <div className="card-body">
//                     <h5 className="card-title">{this.state.movieTitle1}</h5>
//                     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
//                     <Link to={this.state.movieLink1}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
//                 </div>
//             </div>
//             <div className="card">
//                 <img className="card-img-top" src={this.state.moviePoster2} alt="Card image cap" />
//                 <div className="card-body">
//                     <h5 className="card-title">{this.state.movieTitle2}</h5>
//                     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//                     <Link to={this.state.movieLink2}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
//                 </div>
//             </div>
//             <div className="card">
//                 <img className="card-img-top" src={this.state.moviePoster3} alt="Card image cap" />
//                 <div className="card-body">
//                     <h5 className="card-title">{this.state.movieTitle3}</h5>
//                     <br />
//                     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
//                     <Link to={this.state.movieLink3}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>          
//                 </div>
//             </div>
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
//     connect(mapStateToProps)(NowPlaying)
// );


// // COBA KEDUA
// import React, { Component } from 'react';
// import '../style/NowPlaying.css';

// import { Link } from 'react-router-dom';
// import axios from 'axios'

// class NowPlaying extends Component {
//     constructor() {
//         super();
//         this.state = {
//             allMoviesRaw: [],
//             allMoviesProcess: [],
//             allMovies: [],
//             movie1: '',
//             movie2: '',
//             movie3: '',
//             movieLink1: '',
//             movieLink2: '',
//             movieLink3: '',
//             moviePoster1: '',
//             moviePoster2: '',
//             moviePoster3: '',
//             movieTitle1: '',
//             movieTitle2: '',
//             movieTitle3: '',

//         }
//     }

//     //Get moviedb_id from database
//     async cobaFungsi(){
//         let allMoviesRaw = [];
//         let allMoviesProcess = [];
//         let allMovies = [];

//         let allMovieRes = await axios.get('http://localhost:5001/allmovies')
//         // console.log("All movie response:", allMovieRes)
//         let allMoviesData = allMovieRes.data;
//         // console.log("All movies data:", allMoviesData)
//         let x = await allMoviesData.map((item) => {
//             allMoviesProcess.push(item.moviedb_id)
//         });
//         console.log("XX:",x)
//         // console.log("All movies process:", allMoviesProcess);

//         let y = await allMoviesProcess.map(async (item) => {
//             let movie = new Object();

//             let movieImage = await axios.get(`https://api.themoviedb.org/3/movie/${item}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//             movie.poster = `https://image.tmdb.org/t/p/original${movieImage.data.posters[0].file_path}`;
//             movie.link = `/movie/${item}`;

//             let movieItem = await axios.get(`https://api.themoviedb.org/3/movie/${item}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//             movie.title = movieItem.data.original_title;

//             allMovies.push(movie)
//             console.log("Just after push:", allMovies)
//         })

//         console.log("YY:", y)
//         console.log("End of async await")
//         console.log(allMovies)
        
//         const movieCard = allMovies.map((item, index) => {
//             // console.log("Item:", item);
//             // console.log("Item Poster:", item.poster);
//             return <ul key={index}><li>{item.poster}</li><li>{item.title}</li><li>{item.link}</li></ul>
//         })

//         // await axios.get('http://localhost:5001/allmovies')
//         // .then((response) => {
//         //     allMoviesRaw = response.data;

//         //     //createArrayMovies
//         //     allMoviesRaw.map((item) => {
//         //         allMoviesProcess.push(item.moviedb_id)
//         //     })
//         //     console.log(allMoviesProcess) // [299536, 353486, 402900, 420814, 353081]
            
//         //     // createArrayofObjectMovies
//         //     allMoviesProcess.map((item) => {
//         //         let movie = new Object();
    
//         //         axios.get(`https://api.themoviedb.org/3/movie/${item}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//         //         // .then((response) => {
//         //         //     movie.poster = `https://image.tmdb.org/t/p/original${response.data.posters[0].file_path}`;
//         //         //     movie.link = `/movie/${item}`;
//         //         // })
//         //         // axios.get(`https://api.themoviedb.org/3/movie/${item}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//         //         // .then((response) => {
//         //         //     movie.title = response.data.original_title;
//         //         // })
    
//         //         allMovies.push(movie);       
//         //     })  

//         //     console.log(allMovies);

//         //     // this.setState({
//         //     //     allMovies : allMovies,
//         //     // })

//         //     // console.log(this.state.allMovies);

//         //     const movieCard = allMovies.map((item, index) => {
//         //         console.log("Item:", item);
//         //         console.log("Item Poster:", item.poster);
//         //         return
//         //             <ul key={index}><li>{item.poster}</li><li>{item.title}</li><li>{item.link}</li></ul>
//         //     })

//             console.log("Movie Card Inside Function:", movieCard)

//             return movieCard;

//             //Ini yang lama
//             // console.log(response)
//             // this.setState({
//             //     allMoviesRaw: response.data,
//             // })
//             // this.createArrayMovies();
//         // })
//     }
    

//     // createArrayMovies(){
//     //     this.state.allMoviesRaw.map((item) => {
//     //         this.state.allMoviesProcess.push(item.moviedb_id)
//     //     })
//     //     console.log(this.state.allMoviesProcess) // [299536, 353486, 402900, 420814, 353081]
//     //     this.createArrayofObjectMovies();
//     // }

//     // createArrayofObjectMovies(){

//     //     this.state.allMoviesProcess.map((item) => {
//     //         let movie = new Object();

//     //         axios.get(`https://api.themoviedb.org/3/movie/${item}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
//     //         .then((response) => {
//     //             movie.poster = `https://image.tmdb.org/t/p/original${response.data.posters[0].file_path}`;
//     //             movie.link = `/movie/${item}`;
//     //         })
//     //         axios.get(`https://api.themoviedb.org/3/movie/${item}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
//     //         .then((response) => {
//     //             movie.title = response.data.original_title;
//     //         })

//     //         this.state.allMovies.push(movie);       
//     //     })

//     //     console.log(this.state.allMovies);
       
//     // }

//   render() { 

//     //     const movieCard = this.state.allMovies.map((item, index) => {
//     //         return
//     //             <ul key={index}><li>{item.poster}</li><li>{item.title}</li><li>{item.link}</li></ul>
    
//     //             // <div className="card" key={index}>
//     //             //     <img className="card-img-top" src={item.poster} alt="Card image cap" /> 
//     //             //     <div className="card-body">
//     //             //         <h5 className="card-title">{item.title}</h5>
//     //             //         <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
//     //             //         <Link to={item.link}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
//     //             //     </div>
//     //             // </div>
            
//     //     })
//     //   console.log(`Ini coba tes`, movieCard);

//     console.log("sebelum coba fungsi")
//     let movieCardF = async () => {
//         let m = await this.cobaFungsi();
//         return m;
//     } 
//     // this.cobaFungsi().then(function(result) {
//     //     movieCard = result
//     // })
//     let movieCard = movieCardF()
//     console.log("Movie card:", movieCard);
//     console.log("sebelum return")
//     return (
//       <div className="NOWPLAYING">
//         <div className="mt-nowplaying-title">
//             <h1 align="center">NOW PLAYING</h1>
//         </div>
//         <br />
//         <div className="card-deck">
//         </div>
//         {/* {movieCard} */}
//         {/* {movieCard} */}
//       </div>
//     );
//   }
// }

// export default NowPlaying;

// //COBA KETIGA -- FACEBOOK
// import React, { Component } from 'react';
// import '../style/NowPlaying.css';

// import { Link } from 'react-router-dom';
// import axios from 'axios'

// class NowPlaying extends Component {
//     constructor() {
//         super();
//         this.state = {
//             judul: [],
//         };
//     }
    
//     componentDidMount(){
//         axios.get('https://facebook.github.io/react-native/movies.json')
//         .then((ambilData) => {
//             console.log(ambilData);
//             this.setState({
//                 judul:ambilData.data.movies,
//             }
//         )}
//     )};
        
//   render() { 
//     const data = this.state.judul.map((item, index)=>{
//         var fullfilm = [item.title,item.releaseYear].join(" ");
//         return<li key={index}>{fullfilm}</li>;
//     })

//     return (
//       <div className="NOWPLAYING">
//         <div className="mt-nowplaying-title">
//             <h1 align="center">NOW PLAYING</h1>
//         </div>
//         {data}
//       </div>
//     );
//   }
// }

// export default NowPlaying;

// //COBA KEEMPAT -- DATABASE
// import React, { Component } from 'react';
// import '../style/NowPlaying.css';

// import { Link } from 'react-router-dom';
// import axios from 'axios'

// class NowPlaying extends Component {
//     constructor() {
//         super();
//         this.state = {
//             // judul: [],
//             semuaMovies: [],
//         };
//     }
    
//     componentDidMount(){
//         // axios.get('https://facebook.github.io/react-native/movies.json')
//         // .then((ambilData) => {
//         //     console.log(ambilData);
//         //     this.setState({
//         //         judul:ambilData.data.movies,
//         //     }
//         // )}
//         axios.get('http://localhost:5001/allmovies')
//         .then((ambilData) => {
//             console.log(ambilData);
//             this.setState({
//                 semuaMovies:ambilData.data,
//             }
//         )}
//     )};
        
//   render() { 
//     // const data = this.state.judul.map((item, index)=>{
//     //     var fullfilm = [item.title,item.releaseYear].join(" ");
//     //     return<li key={index}>{fullfilm}</li>;
//     // })
//     const data = this.state.semuaMovies.map((item, index)=>{
//         return ( 
//         <li key={index}>{item.id}, {item.movie_name}, {item.moviedb_id}</li>
//         );
//     })

//     return (
//       <div className="NOWPLAYING">
//         <div className="mt-nowplaying-title">
//             <h1 align="center">NOW PLAYING</h1>
//         </div>
//         {data}
//       </div>
//     );
//   }
// }

// export default NowPlaying;

// //COBA KELIMA -- DATABASE ++
// import React, { Component } from 'react';
// import '../style/NowPlaying.css';

// import { Link } from 'react-router-dom';
// import axios from 'axios'

// class NowPlaying extends Component {
//     constructor() {
//         super();
//         this.state = {
//             semuaMoviesRaw: [],
//         };
//     }
    
//     componentDidMount(){
//         axios.get('http://localhost:5001/allmovies')
//         .then((ambilData) => {
//             console.log(ambilData);
//             this.setState({
//                 semuaMoviesRaw:ambilData.data,
//             })
//         })
//     };
        
//   render() { 
//     const data = this.state.semuaMoviesRaw.map((item, index)=>{
//         return ( 
//             <li key={index}>{item.id}, {item.movie_name}, {item.moviedb_id}</li>
//         );
//     })
//     console.log(data)
    
//     return (
//       <div className="NOWPLAYING">
//         <div className="mt-nowplaying-title">
//             <h1 align="center">NOW PLAYING</h1>
//         </div>
//         {data}
//       </div>
//     );
//   }
// }

// export default NowPlaying;

//COBA KEENAM -- POST KE DATABASE
import React, { Component } from 'react';
import '../style/NowPlaying.css';

import { Link } from 'react-router-dom';
import axios from 'axios'

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            semuaMovies: [],
            semuaMoviesRaw: [],
            semuaMoviesProcess: [],
            poster: '',
        };
    }
    
    componentDidMount(){
        axios.get('http://localhost:5001/allmovies')
        .then((ambilData) => {
            console.log(ambilData);
            
            //Masukkan data mentah dari database ke state array raw
            this.setState({
                semuaMoviesRaw:ambilData.data,
            })
            console.log(this.state.semuaMoviesRaw);

            //Ambil moviedb_id dan masukkan ke state array process
            this.state.semuaMoviesRaw.map((item) => {
                this.state.semuaMoviesProcess.push(item.moviedb_id);
            })
            console.log(this.state.semuaMoviesProcess);

            //Ambil data poster & backdrop ke moviedb.org sesuai moviedb_id yang ada
            this.state.semuaMoviesProcess.map((item => {
                axios.get(`https://api.themoviedb.org/3/movie/${item}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
                .then((ambilData) => {
                    this.setState({
                        poster: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
                        backdrop: `https://image.tmdb.org/t/p/original${ambilData.data.backdrops[0].file_path}`,
                    })
                    // Lalu masukkan ke database
                    var url = 'http://localhost:5001/updatemovies';
                    axios.post(url, {
                        id: item,
                        poster: this.state.poster,
                        backdrop: this.state.backdrop,
                    })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
    
                //Ambil data poster & backdrop ke moviedb.org sesuai moviedb_id yang ada
                axios.get(`https://api.themoviedb.org/3/movie/${item}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
                .then((ambilData) => {
                    this.setState({
                        tagline: ambilData.data.tagline,
                        overview: ambilData.data.overview,
                    })
                    // Lalu masukkan ke database
                    var url = 'http://localhost:5001/updatetagline';
                    axios.post(url, {
                        id: item,
                        tagline: this.state.tagline,
                        overview: this.state.overview,
                    })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
            }))

            //Ambil lagi data dari database yang sudah baru
            axios.get('http://localhost:5001/allmovies')
            .then((ambilData) => {
                console.log(ambilData);
                this.setState({
                    semuaMovies:ambilData.data,
                })
            })
            console.log(this.state.semuaMovies)
        })


        
    };
        
  render() { 

    const dataKu = this.state.semuaMovies.map((item, index)=>{
        return ( 
            <div class="card" >
                <img class="card-img-top" src={item.poster} alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">{item.movie_name}</h5>
                    <small class="text-muted">Last updated 3 mins ago</small>
                </div>
                <div class="card-footer">
                    <Link to={'/movie/' + item.moviedb_id}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
        );
    })
    console.log(dataKu)
    
    return (
      <div className="NOWPLAYING">
        <div className="mt-nowplaying-title">
            <h1 align="center">NOW PLAYING</h1>
        </div>
        
        <div class="card-columns">
            {dataKu}
        </div>
        
      </div>
    );
  }
}

export default NowPlaying;