import React, { Component } from 'react';
import '../style/MovieDetails.css'

// Modules
import axios from 'axios';
import { Link } from 'react-router-dom';

//Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {
            cookie: '',
            movie: '',
            moviePoster: '',
            movieTitle: '',
            movieOverview: '',

            movieSelected: '', // state to store movie selected
            screeningSchedule: [], // state to store available screening schedule from database
            screeningSelected: '', // state to store screening selected
            theater: '',
            seat: [], // state to store selected seats by user

            uncheckA1: false, // state to uncheck the booked seat
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
            email: '',
            password: '',
            emailregister: '',
            passwordregister: '',
            passwordregisterconfirm: '',
        };
        this.klik = this.klik.bind(this);
    };

    //Get movie id & check cookies
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
            console.log(response);
            console.log(response.data.kode)
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

    //Get moviedb API & screening schedule
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

        //Get screening schedule
        axios.get(`http://localhost:5001/movie/${this.state.movieSelected}`)
        .then((takeData) => {          
          this.setState({
            screeningSchedule: takeData.data,
          })            
        })
        
        // Supaya halaman mulai dari atas
        window.scrollTo(0, 0)        
    };

    // To disabled checkbox which booked
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
            
            // For take theater
            let ambilTheater = (ambilData.data[0].seat_id).substr(0,5) 
            console.log(ambilTheater)
            this.setState({
                theater: ambilTheater,
            })
        })  
    };

    //Function to add & remove seat selected to/from state
    seat(choice){
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
            console.log(`Ga ada nih, mesti nambah donk`)
            this.setState({ 
                seat: this.state.seat.concat(choice)
            })
        }
    };
    
    //Function to calculate total price
    totalPrice(){
        let total = (parseInt(this.state.seat.length) * 40000);
        return total;
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
        //   console.log(response.data.kode)
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
        // console.log(this.state.email)
        // console.log(this.state.password)

        var url = 'http://localhost:5001/register';
        axios.post(url, {
          email: this.refs.emailregister.value,
          password: this.refs.passwordregister.value,
          passwordConfirm: this.refs.passwordregisterconfirm.value
        })
        .then((response) => {
          console.log(response);
          if (response.data.kode == '001'){

            this.setState({
                email:this.refs.emailregister.value,
                password:this.refs.passwordregister.value,
                passwordconfirm:this.refs.passwordregisterconfirm.value
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
        console.log(`Ini di create reservation ${this.state.email}`)

        var url = 'http://localhost:5001/createreservation';
        axios.post(url, {
            email: this.state.email,
            password: this.state.password,
            screening: this.state.screeningSelected,
            theater: this.state.theater,
            seat: this.state.seat,
        })
        .then((response) => {
            console.log(`Berhasil!`)
                this.setState({
                    cookie: true
                });

            window.location.reload();
            // console.log(response);
            // window.location.reload()
            // console.log(`Ini setelah berhasil create reservation`)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    
    render() {
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

        // Tes cek cookie (tidak dipakai)
        if (cookies.get('MOVIETIME_SESSID') != undefined) {
            // return (
            //     <div className="MOVIEDETAILS">
            //         <div className="mt-moviedetails-movie">
            //             <div className="mt-moviedetails-movie-image">
            //                 <img className="" src={this.state.moviePoster} height="500px" alt="" /> 
            //             </div>
        
            //             <div className="mt-moviedetails-movie-description">
            //                 <h1>{this.state.movieTitle}</h1>
            //                 <br />
            //                 <p><strong>Synopsis<button onClick={()=> checkCookie()}>Coba</button></strong></p>
            //                 <p>{this.state.movieOverview}</p>
                           
            //                 <h2>Choose your schedule</h2>
            //                 <div className="mt-moviedetails-schedule">
            //                     <select  onChange={(e) => this.klik(e.target.value)} className="custom-select">
            //                         <option selected>Day</option>
            //                         { screeningDay }
            //                     </select>
            //                     <br />
            //                 </div>
            //                 <br />
            //                 <h2>Choose your seats</h2>
            //                 <div className="mt-moviedetails-seats ">
            //                     <div className="kotak-A">A</div>
            //                     <div className="kotak-A1">
            //                         <input type='checkbox' disabled={this.state.uncheckA1} onClick={()=>{this.seat('A1');}} />
            //                         1
            //                     </div>
            //                     <div className="kotak-A2">
            //                         <input type='checkbox' disabled={this.state.uncheckA2} onClick={()=>{this.seat('A2');}}  />
            //                         2
            //                     </div>
            //                     <div className="kotak-A3">
            //                         <input type='checkbox' disabled={this.state.uncheckA3} onClick={()=>{this.seat('A3');}} />
            //                         3
            //                     </div>
            //                     <div className="kotak-A4">
            //                         <input type='checkbox' disabled={this.state.uncheckA4} onClick={()=>{this.seat('A4');}} />
            //                         4
            //                     </div>
            //                     <div className="kotak-A5">
            //                         <input type='checkbox' disabled={this.state.uncheckA5} onClick={()=>{this.seat('A5');}} />
            //                         5
            //                     </div>
            //                     <div className="kotak-B">B</div>
            //                     <div className="kotak-B1">
            //                         <input type='checkbox' disabled={this.state.uncheckB1} onClick={()=>{this.seat('B1');}} />
            //                         1
            //                     </div>
            //                     <div className="kotak-B2">
            //                         <input type='checkbox' disabled={this.state.uncheckB2} onClick={()=>{this.seat('B2');}} />
            //                         2
            //                     </div>
            //                     <div className="kotak-B3">
            //                         <input type='checkbox' disabled={this.state.uncheckB3} onClick={()=>{this.seat('B3');}} />
            //                         3
            //                     </div>
            //                     <div className="kotak-B4">
            //                         <input type='checkbox' disabled={this.state.uncheckB4} onClick={()=>{this.seat('B4');}} />
            //                         4
            //                     </div>
            //                     <div className="kotak-B5">
            //                         <input type='checkbox' disabled={this.state.uncheckB5} onClick={()=>{this.seat('B5');}} />
            //                         5
            //                     </div>
            //                     <div className="kotak-C">C</div>
            //                     <div className="kotak-C1">
            //                         <input type='checkbox' disabled={this.state.uncheckC1} onClick={()=>{this.seat('C1');}} />
            //                         1
            //                     </div>
            //                     <div className="kotak-C2">
            //                         <input type='checkbox' disabled={this.state.uncheckC2} onClick={()=>{this.seat('C2');}} />
            //                         2
            //                     </div>
            //                     <div className="kotak-C3">
            //                         <input type='checkbox' disabled={this.state.uncheckC3} onClick={()=>{this.seat('C3');}} />
            //                         3
            //                     </div>
            //                     <div className="kotak-C4">
            //                         <input type='checkbox' disabled={this.state.uncheckC4} onClick={()=>{this.seat('C4');}} />
            //                         4
            //                     </div>
            //                     <div className="kotak-C5">
            //                         <input type='checkbox' disabled={this.state.uncheckC5} onClick={()=>{this.seat('C5');}} />
            //                         5
            //                     </div>
            //                     <div className="kotak-D">D</div>
            //                     <div className="kotak-D1">
            //                         <input type='checkbox' disabled={this.state.uncheckD1} onClick={()=>{this.seat('D1');}} />
            //                         1
            //                     </div>
            //                     <div className="kotak-D2">
            //                         <input type='checkbox' disabled={this.state.uncheckD2} onClick={()=>{this.seat('D2');}} />
            //                         2
            //                     </div>
            //                     <div className="kotak-D3">
            //                         <input type='checkbox' disabled={this.state.uncheckD3} onClick={()=>{this.seat('D3');}} />
            //                         3
            //                     </div>
            //                     <div className="kotak-D4">
            //                         <input type='checkbox' disabled={this.state.uncheckD4} onClick={()=>{this.seat('D4');}} />
            //                         4
            //                     </div>
            //                     <div className="kotak-D5">
            //                         <input type='checkbox' disabled={this.state.uncheckD5} onClick={()=>{this.seat('D5');}} />
            //                         5
            //                     </div>
            //                 </div>
            //                 <br />
                            
            //                 <center>
            //                     <div className="mt-moviedetails-seats-screen">
            //                         <p align="center">SCREEN</p>
            //                     </div>
            //                 </center>
            //                 <br />
            //                 <br />
        
            //                 <div className="mt-summary-booking">
            //                     <table>
                                    
            //                         <tr>
            //                             <td>Seat(s) selected</td>
            //                             <td>: {this.state.seat.toString()}</td>
            //                         </tr>
            //                         <tr>
            //                             <td>Total Seats</td>
            //                             <td>: {this.state.seat.length}</td>
            //                         </tr>
            //                         <tr>
            //                             <td>Price per Ticket</td>
            //                             <td>: Rp 40.000</td>
            //                         </tr>
            //                         <tr>
            //                             <td><strong>TOTAL</strong></td>
            //                             <td><strong>: Rp {this.totalPrice()}</strong></td>
            //                         </tr>
            //                     </table>
            //                 </div>
            //                 <br />
            //                 {/* <Link to="/login"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                 */}
            //                 {/* Button trigger modal */}
                            
            //                 <button type="button" class="btn btn-warning">
            //                 BUY TICKET
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            //     );
        }

        // Cek cookie
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
                                        <td>: Rp 40.000</td>
                                    </tr>
                                    <tr>
                                        <td><strong>TOTAL</strong></td>
                                        <td><strong>: Rp {this.totalPrice()}</strong></td>
                                    </tr>
                                </table>
                            </div>
                            <br />

                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#summary" data-backdrop='false'>
                                BUY TICKET
                            </button>
                        </div>
                    </div>


                    {/* Modal */}
                    <div class="modal fade" id="summary" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">SUMMARY</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Movie Name</td>
                                            <td>: {this.state.movieTitle}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>Schedule</td>
                                            <td>: {this.state.screeningSelected}</td>
                                        </tr> */}
                                        <tr>
                                            <td>Theater</td>
                                            <td>: {this.state.theater}</td>
                                        </tr>
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
                                            <td>: Rp 40.000</td>
                                        </tr>
                                        <tr>
                                            <td><strong>TOTAL</strong></td>
                                            <td><strong>: Rp {this.totalPrice()}</strong></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                                <br />
                                <br />

                                <Link to="/payment">                               
                                    <button type="button" class="btn btn-warning">CHECK OUT</button>
                                </Link>
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
                                <td>: Rp 40.000</td>
                            </tr>
                            <tr>
                                <td><strong>TOTAL</strong></td>
                                <td><strong>: Rp {this.totalPrice()}</strong></td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    {/* <Link to="/login"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                 */}
                    {/* Button trigger modal */}

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
                    <input type='text' placeholder=' Email' ref="emaillogin" value="andi@yahoo.com" />
                    <br />
                    <br />
                    <input type='email' placeholder=' Password' ref="passwordlogin" value="andi1234" />
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={()=> {this.login();}}>LOG IN</button>
                    <br />
                    <br />
                    <p>Don't have account? Register now</p>
                    <input type='text' placeholder=' Email' ref="emailregister" />
                    <br />
                    <br />
                    <input type='email' placeholder=' Password' ref="passwordregister" />
                    <br />
                    <br />
                    <input type='email' placeholder=' Confirm Pasword' ref="passwordregisterconfirm" />
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

export default MovieDetails;
