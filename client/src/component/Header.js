// import React, { Component } from 'react';
// import '../style/Header.css'

// class Header extends Component {
//   render() {
//     return (
//       <div className="HEADER">
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mt-header-navbar">
//             <img src={require('../img/movietimecom-transparent-crop.png')} alt="" height="50px"/>
//             <span className="mt-header-navbar-space"></span>
            
//             {/* <a class="navbar-brand mt-header-font" href="#">The Easiest Way to Buy Theater Ticket!</a>             */}
//             <p class="mt-header-font">The Easiest Way to Buy Theater Ticket!</p>            
            
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//                 <ul className="navbar-nav justify-content-end">
//                     {/* <li className="nav-item">
//                         <a className="nav-link" href="#">Home</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Now Playing</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Coming Soon</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Find Near Theaters</a>
//                     </li> */}
//                 </ul>
//                 <form className="form-inline my-2 my-lg-0">
//                     <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Signup</button>
//                 </form>
//             </div>
//             </nav>
//       </div>
//     );
//   }
// }

// export default Header;

import React, { Component } from 'react';
import '../style/Header.css'

class Header extends Component {
    constructor(){
        super();
        this.state = {
            dynamic_Class: 'navbar navbar-expand-md fixed-top',
            dynamic_height: '60px'
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                this.setState({
                    dynamic_Class: 'navbar navbar-expand-md fixed-top shrink',
                    dynamic_height: '40px'
                })
            }
            else if (window.scrollY < 600) {
                this.setState({
                    dynamic_Class: 'navbar navbar-expand-md fixed-top',
                    dynamic_height: '60px'

                })
            }
            
        });
    }
  render() {
    return (
      <div className="HEADER">
            <nav class={this.state.dynamic_Class} id="banner">
                <div class="container">
                    {/* <!-- Brand --> */}
                    <a class="navbar-brand" href="#"><img src={require('../img/movietimecom-transparent-crop.png')} alt="" height={this.state.dynamic_height}/></a>
                    
                    {/* <!-- Toggler/collapsibe Button --> */}
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                </div>
            </nav>
      </div>
    );
  }
}

export default Header;

