import React, { Component } from 'react';
import '../style/Summary.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

//Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Summary extends Component {
    constructor(){
        super();
        this.state = {
            id: '-',
            movie_name: '-',
            day: '-',
            date_time: '-',
            theater_name: '-',
            total_seats: '-',
            seat: '-',
            total_price: '-',
            cinema_name: '-',
            cinema_city: '-',
        }
    }
    componentDidMount(){
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')        

        var url = 'http://localhost:5001/summary';
        axios.post(url, {
            cookie: cookiePeramban,
        })
        .then((response) => {
            console.log(`Summary Berhasil`)
            console.log(response)
            this.setState({
                id: response.data[0].id,
                movie_name: response.data[0].movie_name,
                day: response.data[0].day,
                date_time: response.data[0].date_time,
                theater_name: response.data[0].theater_name,
                total_seats: response.data[0].total_seats,
                seat: response.data[0].seat,
                total_price: response.data[0].total_price,
                cinema_city: response.data[0].city,
                cinema_name: response.data[0].name,
                cinema_provider: response.data[0].provider,
            })
            this.neatSchedule();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    neatSchedule(){
        let date_time_year = this.state.date_time.substr(0, 4);
        let date_time_month = this.state.date_time.substr(5, 2);
        let date_time_date = this.state.date_time.substr(8, 2);

        let date = new Date(this.state.date_time);
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
        this.setState({
            date_time_year: date_time_year,
            date_time_month: date_time_month,
            date_time_date: date_time_date,
            date_time_hour: date_time_hour,
            date_time_minute: date_time_minute,
            date_time_second: date_time_second,
        })
    }

    render(){
        return(
            <div className="SUMMARY">
                <center>
                    <h1>Summary</h1>
                    <br />
                    <br />

                    <table>
                        <tbody>
                            <tr>
                                <td>Transaction ID</td>
                                <td>: {this.state.id}</td>
                            </tr>
                            <tr>
                                <td>Movie Name</td>
                                <td>: {this.state.movie_name}</td>
                            </tr>
                            <tr>
                                <td>Schedule</td>
                                <td>: {this.state.day}, {this.state.date_time_date} {this.state.date_time_month} {this.state.date_time_year} pk. {this.state.date_time_hour}:0{this.state.date_time_minute}</td>
                            </tr>
                            <tr>
                                <td>Cinema</td>
                                <td>: {this.state.cinema_provider} - {this.state.cinema_name}</td>
                            </tr><tr>
                                <td>City</td>
                                <td>: {this.state.cinema_city}</td>
                            </tr><tr>
                                <td>Theater</td>
                                <td>: {this.state.theater_name}</td>
                            </tr>
                            <tr>
                                <td>Seat Number</td>
                                <td>: {this.state.seat}</td>
                            </tr>
                            <tr>
                                <td>Total Seat(s)</td>
                                <td>: {this.state.total_seats}</td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>: Rp {this.state.total_price}</td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <br />
                    <br />

                    <Link to="/payment">                               
                        <button type="button" class="btn btn-warning">CHECK OUT</button>
                    </Link>
                </center>
            </div>
        ) 
    }
}
export default Summary;