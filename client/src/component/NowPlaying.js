import React, { Component } from 'react';
import '../style/NowPlaying.css';

import { Link } from 'react-router-dom';

class NowPlaying extends Component {
  render() {
    return (
      <div className="NOWPLAYING">
        <div className="mt-nowplaying-title">
            <h1 align="center">NOW PLAYING</h1>
        </div>

        <div className="card-deck">
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/bXrZ5iHBEjH7WMidbUDQ0U2xbmr.jpg')} alt="Card image cap" /> 
                <div className="card-body">
                    <h5 className="card-title">Jumanji: Welcome to The Jungle</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to="/movie/jumanji-welcome-to-the-jungle/mv001"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/gjAFM4xhA5vyLxxKMz38ujlUfDL.jpg')} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Hotel Transylvania: Summer Vacation</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    <Link to="/movie/hotel-transylvania-3-welcome-to-the-jungle/mv002"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/yB0k62P50ZW92aqIFFrb43S7ys6.jpg')} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Ocean's 8</h5>
                    <br />
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to="/movie/oceans-8/mv003"><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>          
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
