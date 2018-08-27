import React, { Component } from 'react';
import '../style/MovieDetails.css'

// Modules
import axios from 'axios';
import { Link } from 'react-router-dom';

//REDUX
import { connect } from 'react-redux';

//Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {
            //Untuk menyimpan moviedb_id movie yang dipilih
            movieSelected: '',

            //Untuk menyimpan cookie (true/false)
            cookie: '',

            //Untuk filter
            cityMovies: [],
            providerMovies: [],
            cinemaMovies: [],
            chooseCity: 'Choose City',
            chooseProvider: 'Choose Provider',
            chooseCinema: 'Choose Cinema',

            //Untuk konten movie
            moviePoster: '',
            movieTitle: '',
            movieOverview: '',

            //Screening
            screeningSchedule: [], // state to store available screening schedule from database
            screeningSelected: '', // state to store screening selected

            //Reservation
            seat: [], // state to store selected seats by user
            theater: '',
            price: '-',
            total_price: '-',

            // state to uncheck the booked seat
            uncheckA1: false,
            uncheckA2: false,
            uncheckA3: false,
            uncheckA4: false,
            uncheckA5: false,
            uncheckB1: false,
            uncheckB2: false,
            uncheckB3: false,
            uncheckB4: false,
            uncheckB5: false,
            uncheckC1: false,
            uncheckC2: false,
            uncheckC3: false,
            uncheckC4: false,
            uncheckC5: false,
            uncheckD1: false,
            uncheckD2: false,
            uncheckD3: false,
            uncheckD4: false,
            uncheckD5: false,

            //LOGIN & REGISTRATION
            email: '',
            password: '',
            emailregister: '',
            passwordregister: '',
            passwordregisterconfirm: '',

            

        };
        this.klik = this.klik.bind(this);
    };

    //Get movie id, city, & check cookies
    componentWillMount() {

        //Get movie id 
        this.setState({
            movieSelected: this.props.match.params.id
        })

        //Check cookies
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')
        console.log(cookiePeramban)
        
        var url = 'http://localhost:5001/cookie';
        axios.post(url, {
            cookieMovietime: cookiePeramban,
        })
        .then((response) => {
            // console.log(response);
            // console.log(response.data.kode)
            if (response.data.kode == '001'){
                this.setState({
                    cookie: true,
                })
            }
            else if (response.data.kode == '002'){
                this.setState({
                    cookie: false,
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //Get moviedb API & window scroll to
    componentDidMount() {

        //Get moviedb.org content
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movieSelected}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movieSelected}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle: ambilData.data.original_title,
                movieOverview: ambilData.data.overview,
            })
        })

        //Ambil daftar kota
        var url = 'http://localhost:5001/citymd';
        console.log(this.state.movieSelected)
        axios.post(url, {
            moviedb_id: this.state.movieSelected,
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                cityMovies: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });

        // Cek apakah ada global state untuk filter dari home
        this.cekRedux()

        // Supaya halaman mulai dari atas
        window.scrollTo(0, 0)        
    };

    cekRedux(){
        this.providerFilter(this.props.city)
        this.cinemaFilter(this.props.provider)
        this.screeningFilter(this.props.cinema)
    }

    //Untuk mengambil daftar provider dari movie & kota yang dipilih
    providerFilter(city){
        //Ganti state chooseCity
        this.setState({
            chooseCity: city,
            chooseProvider: 'Choose Provider',
            chooseCinema: 'Choose Cinema',
        })

        //Ambil daftar provider dari kota yang dipilih
        let cityUser = city;
        var url = 'http://localhost:5001/providermd';
        // console.log(cityUser)
        axios.post(url, {
            moviedb_id: this.state.movieSelected,
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

    //Untuk mengambil daftar cinema dari movie, kota & provider yang dipilih
    cinemaFilter(provider){
        //Ganti state chooseCity
        this.setState({
            chooseProvider: provider,
            chooseCinema : 'Choose Cinema',
        })

        //Ambil daftar cinema dari kota & provider yang dipilih
        let providerUser = provider;
        var url = 'http://localhost:5001/cinemamd';
        // console.log(this.state.chooseCity)
        // console.log(providerUser)
        axios.post(url, {
            moviedb_id: this.state.movieSelected,
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

    //Untuk mengambil daftar screening dari movie & cinema yang dipilih
    screeningFilter(cinema){
        //Ganti state chooseCity
        this.setState({
            chooseCinema: cinema,
        })

        // //Get screening schedule (lama)
        // axios.get(`http://localhost:5001/movie/${this.state.movieSelected}`)
        // .then((response) => {          
        //   this.setState({
        //     screeningSchedule: response.data,
        //   })            
        // })

        let cinemaUser = cinema;

        //Ambil daftar movie dari cinema yang dipilih
        var url = 'http://localhost:5001/screening';
        // console.log(this.state.movieSelected)
        // console.log(cinemaUser)

        axios.post(url, {
            moviedb_id: this.state.movieSelected,
            cinema: cinemaUser,
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                screeningSchedule: response.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //Untuk menghapus semua pilihan filter
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

    // To disabled checkbox which booked + get theater_id and price
    klik(screening_id){
        // To get all the checkbox available to check again when user change schedule + erase post action
        this.setState({
            uncheckA1: false,
            uncheckA2: false,
            uncheckA3: false,
            uncheckA4: false,
            uncheckA5: false,
            uncheckB1: false,
            uncheckB2: false,
            uncheckB3: false,
            uncheckB4: false,
            uncheckB5: false,
            uncheckC1: false,
            uncheckC2: false,
            uncheckC3: false,
            uncheckC4: false,
            uncheckC5: false,
            uncheckD1: false,
            uncheckD2: false,
            uncheckD3: false,
            uncheckD4: false,
            uncheckD5: false,
            screeningSelected: screening_id,
        })
        console.log(screening_id)
        axios.get(`http://localhost:5001/seat/${screening_id}`)
        .then((ambilData) => {
            // For uncheck seat that have been booked (change the state)
            const hehe = ambilData.data.map((item, index)=>{
                let seatId = item.seat_id;
                let seatId_potong = seatId.substr(5,2);
                let seatId_potong2 = `uncheck${seatId_potong}`
                this.setState({
                    [seatId_potong2]: true, // [seatId_potong2] adalah dynamic key, bisa dilihat di https://stackoverflow.com/questions/46771248/react-setstate-with-dynamic-key
                })
            })
        })
        
        // For take theater & price
        axios.get(`http://localhost:5001/price/${screening_id}`)
        .then((ambilData) => {
            this.setState({
                theater: ambilData.data[0].theater_id, 
                price: ambilData.data[0].price, 
            })
        })
    };

    //Function to add & remove seat selected to/from state
    seat(choice){
        // console.log(this.state.theater);
        // console.log(this.state.price);

        let seatChoice = this.state.seat;
        let indeksSeat = '';

        for (let i=0; i<seatChoice.length; i++){
            if (seatChoice[i] === choice){
                indeksSeat = i;
            } 
        }
        
        if (indeksSeat !== '') {
            seatChoice.splice(indeksSeat, 1);
            this.setState({seat: seatChoice});
        } else {
            // console.log(`Ga ada nih, mesti nambah donk`)
            this.setState({ 
                seat: this.state.seat.concat(choice)
            })
        }
    };
    
    //Function to calculate total price
    totalPrice(){
        let total_price = (parseInt(this.state.seat.length) * (parseInt(this.state.price)));
        return total_price;
    };

    //Function to login
    login(){
        var url = 'http://localhost:5001/login';
        axios.post(url, {
          email: this.refs.emaillogin.value,
          password: this.refs.passwordlogin.value
        })
        .then((response) => {
          console.log(response);
          if (response.data.kode == '001'){
            cookies.set('MOVIETIME_SESSID', response.data.session_id)

            this.setState({
                email:this.refs.emaillogin.value,
                password:this.refs.passwordlogin.value,
            });
            console.log(`Ini setelah berahasil register ${this.state.email}`)
            this.createReservation();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    //Function to register
    register(){
        var url = 'http://localhost:5001/register';
        axios.post(url, {
          email: this.refs.emailregister.value,
          password: this.refs.passwordregister.value,
          passwordConfirm: this.refs.passwordregisterconfirm.value
        })
        .then((response) => {
          console.log(`Ini response register: ${response.data}`);
          if (response.data.kode == '001'){
            cookies.set('MOVIETIME_SESSID', response.data.session_id)

            this.setState({
                email:this.refs.emailregister.value,
                password:this.refs.passwordregister.value,
                passwordconfirm:this.refs.passwordregisterconfirm.value,
                cookie: true
            });

            console.log(`Ini setelah berahasil register ${this.state.email}`)
            this.createReservation();
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Function to create reservation
    createReservation() {
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')        

        var url = 'http://localhost:5001/createreservation';
        axios.post(url, {
            cookie: cookiePeramban,
            screening: this.state.screeningSelected,
            theater: this.state.theater,
            total_seats: (this.state.seat).length,
            price: this.state.price,
            total_price: this.totalPrice(),
            seat: this.state.seat,
        })
        .then((response) => {
            console.log(`Berhasil!`)
                this.setState({
                    cookie: true
                });

            window.location.reload();
            window.location.replace('/summary');

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        //Untuk mencetak daftar kota
        const city = this.state.cityMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.providerFilter(item.city)}} class="dropdown-item" type="button">{item.city}</button>
            );
        })

        //Untuk mencetak daftar provider
        const provider = this.state.providerMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.cinemaFilter(item.provider)}} class="dropdown-item" type="button">{item.provider}</button>
            );
        })

        //Untuk mencetak daftar cinema
        const cinema = this.state.cinemaMovies.map((item, index)=>{
            return ( 
                <button onClick={()=>{this.screeningFilter(item.name)}} class="dropdown-item" type="button">{item.name}</button>
            );
        })

        //Show screening schedule in neat view
        const screeningDay =this.state.screeningSchedule.map((item, index)=>{

            let day = item.day;
            let date_time_raw = item.date_time;
            let date_time_year = date_time_raw.substr(0, 4);
            let date_time_month = date_time_raw.substr(5, 2);
            let date_time_date = date_time_raw.substr(8, 2);

            let date = new Date(item.date_time);
            let date_time_hour = date.getHours();
            let date_time_minute = date.getMinutes();
            let date_time_second = date.getSeconds();
            
            switch (date_time_month) {
                case '01':
                    date_time_month = 'January';
                    break;
                case '02':
                    date_time_month = 'February';
                    break;
                case '03':
                    date_time_month = 'March';
                    break;
                case '04':
                    date_time_month = 'April';
                    break;
                case '05':
                    date_time_month = 'May';
                    break;
                case '06':
                    date_time_month = 'June';
                    break;
                case '07':
                    date_time_month = 'July';
                    break;
                case '08':
                    date_time_month = 'August';
                    break;
                case '09':
                    date_time_month = 'September';
                    break;
                case '10':
                    date_time_month = 'October';
                    break;
                case '11':
                    date_time_month = 'November';
                    break;
                case '12':
                    date_time_month = 'December';
                    break;
                default:
                    break;
            }        

            return <option value={item.id} key={index}>{day}, {date_time_date} {date_time_month} {date_time_year} pk. {date_time_hour}:0{date_time_minute}</option>
        })

        // Untuk memunculkan tampilan jika sudah login
        if (this.state.cookie == true){
            return (
                <div className="MOVIEDETAILS">
                    <div className="mt-moviedetails-movie">
                        <div className="mt-moviedetails-movie-image">
                            <img className="" src={this.state.moviePoster} height="500px" alt="" /> 
                        </div>
        
                        <div className="mt-moviedetails-movie-description">
                            <h1>{this.state.movieTitle}</h1>
                            <br />
                            <p><strong>Synopsis</strong></p>
                            <p>{this.state.movieOverview}</p>
                           
                            <h2>Choose your schedule</h2>
                            <div className="mt-moviedetails-schedule">
                                <select  onChange={(e) => this.klik(e.target.value)} className="custom-select">
                                    <option selected>Day</option>
                                    { screeningDay }
                                </select>
                                <br />
                            </div>
                            <br />
                            <h2>Choose your seats</h2>
                            <div className="mt-moviedetails-seats ">
                                <div className="kotak-A">A</div>
                                <div className="kotak-A1">
                                    <input type='checkbox' disabled={this.state.uncheckA1} onClick={()=>{this.seat('A1');}} />
                                    1
                                </div>
                                <div className="kotak-A2">
                                    <input type='checkbox' disabled={this.state.uncheckA2} onClick={()=>{this.seat('A2');}}  />
                                    2
                                </div>
                                <div className="kotak-A3">
                                    <input type='checkbox' disabled={this.state.uncheckA3} onClick={()=>{this.seat('A3');}} />
                                    3
                                </div>
                                <div className="kotak-A4">
                                    <input type='checkbox' disabled={this.state.uncheckA4} onClick={()=>{this.seat('A4');}} />
                                    4
                                </div>
                                <div className="kotak-A5">
                                    <input type='checkbox' disabled={this.state.uncheckA5} onClick={()=>{this.seat('A5');}} />
                                    5
                                </div>
                                <div className="kotak-B">B</div>
                                <div className="kotak-B1">
                                    <input type='checkbox' disabled={this.state.uncheckB1} onClick={()=>{this.seat('B1');}} />
                                    1
                                </div>
                                <div className="kotak-B2">
                                    <input type='checkbox' disabled={this.state.uncheckB2} onClick={()=>{this.seat('B2');}} />
                                    2
                                </div>
                                <div className="kotak-B3">
                                    <input type='checkbox' disabled={this.state.uncheckB3} onClick={()=>{this.seat('B3');}} />
                                    3
                                </div>
                                <div className="kotak-B4">
                                    <input type='checkbox' disabled={this.state.uncheckB4} onClick={()=>{this.seat('B4');}} />
                                    4
                                </div>
                                <div className="kotak-B5">
                                    <input type='checkbox' disabled={this.state.uncheckB5} onClick={()=>{this.seat('B5');}} />
                                    5
                                </div>
                                <div className="kotak-C">C</div>
                                <div className="kotak-C1">
                                    <input type='checkbox' disabled={this.state.uncheckC1} onClick={()=>{this.seat('C1');}} />
                                    1
                                </div>
                                <div className="kotak-C2">
                                    <input type='checkbox' disabled={this.state.uncheckC2} onClick={()=>{this.seat('C2');}} />
                                    2
                                </div>
                                <div className="kotak-C3">
                                    <input type='checkbox' disabled={this.state.uncheckC3} onClick={()=>{this.seat('C3');}} />
                                    3
                                </div>
                                <div className="kotak-C4">
                                    <input type='checkbox' disabled={this.state.uncheckC4} onClick={()=>{this.seat('C4');}} />
                                    4
                                </div>
                                <div className="kotak-C5">
                                    <input type='checkbox' disabled={this.state.uncheckC5} onClick={()=>{this.seat('C5');}} />
                                    5
                                </div>
                                <div className="kotak-D">D</div>
                                <div className="kotak-D1">
                                    <input type='checkbox' disabled={this.state.uncheckD1} onClick={()=>{this.seat('D1');}} />
                                    1
                                </div>
                                <div className="kotak-D2">
                                    <input type='checkbox' disabled={this.state.uncheckD2} onClick={()=>{this.seat('D2');}} />
                                    2
                                </div>
                                <div className="kotak-D3">
                                    <input type='checkbox' disabled={this.state.uncheckD3} onClick={()=>{this.seat('D3');}} />
                                    3
                                </div>
                                <div className="kotak-D4">
                                    <input type='checkbox' disabled={this.state.uncheckD4} onClick={()=>{this.seat('D4');}} />
                                    4
                                </div>
                                <div className="kotak-D5">
                                    <input type='checkbox' disabled={this.state.uncheckD5} onClick={()=>{this.seat('D5');}} />
                                    5
                                </div>
                            </div>
                            <br />
                            
                            <center>
                                <div className="mt-moviedetails-seats-screen">
                                    <p align="center">SCREEN</p>
                                </div>
                            </center>
                            <br />
                            <br />
        
                            <div className="mt-summary-booking">
                                <table>
                                    
                                    <tr>
                                        <td>Seat(s) selected</td>
                                        <td>: {this.state.seat.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Seats</td>
                                        <td>: {this.state.seat.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Price per Ticket</td>
                                        <td>: Rp {this.state.price}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>TOTAL</strong></td>
                                        <td><strong>: Rp {this.totalPrice()}</strong></td>
                                    </tr>
                                </table>
                            </div>
                            <br />

                            <button type="button" class="btn btn-warning" onClick={()=> {this.createReservation();}}>
                                BUY TICKET
                            </button>

                        </div>
                    </div>
                </div>
                );
        }

        return (
        <div className="MOVIEDETAILS">
            <div className="mt-moviedetails-movie">
                <div className="mt-moviedetails-movie-image">
                    <img className="" src={this.state.moviePoster} height="500px" alt="" /> 
                </div>

                <div className="mt-moviedetails-movie-description">
                    <h1>{this.state.movieTitle}{this.state.cookie}</h1>
                    <br />
                    <p><strong>Synopsis</strong></p>
                    <p>{this.state.movieOverview}</p>
                    <br />
                   
                    <h2>Choose your cinema</h2>
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
                    <br />

                    <h2>Choose your schedule</h2>
                    <div className="mt-moviedetails-schedule">
                        <select  onChange={(e) => this.klik(e.target.value)} className="custom-select">
                            <option selected>Day</option>
                            { screeningDay }
                        </select>
                        <br />
                    </div>
                    <br />

                    <h2>Choose your seats</h2>
                    <div className="mt-moviedetails-seats ">
                        <div className="kotak-A">A</div>
                        <div className="kotak-A1">
                            <input type='checkbox' disabled={this.state.uncheckA1} onClick={()=>{this.seat('A1');}} />
                            1
                        </div>
                        <div className="kotak-A2">
                            <input type='checkbox' disabled={this.state.uncheckA2} onClick={()=>{this.seat('A2');}}  />
                            2
                        </div>
                        <div className="kotak-A3">
                            <input type='checkbox' disabled={this.state.uncheckA3} onClick={()=>{this.seat('A3');}} />
                            3
                        </div>
                        <div className="kotak-A4">
                            <input type='checkbox' disabled={this.state.uncheckA4} onClick={()=>{this.seat('A4');}} />
                            4
                        </div>
                        <div className="kotak-A5">
                            <input type='checkbox' disabled={this.state.uncheckA5} onClick={()=>{this.seat('A5');}} />
                            5
                        </div>
                        <div className="kotak-B">B</div>
                        <div className="kotak-B1">
                            <input type='checkbox' disabled={this.state.uncheckB1} onClick={()=>{this.seat('B1');}} />
                            1
                        </div>
                        <div className="kotak-B2">
                            <input type='checkbox' disabled={this.state.uncheckB2} onClick={()=>{this.seat('B2');}} />
                            2
                        </div>
                        <div className="kotak-B3">
                            <input type='checkbox' disabled={this.state.uncheckB3} onClick={()=>{this.seat('B3');}} />
                            3
                        </div>
                        <div className="kotak-B4">
                            <input type='checkbox' disabled={this.state.uncheckB4} onClick={()=>{this.seat('B4');}} />
                            4
                        </div>
                        <div className="kotak-B5">
                            <input type='checkbox' disabled={this.state.uncheckB5} onClick={()=>{this.seat('B5');}} />
                            5
                        </div>
                        <div className="kotak-C">C</div>
                        <div className="kotak-C1">
                            <input type='checkbox' disabled={this.state.uncheckC1} onClick={()=>{this.seat('C1');}} />
                            1
                        </div>
                        <div className="kotak-C2">
                            <input type='checkbox' disabled={this.state.uncheckC2} onClick={()=>{this.seat('C2');}} />
                            2
                        </div>
                        <div className="kotak-C3">
                            <input type='checkbox' disabled={this.state.uncheckC3} onClick={()=>{this.seat('C3');}} />
                            3
                        </div>
                        <div className="kotak-C4">
                            <input type='checkbox' disabled={this.state.uncheckC4} onClick={()=>{this.seat('C4');}} />
                            4
                        </div>
                        <div className="kotak-C5">
                            <input type='checkbox' disabled={this.state.uncheckC5} onClick={()=>{this.seat('C5');}} />
                            5
                        </div>
                        <div className="kotak-D">D</div>
                        <div className="kotak-D1">
                            <input type='checkbox' disabled={this.state.uncheckD1} onClick={()=>{this.seat('D1');}} />
                            1
                        </div>
                        <div className="kotak-D2">
                            <input type='checkbox' disabled={this.state.uncheckD2} onClick={()=>{this.seat('D2');}} />
                            2
                        </div>
                        <div className="kotak-D3">
                            <input type='checkbox' disabled={this.state.uncheckD3} onClick={()=>{this.seat('D3');}} />
                            3
                        </div>
                        <div className="kotak-D4">
                            <input type='checkbox' disabled={this.state.uncheckD4} onClick={()=>{this.seat('D4');}} />
                            4
                        </div>
                        <div className="kotak-D5">
                            <input type='checkbox' disabled={this.state.uncheckD5} onClick={()=>{this.seat('D5');}} />
                            5
                        </div>
                    </div>
                    <br />
                    
                    <center>
                        <div className="mt-moviedetails-seats-screen">
                            <p align="center">SCREEN</p>
                        </div>
                    </center>
                    <br />
                    <br />

                    <div className="mt-summary-booking">
                    <h1>SUMMARY</h1>
                        <table>
                            <tr>
                                <td>Seat(s) selected</td>
                                <td>: {this.state.seat.toString()}</td>
                            </tr>
                            <tr>
                                <td>Total Seats</td>
                                <td>: {this.state.seat.length}</td>
                            </tr>
                            <tr>
                                <td>Price per Ticket</td>
                                <td>: Rp {this.state.price}</td>
                            </tr>
                            <tr>
                                <td><strong>TOTAL</strong></td>
                                <td><strong>: Rp {this.totalPrice()}</strong></td>
                            </tr>
                        </table>
                    </div>
                    <br />

                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">
                    BUY TICKET
                    </button>
                </div>
            </div>

            {/* Modal */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">LOGIN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Please login to continue</p>
                    <input type='text' placeholder=' Email' ref="emaillogin" />
                    <br />
                    <br />
                    <input type='password' placeholder=' Password' ref="passwordlogin" />
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={()=> {this.login();}}>LOG IN</button>
                    <br />
                    <br />
                    <p>Don't have account? Register now</p>
                    <input type='text' placeholder=' Email' ref="emailregister" />
                    <br />
                    <br />
                    <input type='password' placeholder=' Password' ref="passwordregister" />
                    <br />
                    <br />
                    <input type='password' placeholder=' Confirm Pasword' ref="passwordregisterconfirm" />
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={()=> {this.register();}}>SIGN UP</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
  }
}

const mapStateToProps = (state) => {
    const city = state.city;
    const provider = state.provider;
    const cinema = state.cinema;

    return { city, provider, cinema };
  }

export default connect(mapStateToProps)(MovieDetails);

