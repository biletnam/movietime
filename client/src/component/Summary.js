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
            })
            console.log(this.state.id)
            console.log(this.state.movie_name)
            console.log(this.state.day)


        })
        .catch(function (error) {
            console.log(error);
        });
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
                                <td>: {this.state.day} {this.state.date_time}</td>
                            </tr>
                            <tr>
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