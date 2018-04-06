import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

class App extends Component {
  componentDidMount() {
    if (window.user_info) {
      this.props.fetchUser(window.user_info.user_id);  
    }
	}

  render() {
    return (
      <Router>
        <p>react loaded</p>
      </Router>
    )
  }
}

export default connect(null, actions)(App);
