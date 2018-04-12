import React from 'react';
import { Redirect } from 'react-router-dom';
import CoinItem from './CoinItem';
import _ from 'underscore';
import { Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

import * as actions from '../actions';
import { connect } from 'react-redux';


function CoinList(params) {

  // variables
  let coins = _.map(_.sortBy(params.coins, function(coin) {return coin.SortOrder}), (tt) => {
    //console.log("coin:", tt);
    return <CoinItem key={tt.id} coin={tt} />
  });

  // methods

  // render
  return<div>
    <Row>
        <Col>Coin</Col>
        <Col>Price</Col>
        <Col>Hold</Col>
        <Col>Detail</Col>
        <Col>Setting</Col>
    </Row>

    <div>
      { coins }
    </div>

  </div>;
}

function state2props(state) {
  return {
    coins: state.coins,
  };
}

export default connect(state2props, actions)(CoinList);
