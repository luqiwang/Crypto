import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

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
    auth: state.auth,
  };
}

export default connect(state2props, actions)(App);
