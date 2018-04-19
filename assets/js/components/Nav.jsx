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
          <span style={{fontFamily: "Georgia, serif"}} className="navbar-brand">
            Crypto
          </span>
        </Link>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} className="nav-link">All</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/monitor" className="nav-link">Monitor</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/news" className="nav-link">News</NavLink>
          </NavItem>
        </ul>
        <div className="nav-right" onClick={ editName }>
          <span id="span-name">{props.user.name}</span>
          <img src={props.user.photo} className="head-photo"></img>
        </div>
        <a href="/auth/signout"><div className="nav-right">Log out</div></a>
      </nav>
      <div className="jumbotron" style={{fontSize:30, backgroundImage: "url(" + "/images/jumbotron.jpg" + ")"}}>
        <span style={{color:'grey', fontFamily: "Georgia, serif"}}>Crypto Monitor</span>
      </div>
    </div>
  );
}

export default connect(null, actions)(Nav);
