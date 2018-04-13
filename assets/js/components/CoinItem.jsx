import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as actions from '../actions'
import { connect } from 'react-redux';

function CoinItem(params) {

  // methods
  function setAlert() {

  }

  function getHold(lst) {
    let ifhas = false;
    let idx = _.find(lst, function(coin){ return coin.name==params.coin.name; });
    if (idx) return "Yes";
    else return "No"
  }


  function getPrice(sym) {
    if (!params.prices[sym]) return ""
    let price = params.prices[sym]["USD"];
    return price;

  }
  let price = getPrice(params.coin.Symbol)
  if (!price) return <div></div>;
  return <Card>
    <CardBody>
      <Row>
          <Col>{ params.coin.CoinName }</Col>
          <Col>${ price }</Col>
          <Col></Col>
          <Col>
            <Link to={"/coins/"+params.coin.Symbol}
              className={"btn btn-primary"}>
              Detail
            </Link>
          </Col>
          <Col><Button onClick={ setAlert }>Setting</Button></Col>
      </Row>
    </CardBody>
  </Card>;

}

function state2props(state) {
  return {
    user: state.auth,
    prices: state.prices,
  };
}

export default connect(state2props, actions)(CoinItem);
