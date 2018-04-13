import React, {Component} from 'react'
import axios from 'axios'
import RealTimeDetail from './RealTimeDetail'
import GraphDetail from './GraphDetail'
import cc from 'cryptocompare'

export default class CoinDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: null,
      histoDay: null,
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

    cc.histoDay('BTC', 'USD')
    .then(histoDay => this.setState({histoDay}))
    .catch(console.error);

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
                <GraphDetail data={this.state.histoDay} />
              </div>
            )
        }
      </div>);

    }
  }
