import React, { Component } from 'react';
import '../style/MovieDetails.css'

import Login from './Login'

// Modules
import { Link } from 'react-router-dom';
import axios from 'axios';

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {
            day: [], // state to store available screening schedule from database
            seat: [], // state to store selected seats by user
            seatBooked: [], // state to store booked seats 
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
        };
        this.klik = this.klik.bind(this);
    }

    componentDidMount() {
        //API to get screening schedule
        axios.get('http://localhost:5001/movie/MV001')
        .then((takeData) => {          
          this.setState({
            day: takeData.data
          })            
        })
        
        //API to get available seats
        axios.get('http://localhost:5001/seat/SC180718001')
        .then((ambilData) => {          
          this.setState({
            seatBooked: ambilData.data
          })            
        })
    }

    // To disabled checkbox which booked
    // [seatId_potong2] adalah dynamic key, bisa dilihat di https://stackoverflow.com/questions/46771248/react-setstate-with-dynamic-key
    klik(screening_id){
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
        })

        axios.get(`http://localhost:5001/seat/${screening_id}`)
        .then((ambilData) => {          
            const hehe = ambilData.data.map((item, index)=>{
                let seatId = item.seat_id;
                let seatId_potong = seatId.substr(5,2);
                let seatId_potong2 = `uncheck${seatId_potong}`
                this.setState({
                    [seatId_potong2]: true,
                })
            })   
        })  
    }

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
    }
    
    //Function to calculate total price
    totalPrice(){
        let total = (parseInt(this.state.seat.length) * 40000);
        return total;
    }

    render() {
        //Function to show screening schedule in neat view
        const screeningDay =this.state.day.map((item, index)=>{

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

            return <option value={item.id} key={index}>{item.id} {day}, {date_time_date} {date_time_month} {date_time_year} pk. {date_time_hour}:0{date_time_minute}</option>
        })

        //Function to show seat available
        const seatBookedHit =this.state.seatBooked.map((item, index)=>{
            let seatId = item.seat_id;
            let seatId_potong = seatId.substr(5,2);
            return <p>{seatId_potong}</p>
        })

        return (
        <div className="MOVIEDETAILS">
            <div className="mt-moviedetails-movie">
                <div className="mt-moviedetails-movie-image">
                    <img className="" src={require('../img/nowplaying/bXrZ5iHBEjH7WMidbUDQ0U2xbmr.jpg')} height="500px" alt="" /> 
                </div>

                <div className="mt-moviedetails-movie-description">
                    <h1>Jumanji: Welcome to The Jungle</h1>
                    <br />
                    <p><strong>Synopsis</strong></p>
                    <p>Dracula, Mavis, Johnny and the rest of the Drac Pack take a vacation on a luxury Monster Cruise Ship, where Dracula falls in love with the ship's captain, Ericka, who's secretly a descendant of Abraham Van Helsing, the notorious monster slayer.</p>
                    { seatBookedHit }
                    <table>
                        <tr>
                            <th>Genndy Tartakovsky</th>
                            <th>Michael McCullers</th>
                        </tr>
                        <tr>
                            <td>Director, Writer</td>
                            <td>Writer</td>
                        </tr>
                    </table>
                    <br />
                    <br />
                    <h2>Choose your schedule</h2>
                    <div className="mt-moviedetails-schedule">
                        <select  onChange={(e) => this.klik(e.target.value)} className="custom-select">
                            <option selected>Day</option>
                            { screeningDay }
                        </select>
                        <br />
                        <select className="custom-select">
                            <option selected>Time</option>
                            <option value="1">13.00</option>
                            <option value="2">15.00</option>
                            <option value="3">17.00</option>
                        </select>
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
                    <input type='text' placeholder=' Email' />
                    <br />
                    <br />
                    <input type='email' placeholder=' Password' />
                    <br />
                    <br />
                    <p>Don't have account? Register now</p>
                    <input type='text' placeholder=' Email' />
                    <br />
                    <br />
                    <input type='email' placeholder=' Password' />
                    <br />
                    <br />
                    <input type='email' placeholder=' Confirm Pasword' />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Proceed</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
  }
}

export default MovieDetails;
