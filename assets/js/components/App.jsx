import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

class App extends Component {
  componentDidMount() {
    let user_id = document.querySelector('meta[name="user_id"]').content;
    if (user_id) {
      this.props.fetchUser(user_id);
    }
	}

  render() {
    let email = this.props.auth? this.props.auth.email : ""
    let provider = this.props.auth? this.props.auth.provider : ""
    return (
      <Router>
        <p>{provider + " user: " + email}</p>
      </Router>
    )
  }
}

function state2props(state) {
  console.log("authstate", state.auth)
  return {
    auth: state.auth,
  };
}

export default connect(state2props, actions)(App);
