import React from 'react';
import CoinList from './CoinList';

export default function Monitor(props) {

  // methods
  function getCoins() {
    return [];
  }

  return (<div>
    <p>Monitor Page</p>
    <CoinList coins={ getCoins }/>
  </div>

  )
}
