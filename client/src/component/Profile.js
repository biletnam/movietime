import React, { Component } from 'react';
import '../style/Profile.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

import Countdown from 'react-countdown-now';

//Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            passwordConfirmWarning: ``,
            passwordConfirmSuccess: '',
            myReservation: [],
            email: '-',
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
        // Supaya halaman mulai dari atas
        window.scrollTo(0, 0)  

        //Untuk ambil email
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')        
        var urlProfile = 'http://localhost:5001/myprofile';
        axios.post(urlProfile, {
            cookie: cookiePeramban,
        })
        .then((response) => {
            this.setState({
                email: response.data[0].email,
            })
        })
        .catch(function (error) {
            console.log(error);
        });


        var url = 'http://localhost:5001/myreservation';
        axios.post(url, {
            cookie: cookiePeramban,
        })
        .then((response) => {
            console.log(response)
            this.setState({
                myReservation: response.data,
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

    changeEmail(){
        // console.log(this.refs.changeEmail.value)
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')        

        var urlProfile = 'http://localhost:5001/changeemail';
        axios.post(urlProfile, {
            cookie: cookiePeramban,
            email: this.refs.changeEmail.value,
        })
        .then(() => {
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    changePassword(){
        // console.log(this.refs.changePassword.value)
        // console.log(this.refs.changePasswordConfirm.value)

        let password = this.refs.changePassword.value;
        let passwordConfirm = this.refs.changePasswordConfirm.value;

        // console.log(password);
        // console.log(passwordConfirm);

        if (password != passwordConfirm) {
            this.setState({
                passwordConfirmWarning: `Password doesn't match!`
            })
        } else if (password == passwordConfirm){
            let cookiePeramban = cookies.get('MOVIETIME_SESSID')        

            var urlProfile = 'http://localhost:5001/changepassword';
            axios.post(urlProfile, {
                cookie: cookiePeramban,
                password: this.refs.changePassword.value,
                passwordConfirm: this.refs.changePasswordConfirm.value,
            })
            .then(() => {
                this.setState({
                    passwordConfirmSuccess: `Password change successful!`
                })
                alert(this.state.passwordConfirmSuccess)
                window.location.reload();

            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render(){

        // Untuk reload halaman jika waktu sudah habis
        // Renderer callback with condition
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
            // Render a completed state
            window.location.reload()
            } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
            }
        };

        const myReservation = this.state.myReservation.map((item, index) => {            

            //Untuk timer tiket yang belum dibayar
            let date1 = new Date(item.reserve_date);
            let date_time_milliseconds = date1.getTime();

            console.log(Date.now())
            console.log(this.state.date_time_milliseconds)

            //Untuk menampilkan jadwal yang lebih rapi
            let date_time_year = item.date_time.substr(0, 4);
            let date_time_month = item.date_time.substr(5, 2);
            let date_time_date = item.date_time.substr(8, 2);

            let date = new Date(item.date_time);
            let date_time_hour = date.getHours();
            let date_time_minute = date.getMinutes();
            
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


            if (item.active == 0){
                return (
                    <div class="card" key={index}>
                        <img class="card-img-top" src={item.poster} />
                        <div class="card-body">
                            <h5 class="card-title">{item.movie_name}</h5>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{date_time_date} {date_time_month} {date_time_year}</td>
                                    </tr>
                                    <tr>
                                        <td>{date_time_hour}:0{date_time_minute}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.provider} - {item.name}</td>
                                    </tr>                            
                                    <tr>
                                        <td>{item.city}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.theater_name}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.seat}</td>
                                    </tr>
                                    <tr>
                                        <td>Rp {item.total_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <br />
                            <p>This reservation will be expired in :</p>
                            <Countdown
                                date={date_time_milliseconds + 900000}
                                renderer={renderer}
                            />
                            <br />
                            <Link to={'/summary'}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">PAY NOW</button></Link>                
                        </div>
                    </div>
                )
            }

            else {
                return (
                    <div class="card" key={index}>
                        <img class="card-img-top" src={item.poster} />
                        <div class="card-body">
                            <h5 class="card-title">{item.movie_name}</h5>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{date_time_date} {date_time_month} {date_time_year}</td>
                                    </tr>
                                    <tr>
                                        <td>{date_time_hour}:0{date_time_minute}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.provider} - {item.name}</td>
                                    </tr>                            
                                    <tr>
                                        <td>{item.city}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.theater_name}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.seat}</td>
                                    </tr>
                                    <tr>
                                        <td>Rp {item.total_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <br />
                        </div>
                    </div>
                )
            }
            
        })

        return(
            <div className="PROFILE">
                <center>
                    <h1>Hello, {this.state.email}</h1>
                    <br />
                    <br />
                </center>
                <div class="row">
                    <div class="col-3">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-home" aria-selected="true">My Profile</a>
                            <a class="nav-link" id="v-pills-reservation-tab" data-toggle="pill" href="#v-pills-reservation" role="tab" aria-controls="v-pills-profile" aria-selected="false">My Reservation</a>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <p>Wanna change your profile?</p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label>Email</label></td>
                                            <td>: <input ref="changeEmail" type="email" class="input-xlarge" /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right"><button onClick={()=> {this.changeEmail()}} className="btn btn-success">Change Email</button></td>
                                        </tr>
                                        <tr height="50px">
                                            <td colspan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><label>Password</label></td>
                                            <td>: <input ref="changePassword" type="password" class="input-xlarge" /></td>
                                        </tr>
                                        <tr>
                                            <td><label>Confirm Password</label></td>
                                            <td>: <input ref="changePasswordConfirm" type="password" class="input-xlarge" /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right"><button onClick={()=> {this.changePassword()}} className="btn btn-success">Change Password</button></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">{this.state.passwordConfirmWarning}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="v-pills-reservation" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <div class="card-columns">
                                   {myReservation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default Profile;