import React from 'react';
import CoinList from './CoinList'

export default function Login () {
  return (
    <div>
      <a href="/auth/google" className="btn btn-block btn-social btn-google">
        <span className="fa fa-google"></span> Sign in with Google
      </a>
      <a href="/auth/facebook" className="btn btn-block btn-social btn-facebook">
        <span className="fa fa-facebook"></span> Sign in with Facebook
      </a>
    </div>
  )
}
