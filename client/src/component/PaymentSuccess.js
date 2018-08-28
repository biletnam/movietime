import React, { Component } from 'react';
import '../style/PaymentSuccess.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

//Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Payment extends Component {
  constructor(){
    super();
    this.state = {
      email: '-',
    }
  }

  componentDidMount(){
    let cookiePeramban = cookies.get('MOVIETIME_SESSID')        
    var url = 'http://localhost:5001/paymentsuccess';
    axios.post(url, {
        cookie: cookiePeramban,
    })
    .then((response) => {
        this.setState({
            email: response.data[0].email,
        })
        console.log(`Berhasil ambil email`)
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    return (
      <div className="PAYMENT">
        <div class="container">
          <div class="row text-center">
                <div class="col-sm-6 col-sm-offset-3">
                  <br/><br/>
                    <center>

                  <h2 style={{color:"#0fad00"}}>Success</h2>
                  <img src={require('../img/movietimecom-transparent.png')} height='250px' width='250px'/>
                  <h3>Your reservation is success</h3>
                  </center>

                  <p style={{fontsize:"20px", color:"#5C5C5C"}}>
                    Thank you for your reservation! 
                  </p>
                  
                  {/* <p style={{fontsize:"20px", color:"#5C5C5C"}}>
                    We have sent you an email to <strong> {this.state.email} </strong> with your details.
                  </p> */}
                  <button class="btn btn-success">     View Ticket      </button>
                  <br/><br/>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
