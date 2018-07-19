import React, { Component } from 'react';
import '../style/MovieDetails.css'
import Header from './Header';
import Footer from './Footer';

class MovieDetails extends Component {
  render() {
    return (
      <div className="MovieDetails">
        <Header />
        <div className="mt-movie">
            <div className="mt-movie-image">
                <img className="" src={require('../img/nowplaying/bXrZ5iHBEjH7WMidbUDQ0U2xbmr.jpg')} height="500px" alt="" /> 
            </div>

            <div className="mt-movie-description">
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
                <div className="mt-schedule">
                    <select className="custom-select">
                        <option selected>Day</option>
                        <option value="1">Monday, July 18</option>
                        <option value="2">Tuesday, July 19</option>
                        <option value="3">Wednesday, July 20</option>
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
                <div className="mt-seats">
                    <div className="kotak-A">A</div>
                    <div className="kotak-A1">1</div>
                    <div className="kotak-A2">2</div>
                    <div className="kotak-A3">3</div>
                    <div className="kotak-A4">4</div>
                    <div className="kotak-A5">5</div>
                    <div className="kotak-A6">6</div>
                    <div className="kotak-A7">7</div>
                    <div className="kotak-A8">8</div>
                    <div className="kotak-A9">9</div>
                    <div className="kotak-B">B</div>
                    <div className="kotak-B1">1</div>
                    <div className="kotak-B2">2</div>
                    <div className="kotak-B3">3</div>
                    <div className="kotak-B4">4</div>
                    <div className="kotak-B5">5</div>
                    <div className="kotak-B6">6</div>
                    <div className="kotak-B7">7</div>
                    <div className="kotak-B8">8</div>
                    <div className="kotak-B9">9</div>
                    <div className="kotak-C">C</div>
                    <div className="kotak-C1">1</div>
                    <div className="kotak-C2">2</div>
                    <div className="kotak-C3">3</div>
                    <div className="kotak-C4">4</div>
                    <div className="kotak-C5">5</div>
                    <div className="kotak-C6">6</div>
                    <div className="kotak-C7">7</div>
                    <div className="kotak-C8">8</div>
                    <div className="kotak-C9">9</div>
                    <div className="kotak-D">D</div>
                    <div className="kotak-D1">1</div>
                    <div className="kotak-D2">2</div>
                    <div className="kotak-D3">3</div>
                    <div className="kotak-D4">4</div>
                    <div className="kotak-D5">5</div>
                    <div className="kotak-D6">6</div>
                    <div className="kotak-D7">7</div>
                    <div className="kotak-D8">8</div>
                    <div className="kotak-D9">9</div>
                </div>
                <br />
                
                <center>
                    <div className="mt-seats-screen">
                        <p align="center">SCREEN</p>
                    </div>
                </center>
                <br />
                <div className="mt-summary-booking">
                    <table>
                        
                        <tr>
                            <td>Seat(s) selected</td>
                            <td>: A1, A2, A3</td>
                        </tr>
                        <tr>
                            <td>Total Seats</td>
                            <td>: 3</td>
                        </tr>
                    </table>
                </div>
                <br />
                <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>                
            </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MovieDetails;
