import React, {Component} from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import axios from 'axios'
import RealTimeDetail from './RealTimeDetail'
import GraphDetail from './GraphDetail'
import cc from 'cryptocompare'

export default class CoinDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: null,
      graphData: null,
    };
  }

  componentDidMount() {
    const sym = this.props.match.params['sym'];
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${sym}&tsyms=USD`;
    axios.get(url)
    .then((resp) => this.setState({ coin: resp.data.DISPLAY[sym]}))
    .catch(function (error) {
      console.log(error);
    });

    cc.histoDay(sym, 'USD', {aggregate: 1})
    .then(resp => this.setState({graphData: this._extractDay(resp)}))
    .catch(console.error);
  }

  // return {labels: [...], data: [...]}
  _extractDay(histo) {
    const labels = [];
    const data = [];
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
    "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ];
    histo.forEach(o => {
       const date = new Date(o.time * 1000);
       const label = (date.getDate() != 1 ? "" : monthNames[date.getMonth()]) + " " + date.getDate();
       labels.push(label);
       data.push(o.close);
    });

    return {labels, data}
  }



  render() {
    const coin = this.state.coin;
    return (
      <div>
        <h1>{this.props.match.params['sym']}</h1>
        {
          coin == null ? <div>Loading...</div> :
            (
              <div>
                <RealTimeDetail price={coin['USD']} />
                <div>
                  <GraphDetail graphData={this.state.graphData} />
                  <ButtonGroup>
                    <Button>1 Hour</Button>
                    <Button>1 Day</Button>
                    <Button>1 Week</Button>
                  </ButtonGroup>
                </div>

              </div>
            )
        }
      </div>);

    }
  }
