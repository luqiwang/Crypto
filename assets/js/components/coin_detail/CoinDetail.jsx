import React, {Component} from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import axios from 'axios'
import RealTimeDetail from './RealTimeDetail'
import GraphDetail from './GraphDetail'
import cc from 'cryptocompare'

const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
"July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

export default class CoinDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sym: this.props.match.params['sym'],
      coin: null,
      graphData: null,
    };
  }

  componentDidMount() {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.state.sym}&tsyms=USD`;
    axios.get(url)
    .then((resp) => this.setState({ coin: resp.data.DISPLAY[this.state.sym]}))
    .catch(function (error) {
      console.log(error);
    });

    this.getMonth();
  }

  // mode: "Month", "Day", "Hour"
  _extract(histo, mode) {
    const labels = [];
    const data = [];

    histo.forEach(o => {
      data.push(o.close);
      labels.push(this._genLabel(o.time * 1000, mode)); // api got trunked 1000
    })

    return {labels, data};
  }

  _genLabel(time, mode) {
    const date = new Date(time);
    switch (mode) {
      case 'MONTH':
      return (date.getDate() != 1 ? "" : monthNames[date.getMonth()]) +
      " " + date.getDate();
      case 'DAY':
      return date.getHours() == 0 ?
      `${monthNames[date.getMonth()]} ${date.getDate()}` :
      date.getHours();
      case 'HOUR':
      return date.getHours() + ":" + date.getMinutes();
      case 'WEEK':
      return `${monthNames[date.getMonth()]} ${date.getDate()}`;
      default:
      return date;
    }
  }

  getHour() {
    cc.histoMinute(this.state.sym, 'USD', {limit: 60})
    .then(resp => this.setState({graphData: this._extract(resp, "HOUR")}))
    .catch(console.error);
  }

  getDay() {
    cc.histoHour(this.state.sym, 'USD', {limit: 24})
    .then(resp => this.setState({graphData: this._extract(resp, "DAY")}))
    .catch(console.error);
  }

  getWeek() {
    cc.histoDay(this.state.sym, 'USD', {limit: 7})
    .then(resp => this.setState({graphData: this._extract(resp, "WEEK")}))
    .catch(console.error);
  }

  getMonth() {
    cc.histoDay(this.state.sym, 'USD', {aggregate: 1})
    .then(resp => this.setState({graphData: this._extract(resp, "MONTH")}))
    .catch(console.error);
  }



  render() {
    const coin = this.state.coin;
    return (
      <div>
        <h1>{this.state.sym}</h1>
        {
          coin == null ? <div>Loading...</div> :
          (
            <div>
              <RealTimeDetail price={coin['USD']} />
              <div>
                <GraphDetail graphData={this.state.graphData} />
                <ButtonGroup>
                  <Button onClick={this.getHour.bind(this)}>1 Hour</Button>
                  <Button onClick={this.getDay.bind(this)}>1 Day</Button>
                  <Button onClick={this.getWeek.bind(this)}>1 Week</Button>
                  <Button onClick={this.getMonth.bind(this)}>1 Month</Button>
                </ButtonGroup>
              </div>

            </div>
          )
        }
      </div>);

    }
  }
