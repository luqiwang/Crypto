import React from 'react';
import { Redirect } from 'react-router-dom';
import CoinItem from './CoinItem';
import _ from 'underscore';
import { Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';

import * as actions from '../actions';
import { connect } from 'react-redux';


function CoinList(params) {

  // variables
  let coins = _.map(_.map(params.coins, (cc) => cc[1]), (tt) => {
    return <CoinItem key={tt.CoinName} coin={tt} />
  });

  // methods

  // render
  return<div>
    <div className="jumbotron" style={{fontSize:30, backgroundImage: "url(" + "images/jumbotron.jpg" + ")"}}>
      <span style={{color:'grey'}}>CryptoMonitor</span>
    </div>
    <Card style={{backgroundColor: '#DDDDDD',}}>
      <CardBody>
      <Row>
          <Col>Icon</Col>
          <Col>Coin</Col>
          <Col>Price</Col>
          <Col>Hold</Col>
          <Col>Detail</Col>
          <Col>Setting</Col>
      </Row>
    </CardBody>
    </Card>

    <div>
      { coins }
    </div>

  </div>;

}

function state2props(state) {
  return {
    coins: state.coins,
    prices: state.prices,
  };
}

export default connect(state2props, actions)(CoinList);
