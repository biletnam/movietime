import React, { Component } from 'react';
import '../style/Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light">
            <img src={require('../img/movietimecom-transparent-crop.png')} alt="" height="50px"/>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Now Playing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Coming Soon</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Find Near Theaters</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Signup</button>
                </form>
            </div>
            </nav>
      </div>
    );
  }
}

export default Header;
