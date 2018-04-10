import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import io from 'socket.io-client/dist/socket.io'

import Nav from './Nav'
import Login from './Login'
import Monitor from './Monitor'
import Name from './Name'

class App extends Component {
  componentDidMount() {
    let user_id = document.querySelector('meta[name="user_id"]').content;
    if (user_id) {
      this.props.fetchUser(user_id);
    }

    var currentPrice = {};
	   var socket = io.connect('https://streamer.cryptocompare.com/');
	//Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
	//Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
	//For aggregate quote updates use CCCAGG as market
	var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
	socket.emit('SubAdd', { subs: subscription });
	socket.on("m", function(message) {
		var messageType = message.substring(0, message.indexOf("~"));
		var res = {};
    console.log("messageType", message)
		// if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
		// 	res = CCC.CURRENT.unpack(message);
		// 	dataUnpack(res);
		// }
	});


	}

  render() {
    if (!this.props.auth) {
      return <Login />
    }
    let email = this.props.auth.email
    let provider = this.props.auth.provider
    return (
      <Router>
        <div>
          <Nav user={this.props.auth}/>
          <Name user={this.props.auth} />
          <Route path="/monitor" exact={true} component={Monitor}/>
        </div>
      </Router>
    )
  }
}

function state2props(state) {
  return {
    auth: state.auth
  };
}

export default connect(state2props, actions)(App);
