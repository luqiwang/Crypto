import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as actions from '../../actions'
import { connect } from 'react-redux';
import AlertForm from '../AlertForm'

// coins: the state's coins Map
// coin: current display coin {db_id, low_limit, hi_limit, ...}
// price: the price of the current display coin
function MonitorItem({coins, coin, price, message, flipAlertModal, history}) {
  function editCoin() {
    flipAlertModal("MODAL_OPEN"+"/"+coin.code);
  }

  function isModalOpen(mess) {
    return mess=="MODAL_OPEN"+"/"+coin.code;
  }

  let iconUrl = "https://www.cryptocompare.com";
  return <Card>
    <CardBody>
      <Row>
          <Col><img src={ iconUrl + coins[coin.code].ImageUrl} height="100%" width="25%"/></Col>
          <Col>{ coins[coin.code].CoinName }</Col>
          <Col><span style={{backgroundColor:'#DDDDDD', borderRadius:5, padding:10}}>${ price }</span></Col>
          <Col>Hold</Col>
          <Col>{coin.limit_low} / {coin.limit_high}</Col>
          <Col>
            <Link to={"/coins/"+coin.code}
              className={"btn btn-primary"}>
              Detail
            </Link>
          </Col>
          <Col><Button onClick={ editCoin }>Setting</Button></Col>
          <Col><Button className="btn btn-primary">Remove</Button></Col>
      </Row>
    </CardBody>
    <div>
       <Modal isOpen={ isModalOpen(message.editCoinMessage) }>
       <ModalHeader>Setting Reminder</ModalHeader>
         <ModalBody>
           <AlertForm code={coin.code} />
         </ModalBody>
       </Modal>
     </div>
  </Card>;
}

export default connect(({message, coins}) => ({message, coins}), actions)(MonitorItem);
