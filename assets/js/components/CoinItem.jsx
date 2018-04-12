import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
//import api from '../api'

import * as actions from '../actions'
import { connect } from 'react-redux';

function CoinItem(params) {

  // methods
  function setAlert() {

  }

  function getDetail() {

  }

  function getHold(lst) {
    let ifhas = false;
    let idx = _.find(lst, function(coin){ return coin.name==params.coin.name; });
    if (idx) return "Yes";
    else return "No"
  }


  if (!params.coin.price) {
    params.getPrice( params.coin.CoinName, params.coin.Symbol);
  }

  return <Card>
    <CardBody>
      <Row>
          <Col>{ params.coin.CoinName }</Col>
          <Col>{ params.coin.price }</Col>
          <Col>{ () => getHold(params.user.coins) }</Col>
          <Col><Button onClick={ getDetail }>Detail</Button></Col>
          <Col><Button onClick={ setAlert }>Setting</Button></Col>
      </Row>
    </CardBody>
  </Card>;

}

function state2props(state) {
  return {
    user: state.auth,
  };
}

export default connect(state2props, actions)(CoinItem);
