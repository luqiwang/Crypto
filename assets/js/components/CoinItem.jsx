import React, {Component} from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'

import * as actions from '../actions'
import { connect } from 'react-redux';
import AlertForm from './AlertForm'
import cc from 'cryptocompare'

let iconUrl = "https://www.cryptocompare.com";

class CoinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: null, // [data, ...]
      price: this.props.prices[this.props.coin.Symbol].USD,
      priceColor: "light"
    };

    this.getHisto = this.getHisto.bind(this);
  }

  componentDidMount() {
    this.getHisto();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let color = "light";
    const curPrice = prevState.price;
    const nextPrice = nextProps.prices[nextProps.coin.Symbol].USD;
    if (curPrice > nextPrice) color = "danger";
    else if (curPrice < nextPrice) color = "success";
    return {priceColor: color};
  }

  getHisto() {
    cc.histoDay(this.props.coin.Symbol, 'USD', {limit: 7})
    .then(resp => this.setState({
      graphData:
        {
          labels: new Array(7),
          datasets: [
          {data: resp.map(o => o.close)}]}
      }))
    .catch(err => setTimeout(() => this.getHisto() , 5000));
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
    if (this.state.priceColor != 'light') setTimeout(() => this.setState({priceColor: "light"}), 1000);

    let price = this.getPrice(this.props.coin.Symbol);
    let monitor = this.getMonitor();
    if (!price) return <div></div>;

      return (
        <Card>
          <CardBody>
            <Row>
              <Col><img src={ iconUrl+this.props.coin.ImageUrl } height="100%" width="60%"/></Col>
              <Col>{ this.props.coin.CoinName }</Col>
              {/* <Col><span style={{backgroundColor:'#DDDDDD', borderRadius:5, padding:10}}>${ price }</span></Col>*/}
              <Col><span className={"p-2 rounded bg-" + this.state.priceColor}>${ price }</span></Col>
              <Col>
                {this.state.graphData ?
                  <Line data={this.state.graphData}
                    width={200}
                    height={80}
                    options={{
                      maintainAspectRatio: false,
                      legend:{display:false},
                      scales: {xAxes: [{ticks: {display: false}}], yAxes: [{ticks: {display: false}}]}
                    }} /> :
                    "Loading..."}
              </Col>
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
