import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import socket from "../socket"

import Nav from './Nav'
import Login from './Login'
import Monitor from './monitor/Monitor'
import CoinList from './CoinList';
import Name from './Name'
import CoinDetail from './coin_detail/CoinDetail'
import News from './News'

class App extends Component {
  componentDidMount() {
    let user_id = document.querySelector('meta[name="user_id"]').content;
    if (user_id) {
      this.props.fetchUser(user_id);
      let channel = socket.channel("/", {})
      channel.join()
           .receive("ok", resp => {
             console.log("Success Connect")
             this.props.getPrices(resp)
             this.props.getCoinList(resp)

           })
           .receive("error", resp => { console.log("Fail to join", resp) });
      channel.on("coin", resp => {
        this.props.getPrices(resp)
        this.props.getCoinList(resp)
      })
    }
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
          <Name user={this.props.auth} message={this.props.message}/>
          <Route path="/" exact={true} component={CoinList} />
          <Route path="/monitor" exact={true} component={Monitor}/>
          <Route path="/news" exact={true} component={News}/>
          <Route path="/coins/:sym" exact={true} render={props => <CoinDetail {...props} coins={this.props.coins}/>} />
        </div>
      </Router>
    )
  }
}

function state2props(state) {
  return {
    auth: state.auth,
    message: state.message,
    coins: state.coins
  };
}

export default connect(state2props, actions)(App);
