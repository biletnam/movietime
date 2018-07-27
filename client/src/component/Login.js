import React, {Component} from 'react';
import '../style/Login.css';

//Modules
import { Link } from 'react-router-dom';

export class Login extends Component {
    render() {
        return (
            <div className="LOGIN">
                {/* <div class="container">
                    
                    <div class="col-md-6 mx-auto text-center">
                        <div class="mt-login-header-title">
                            <h1 class="wv-heading--title">Check out — it’s free!</h1>
                            <h2 class="wv-heading--subtitle">Lorem ipsum dolor sit amet! Neque porro quisquam est qui do dolor amet, adipisci velit..</h2>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <div class="myform form ">
                                <form action="" method="post" name="login">
                                    <div class="form-group">
                                        <input type="text" name="name"  class="form-control mt-login-my-input" id="name" placeholder="Name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" name="email"  class="form-control mt-login-my-input" id="email" placeholder="Email" />
                                    </div>
                                    <div class="form-group">
                                        <input type="number" min="0" name="phone" id="phone"  class="form-control mt-login-my-input" placeholder="Phone" />
                                    </div>
                                    <div class="text-center ">
                                        <Link to="/payment"><button type="submit" class=" btn btn-block send-button tx-tfm">Create Your Free Account</button></Link>
                                    </div>
                                    <div class="col-md-12 ">
                                        <div class="mt-login-login-or">
                                            <hr class="mt-login-hr-or" />
                                            <span class="mt-login-span-or">or</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <a class="btn btn-block mt-login-g-button" href="#">
                                        <i class="fa fa-google"></i> Sign up with Google
                                        </a>
                                    </div>
                                    <p class="small mt-3">By signing up, you are indicating that you have read and agree to the <a href="#" class="ps-hero__content__link">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className="container">    
                <div id="loginbox" style={{marginTop:"50px"}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                    <div className="panel panel-info" >
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            <div style={{float:"right", fontSize: "80%", position: "relative", top:"-10px"}}><a href="#">Forgot password?</a></div>
                        </div>     

                        <div style={{paddingTop:"30px"}} className="panel-body" >
                            <div style={{display:"none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                            <form id="loginform" className="form-horizontal" role="form">
                                        
                                <div style={{marginBottom: "25px"}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input id="login-username" type="text" className="form-control" name="username" value="" placeholder="username or email" />                                        
                                </div>
                                    
                                <div style={{marginBottom: "25px"}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" className="form-control" name="password" placeholder="password"/>
                                </div>
                                                                                
                                <div className="input-group">
                                    <div className="checkbox">
                                    <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                                    </label>
                                    </div>
                                </div>

                                <div style={{marginTop:"10px"}} className="form-group">
                                    {/* Button */}
                                    <div className="col-sm-12 controls">
                                        <a id="btn-login" href="#" className="btn btn-success">Login  </a>
                                        <a id="btn-fblogin" href="#" className="btn btn-primary">Login with Facebook</a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{borderTop: "1px solid#888", paddingTop:"15px", fontSize:"85%"}} >
                                            Don't have an account! 
                                        <a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
                                            Sign Up Here
                                        </a>
                                        </div>
                                    </div>
                                </div>    
                            </form>     
                        </div>                     
                    </div>  
                </div>

                <div id="signupbox" style={{display:"none", marginTop:"50px"}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div style={{float:"right", fonSize: "85%", position: "relative", top:"-10px"}}><a id="signinlink" href="#" onclick="$('#signupbox').hide(); $('#loginbox').show()">Sign In</a></div>
                        </div>  
                        <div className="panel-body" >
                            <form id="signupform" className="form-horizontal" role="form">
                                <div id="signupalert" style={{display:"none"}} className="alert alert-danger">
                                    <p>Error:</p>
                                    <span></span>
                                </div>

                                <div className="form-group">
                                    <label for="email" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                    </div>
                                </div>
                                            
                                <div className="form-group">
                                    <label for="firstname" className="col-md-3 control-label">First Name</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="firstname" placeholder="First Name"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="lastname" className="col-md-3 control-label">Last Name</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="lastname" placeholder="Last Name"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="password" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input type="password" className="form-control" name="passwd" placeholder="Password"/>
                                    </div>
                                </div>
                                            
                                <div className="form-group">
                                    <label for="icode" className="col-md-3 control-label">Invitation Code</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="icode" placeholder=""/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/* Button */}
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="button" className="btn btn-info"><i className="icon-hand-right"></i> &nbsp Sign Up</button>
                                        <span style={{marginLeft:"8px"}}>or</span>  
                                    </div>
                                </div>
                                        
                                <div style={{borderTop: "1px solid #999", paddingTop:"20px"}}  className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-fbsignup" type="button" className="btn btn-primary"><i className="icon-facebook"></i>   Sign Up with Facebook</button>
                                    </div>                                           
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
            </div>
        )
    }
}

export default Login;