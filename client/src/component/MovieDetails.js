import React, { Component } from 'react';
import '../style/MovieDetails.css'

import axios from 'axios';

// Modules
import { Link } from 'react-router-dom';

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {
            day: [],
            seat: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5001/movie/MV001')
        .then((ambilData) => {          
          this.setState({
            day: ambilData.data
          })            
        })
    }

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

    totalPrice(){
        let total = (parseInt(this.state.seat.length) * 40000);
        return total;
    }

    render() {
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

        return <option value="1" key={index}>{day}, {date_time_date} {date_time_month} {date_time_year} pk. {date_time_hour}:0{date_time_minute}</option>        
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
                    <select className="custom-select">
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
                        <input type='checkbox' onClick={()=>{this.seat('A1');}} />
                        1
                    </div>
                    <div className="kotak-A2">
                        <input type='checkbox' onClick={()=>{this.seat('A2');}}  />
                        2
                    </div>
                    <div className="kotak-A3">
                        <input type='checkbox' onClick={()=>{this.seat('A3');}} />
                        3
                    </div>
                    <div className="kotak-A4">
                        <input type='checkbox' onClick={()=>{this.seat('A4');}} />
                        4
                    </div>
                    <div className="kotak-A5">
                        <input type='checkbox' onClick={()=>{this.seat('A5');}} />
                        5
                    </div>
                    <div className="kotak-B">B</div>
                    <div className="kotak-B1">
                        <input type='checkbox' onClick={()=>{this.seat('B1');}} />
                        1
                    </div>
                    <div className="kotak-B2">
                        <input type='checkbox' onClick={()=>{this.seat('B2');}} />
                        2
                    </div>
                    <div className="kotak-B3">
                        <input type='checkbox' onClick={()=>{this.seat('B3');}} />
                        3
                    </div>
                    <div className="kotak-B4">
                        <input type='checkbox' onClick={()=>{this.seat('B4');}} />
                        4
                    </div>
                    <div className="kotak-B5">
                        <input type='checkbox' onClick={()=>{this.seat('B5');}} />
                        5
                    </div>
                    <div className="kotak-C">C</div>
                    <div className="kotak-C1">
                        <input type='checkbox' onClick={()=>{this.seat('C1');}} />
                        1
                    </div>
                    <div className="kotak-C2">
                        <input type='checkbox' onClick={()=>{this.seat('C2');}} />
                        2
                    </div>
                    <div className="kotak-C3">
                        <input type='checkbox' onClick={()=>{this.seat('C3');}} />
                        3
                    </div>
                    <div className="kotak-C4">
                        <input type='checkbox' onClick={()=>{this.seat('C4');}} />
                        4
                    </div>
                    <div className="kotak-C5">
                        <input type='checkbox' onClick={()=>{this.seat('C5');}} />
                        5
                    </div>
                    <div className="kotak-D">D</div>
                    <div className="kotak-D1">
                        <input type='checkbox' onClick={()=>{this.seat('D1');}} />
                        1
                    </div>
                    <div className="kotak-D2">
                        <input type='checkbox' onClick={()=>{this.seat('D2');}} />
                        2
                    </div>
                    <div className="kotak-D3">
                        <input type='checkbox' onClick={()=>{this.seat('D3');}} />
                        3
                    </div>
                    <div className="kotak-D4">
                        <input type='checkbox' onClick={()=>{this.seat('D4');}} />
                        4
                    </div>
                    <div className="kotak-D5">
                        <input type='checkbox' onClick={()=>{this.seat('D5');}} />
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
                <Link to="/login"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
            </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
