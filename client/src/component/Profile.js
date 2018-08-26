import React, { Component } from 'react';
import '../style/Profile.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

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
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')        

        var urlProfile = 'http://localhost:5001/profile';
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

        var url = 'http://localhost:5001/summaryprofile';
        axios.post(url, {
            cookie: cookiePeramban,
        })
        .then((response) => {
            // console.log(response)
            this.setState({
                myReservation: response.data,
            })
            // this.setState({
            //     id: response.data[0].id,
            //     movie_name: response.data[0].movie_name,
            //     day: response.data[0].day,
            //     date_time: response.data[0].date_time,
            //     theater_name: response.data[0].theater_name,
            //     total_seats: response.data[0].total_seats,
            //     seat: response.data[0].seat,
            //     total_price: response.data[0].total_price,
            // })
        })
        .catch(function (error) {
            console.log(error);
        });

        // var urlReservation = 'http://localhost:5001/myreservation';
        // axios.post(urlReservation, {
        //     cookie: cookiePeramban,
        // })
        // .then((response) => {
        //     console.log(response)
        //     this.setState({
        //         myReservation: response.data,
        //     })
        //     console.log(this.state.myReservation)
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
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
        const myReservation = this.state.myReservation.map((item, index) => {
            return <tr key={index}><td>{item.id}</td><td>{item.reserve_date}</td><td>{item.id}</td></tr>
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
                            <div class="card" style={{width: '18rem'}}>
                                <img class="card-img-top" src="" alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Cras justo odio</li>
                                    <li class="list-group-item">Dapibus ac facilisis in</li>
                                    <li class="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <div class="card-body">
                                    <a href="#" class="card-link">Card link</a>
                                    <a href="#" class="card-link">Another link</a>
                                </div>
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