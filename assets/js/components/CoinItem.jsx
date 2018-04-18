import React, {Component} from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'

import * as actions from '../actions'
import { connect } from 'react-redux';
import AlertForm from './AlertForm'
import cc from 'cryptocompare';
import axios from 'axios'

let iconUrl = "https://www.cryptocompare.com";

class CoinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: null, // [data, ...]
      price: this.props.prices[this.props.coin.Symbol] ? this.props.prices[this.props.coin.Symbol].USD : null,
      priceColor: "light",
      priceFull: null, // from priceFull api
    };

    this.getHisto = this.getHisto.bind(this);
  }

  componentDidMount() {
    this.getHisto();
    this.getPriceFull();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let color = "light";
    const curPrice = prevState.price;
    if (curPrice) {
      const nextPrice = nextProps.prices[nextProps.coin.Symbol].USD;
      if (curPrice > nextPrice) color = "danger";
      else if (curPrice < nextPrice) color = "success";
    }
    return {priceColor: color};
  }

  getPriceFull() {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.props.coin.Symbol}&tsyms=USD`
    axios.get(url)
    .then(resp => {this.setState({priceFull: resp.data.DISPLAY[this.props.coin.Symbol]})})
    .catch(err => setTimeout(() => this.getPriceFull(), 1000));
  }

  getHisto() {
    cc.histoDay(this.props.coin.Symbol, 'USD', {limit: 7})
    .then(resp => this.setState({
      graphData:
        {
          labels: new Array(7),
          datasets: [
          {
            data: resp.map(o => o.close),
            backgroundColor: "rgba(42, 181, 60, 0.2)",
            borderColor: "rgba(42, 181, 60, 0.8)"
          }]}
      }))
    .catch(err => setTimeout(() => this.getHisto() , 2000));
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
            <Row className="text-center align-items-center">
              <Col sm="2"><img src={ iconUrl+this.props.coin.ImageUrl } height="100%" width="60%"/></Col>
              <Col sm="2" onClick={() => this.props.history.push("/coins/"+this.props.coin.Symbol, {priceFull: this.state.priceFull})}>
                <Button color="link">
                  <p><strong>{ this.props.coin.CoinName }</strong></p>
                  <p><strong style={{color: "orange"}}>{ this.props.coin.Symbol}</strong></p>
                </Button>
              </Col>
              {/* <Col><span style={{backgroundColor:'#DDDDDD', borderRadius:5, padding:10}}>${ price }</span></Col>*/}
              <Col sm="2"><span className={"p-2 rounded bg-" + this.state.priceColor + (this.state.priceColor == "light" ? "" : " text-light")}>${ price }</span></Col>
              <Col sm="2">
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
              <Col sm="2">
                <span className={"p-2 rounded bg-light " + (this.state.priceFull && parseFloat(this.state.priceFull.USD.CHANGE24HOUR.substr(2)) >= 0 ? "text-success" : "text-danger")}>
                  {this.state.priceFull ? this.state.priceFull.USD.CHANGE24HOUR : "Loading..."}
                </span>
              </Col>
              <Col sm="2">{this.renderButton(monitor)}</Col>
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
