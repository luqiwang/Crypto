import React, {Component} from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as actions from '../actions'
import { connect } from 'react-redux';
import AlertForm from './AlertForm'

let iconUrl = "https://www.cryptocompare.com";

class CoinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: null
    };
  }
  // methods

  getHold(lst) {
    let ifhas = false;
    let idx = _.find(lst, function(cc){ return cc.name==this.props.coin.name; });
    if (idx) return "Yes";
    else return "No"
  }

  editCoin() {
    this.props.flipAlertModal("MODAL_OPEN"+"/"+this.props.coin.Symbol);
  }

  isModalOpen(mess) {
    return mess=="MODAL_OPEN"+"/"+this.props.coin.Symbol;
  }


  getPrice(sym) {
    if (!this.props.prices[sym]) return ""
    let price = this.props.prices[sym]["USD"];
    return price;
  }

  getMonitor() {
    let monitors = this.props.user.coins;
    let monitor = null;
    _.each(monitors, (mm) => {
      if (mm.code == this.props.coin.Symbol){
        monitor = mm;
      }
    })
    return monitor;
  }

  renderButton(monitor) {
    if (monitor) {
      return <Button color='warning' onClick={ this.editCoin.bind(this) }>Edit Monitor</Button>
    } else {
      return <Button color='success' onClick={ this.editCoin.bind(this) }>Add Monitor</Button>
    }
  }

  render() {
    let price = this.getPrice(this.props.coin.Symbol)
    let monitor = this.getMonitor()
    if (!price) return <div></div>;

      return (
        <Card>
          <CardBody>
            <Row>
              <Col><img src={ iconUrl+this.props.coin.ImageUrl } height="100%" width="30%"/></Col>
              <Col>{ this.props.coin.CoinName }</Col>
              <Col><span style={{backgroundColor:'#DDDDDD', borderRadius:5, padding:10}}>${ price }</span></Col>
              <Col></Col>
              <Col>
                <Link to={"/coins/"+this.props.coin.Symbol}
                  className={"btn btn-primary"}>
                  Detail
                </Link>
              </Col>
              <Col>{this.renderButton(monitor)}</Col>
            </Row>
          </CardBody>
          <div>
            <Modal isOpen={ this.isModalOpen(this.props.message.editCoinMessage) }>
              <ModalHeader>Setting Reminder</ModalHeader>
              <ModalBody>
                <AlertForm code={this.props.coin.Symbol} monitor={monitor}/>
              </ModalBody>
            </Modal>
          </div>
        </Card>
      );
    }
  }

  function state2props(state) {
    return {
      user: state.auth,
      prices: state.prices,
      message: state.message,
    };
  }

  export default connect(state2props, actions)(CoinItem);
