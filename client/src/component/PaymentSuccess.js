import React, { Component } from 'react';
import '../style/PaymentSuccess.css';

class Payment extends Component {
  render() {
    return (
      <div className="PAYMENT">
        <div class="container">
          <div class="row text-center">
                <div class="col-sm-6 col-sm-offset-3">
                  <br/><br/>
                  <h2 style={{color:"#0fad00"}}>Success</h2>
                  <img src={require('../img/movietimecom-transparent.png')} height='250px' width='250px'/>
                  <h3>Dear, Faisal khan</h3>
                  <p style={{fontsize:"20px", color:"#5C5C5C"}}>Thank you for verifying your Mobile No.We have sent you an email "faisalkhan.chat@gmail.com" with your details
                    Please go to your above email now and login.</p>
                  <a href="" class="btn btn-success">     View Ticket      </a>
                  <br/><br/>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
