import React, {Component} from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import axios from 'axios'
import RealTimeDetail from './RealTimeDetail'
import GraphDetail from './GraphDetail'
import CoinNews from './CoinNews'
import cc from 'cryptocompare'


const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
"July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

export default class CoinDetail extends Component {
  constructor(props) {
    /* props {
    coins: map from the redux store, containing all descriptions
    } */
    super(props);
    this.state = {
      sym: this.props.match.params['sym'],
      coinId: this.props.match.params['id'],
      priceFull: this.props.location.state.priceFull, // fetched from priceMultiple api, only contains prices info
      graphData: null,
      coinInfo: null,
      news: null,
    };
  }

  componentDidMount() {
    if (!this.state.priceFull) {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.state.sym}&tsyms=USD`;
      axios.get(url)
      .then((resp) => this.setState({ priceFull: resp.data.DISPLAY[this.state.sym]}))
      .catch(function (error) {
        console.log(error);
      });
    }
    this.getMonth();
    /*
    var express = require('express');
    var cors = require('cors');
    var app = express();

    app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
    }));
    */

    /*
    const infoUrl = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${this.state.coinId}`;
    axios.get(infoUrl) // , {withCredentials: true}
    .then(function (resp) {
    this.setState({
    coinInfo: resp.data,
    });
    console.log(resp.status);
    console.log(this.state.coinInfo);
    })
    .catch(function (error) {
    console.log(error);
    });
    */

    const newsUrl = `https://min-api.cryptocompare.com/data/news/?lang=EN`;
    axios.get(newsUrl)
    .then((resp) => {
      this.setState({ news: resp.data });
      //console.log(this.state.news);
    })
    .catch(function (error) {
      console.log(error);
    });
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

  /*
  get{TimePeriod} :
  use apis to get historical prices, and set the state `graphData`
  */
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
    const priceFull = this.state.priceFull;
    const coinId = this.state.coinId;
    const news = this.state.news;

    return (
      <div>
        {
          priceFull == null ? <div>Loading...</div> :
          (
            <div>
              <RealTimeDetail price={priceFull['USD']} coin={this.props.coins[this.state.sym]}/>
              <div style={{padding: "10px"}}>
                <h2>Historical Prices</h2>
                <ButtonGroup className="mb-2">
                  <Button outline onClick={this.getHour.bind(this)}>1 Hour</Button>
                  <Button outline onClick={this.getDay.bind(this)}>1 Day</Button>
                  <Button outline onClick={this.getWeek.bind(this)}>1 Week</Button>
                  <Button outline onClick={this.getMonth.bind(this)}>1 Month</Button>
                </ButtonGroup>
                <GraphDetail graphData={this.state.graphData} />
              </div>
              <CoinNews news={news} sym={this.state.sym} />
            </div>
          )
        }
      </div>);
    }
  }
