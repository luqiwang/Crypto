import React from 'react'
import { NavLink, Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';

import * as actions from '../actions'
import { connect } from 'react-redux';

function Nav(props) {
  function editName() {
    props.setName(true);
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary navbar-expand">
        <Link to='/' style={{ textDecoration: 'none', color: 'white'}}>
          <span className="navbar-brand">
            Crypto
          </span>
        </Link>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">All</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/monitor" href="#" className="nav-link">Monitor</NavLink>
          </NavItem>
        </ul>
        <div className="nav-right" onClick={ editName }>
          < img src = "http://graph.facebook.com/215610082529011/picture?type=square" className="head-photo"></img>
        </div>
        <a href="/auth/signout"><div className="nav-right">Log out</div></a>
      </nav>
    </div>
  );
}

export default connect(null, actions)(Nav);
