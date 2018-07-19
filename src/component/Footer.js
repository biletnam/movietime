import React, { Component } from 'react';
import '../style/Footer.css';

class Footer extends Component {
    render(){
        return(
            <div className="footer">
                <div className="footer-column">
                    <div className="box1">
                        <center>
                            <img src={require('../img/movietimecom-transparent.png')} alt="" height="150px" width="150px" />
                        </center>
                    </div>       
                    
                    <div className="box2">
                        <ul>
                            <li>About Us</li>
                            <li>Press Room</li>
                            <li>FAQs</li>
                        </ul>
                        <ul>
                            <li>Advertise with Us</li>
                            <li>Link to Us</li>
                            <li>Copyright</li>
                        </ul>
                        <ul>
                            <li>Accessbility</li>
                            <li>Terms and Policies</li>
                            <li>Privacy Policies</li>
                        </ul>
                    </div>               

                    <div className="box3">
                        <p className="stay-connected">Stay Connected</p>
                        <p>Join millions of moviegoers who browse movies, search showtimes and reserve tickets in advance!</p>
                        <button type="button" class="btn brand-color">JOIN NOW!</button>
                    </div>                       

                    <div className="box4">
                        <p className="follow-us">Follow Us</p>
                        <a href="https://www.facebook.com/"><img src={require('../img/socialmedia/facebook-square-brands.svg')} alt="" height="30px" width="30px" /></a>                                   
                        <a href="https://www.twitter.com/"><img src={require('../img/socialmedia/twitter-square-brands.svg')} alt="" height="30px" width="30px" /></a>                                      
                        <a href="https://www.instagram.com/"><img src={require('../img/socialmedia/instagram-brands.svg')} alt="" height="30px" width="30px" /></a>                                                      
                        <a href="https://www.youtube.com/"><img src={require('../img/socialmedia/youtube-square-brands.svg')} alt="" height="30px" width="30px" /></a>                                                      
                    </div>
                </div>
            </div>

        ) 
    }
}
export default Footer;