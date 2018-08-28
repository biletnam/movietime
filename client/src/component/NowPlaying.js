import React, { Component } from 'react';
import '../style/NowPlaying.css';

import { Link } from 'react-router-dom';
import axios from 'axios'

//REDUX
import { connect } from 'react-redux';
import { city } from '../actions';
import { provider } from '../actions';
import { cinema } from '../actions';

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            semuaMovies: [],
            semuaMoviesRaw: [],
            semuaMoviesProcess: [],
            poster: '',
            cityMovies: [],
            providerMovies: [],
            cinemaMovies: [],
            movieMovies: [],
            chooseCity: 'Choose City',
            chooseProvider: 'Choose Provider',
            chooseCinema: 'Choose Cinema',
            searchResult: [],
        };
    }
    
    componentDidMount(){
        axios.get('http://localhost:5001/allmovies')
        .then((ambilData) => {
            // console.log(ambilData);
            
            //Masukkan data mentah dari database ke state array raw
            this.setState({
                semuaMoviesRaw:ambilData.data,
            })
            // console.log(this.state.semuaMoviesRaw);

            //Ambil moviedb_id dan masukkan ke state array process
            this.state.semuaMoviesRaw.map((item) => {
                this.state.semuaMoviesProcess.push(item.moviedb_id);
            })
            // console.log(this.state.semuaMoviesProcess);

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
                        // console.log(response)
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
                        // console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
            }))

            //Ambil lagi data dari database yang sudah baru
            axios.get('http://localhost:5001/allmovies')
            .then((ambilData) => {
                // console.log(ambilData);
                this.setState({
                    semuaMovies:ambilData.data,
                })
            })
            // console.log(this.state.semuaMovies)
        })

        //Ambil daftar kota
        axios.get('http://localhost:5001/city')
        .then((ambilData) => {
            // console.log(ambilData);
            this.setState({
                cityMovies:ambilData.data,
            })
        })
        // console.log(this.state.cityMovies)
    };

    providerFilter(city){
        //Ganti state chooseCity
        this.setState({
            chooseCity: city,
            chooseProvider: 'Choose Provider',
            chooseCinema: 'Choose Cinema',
        })

        //Ambil daftar provider dari kota yang dipilih
        let cityUser = city;
        var url = 'http://localhost:5001/provider';
        // console.log(cityUser)
        axios.post(url, {
            city: cityUser,
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                providerMovies: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    cinemaFilter(provider){
        //Ganti state chooseCity
        this.setState({
            chooseProvider: provider,
            chooseCinema : 'Choose Cinema',
        })

        //Ambil daftar cinema dari kota & provider yang dipilih
        let providerUser = provider;
        var url = 'http://localhost:5001/cinema';
        // console.log(this.state.chooseCity)
        // console.log(providerUser)
        axios.post(url, {
            city: this.state.chooseCity,
            provider: providerUser
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                cinemaMovies: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    movieFilter(cinema){
        //Ganti state chooseCity
        this.setState({
            chooseCinema: cinema,
        })

        let cinemaUser = cinema;

        //Ambil daftar movie dari cinema yang dipilih
        var url = 'http://localhost:5001/movies';
        console.log(cinemaUser)
        axios.post(url, {
            cinema: cinemaUser,
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                semuaMovies: [],
                movieMovies: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });

        //Masukkan pilihan cinema ke global state
        this.props.city(this.state.chooseCity)
        this.props.provider(this.state.chooseProvider)
        this.props.cinema(cinemaUser)
    }

    clearFilter(){
        this.setState({
            providerMovies: [],
            cinemaMovies: [],
            chooseCity: 'Choose City',
            chooseProvider: 'Choose Provider',
            chooseCinema: 'Choose Cinema',
        })
        window.location.reload()
    }

    searchMovie(){
        //Hapus state hasil filter
        this.props.city('Choose City')
        this.props.provider('Choose Provider')
        this.props.cinema('Choose Cinema')

        //Ambil daftar movie berdasarkan kata kunci
        let keywordUser = this.refs.searchBox.value;
        var url = 'http://localhost:5001/search';
        // console.log(keywordUser)
        axios.post(url, {
            keyword: keywordUser,
        })
        .then((response) => {
            console.log(response)
            this.setState({
                semuaMovies: [],
                movieMovies: [],
                providerMovies: [],
                cinemaMovies: [],
                chooseCity: 'Choose City',
                chooseProvider: 'Choose Provider',
                chooseCinema: 'Choose Cinema',
                searchResult: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
        
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

        const city = this.state.cityMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.providerFilter(item.city)}} class="dropdown-item" type="button">{item.city}</button>
            );
        })

        const provider = this.state.providerMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.cinemaFilter(item.provider)}} class="dropdown-item" type="button">{item.provider}</button>
            );
        })

        const cinema = this.state.cinemaMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.movieFilter(item.name)}} class="dropdown-item" type="button">{item.name}</button>
            );
        })

        const movie = this.state.movieMovies.map((item, index)=>{
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

        const search = this.state.searchResult.map((item, index)=>{
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
        
        return (
        <div className="NOWPLAYING">
            <div id="playing" className="mt-nowplaying-title">
                <h1 align="center">NOW PLAYING</h1>
            </div>
            <h4><strong>Filter</strong></h4>

            <div className="filterandsearch">
                <div className="filter">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.chooseCity}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {city}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.chooseProvider}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {provider}
                                    </div>
                                </div>
                            </td>   
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.chooseCinema}                                    
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {cinema}
                                    </div>
                                </div>
                            </td>
                            <td><a onClick={() => {this.clearFilter()}}><u>clear</u></a></td>
                        </tr>
                    </tbody>
                </table>
                    
                </div>

                <div className="search">
                    <table align="right">
                        <tbody>
                            <tr>
                                <td>
                                    <input ref="searchBox" type="text" class="form-control" style={{width: "200px"}} id="searchMovie" aria-describedby="emailHelp" placeholder=""/>
                                </td>
                                <td>
                                    <button onClick={() => {this.searchMovie()}} className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">SEARCH</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <br />
            <br />
            <div class="card-columns">
                {dataKu}
                {movie}
                {search}
            </div>
        </div>
        );
    }
}

export default connect(null, {cinema, provider, city})(NowPlaying);