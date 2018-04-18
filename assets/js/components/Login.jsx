import React from 'react';
import CoinList from './CoinList'

export default function Login () {
  return (
    <div id="login-container">
      <div className="jumbotron" style={{fontSize:30, backgroundImage: "url(" + "images/jumbotron.jpg" + ")"}}>
        <span style={{color:'grey'}}>CryptoMonitor</span>
      </div>
      <div>
        <a href="/auth/google" className="btn btn-block btn-social btn-google">
          <div className="fa fa-google"></div> Sign in with Google
        </a>
        <a href="/auth/facebook" className="btn btn-block btn-social btn-facebook">
          <span className="fa fa-facebook"></span> Sign in with Facebook
        </a>
      </div>
    </div>
  )
}
