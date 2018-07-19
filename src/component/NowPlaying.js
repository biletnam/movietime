import React, { Component } from 'react';
import '../style/NowPlaying.css'

class NowPlaying extends Component {
  render() {
    return (
      <div className="NowPlaying">
        <div className="mt-title">
            <h1 align="center">NOW PLAYING</h1>
        </div>
        <div className="card-deck">
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/bXrZ5iHBEjH7WMidbUDQ0U2xbmr.jpg')} alt="Card image cap" /> 
                <div className="card-body">
                <h5 className="card-title">Jumanji: Welcome to The Jungle</h5>
                {/* <p className="card-text">When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into their living room. Alan's only hope for freedom is to finish the game, which proves risky as all three find themselves running from giant rhinoceroses, evil monkeys and other terrifying creatures.</p> */}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/gjAFM4xhA5vyLxxKMz38ujlUfDL.jpg')} alt="Card image cap" />
                <div className="card-body">
                <h5 className="card-title">Hotel Transylvania: Summer Vacation</h5>
                {/* <p className="card-text">Dracula, Mavis, Johnny and the rest of the Drac Pack take a vacation on a luxury Monster Cruise Ship, where Dracula falls in love with the ship's captain, Ericka, who's secretly a descendant of Abraham Van Helsing, the notorious monster slayer.</p> */}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={require('../img/nowplaying/yB0k62P50ZW92aqIFFrb43S7ys6.jpg')} alt="Card image cap" />
                <div className="card-body">
                <h5 className="card-title">Ocean's 8</h5>
                <br />
                {/* <p className="card-text">Debbie Ocean, a criminal mastermind, gathers a crew of seven other female thieves to pull off the heist of the century at New York's annual Met Gala.</p> */}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                <button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button>                
                </div>
            </div>
            
        </div>
      </div>
    );
  }
}

export default NowPlaying;
