import React, { Component } from 'react';
import '../style/Summary.css';

import { Link } from 'react-router-dom'

class Summary extends Component {
    // componentDidMount(){
    //     axios.get(`http://localhost:5001/movie/summary`)
    //     .then((ambilData) => {          
    //       this.setState({
    //         screeningSchedule: ambilData.data,
    //       })            
    //     })
    // }
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
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Movie Name</td>
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Schedule</td>
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Theater</td>
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Seat Number</td>
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Total Seat(s)</td>
                                <td>: Transaction ID</td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>: Transaction ID</td>
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