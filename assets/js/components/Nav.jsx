import React from 'react'
import { NavLink, Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';

export default function Nav(props) {
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
        <div className="nav-right">{props.user.name}</div>
        <a href="/auth/signout"><div className="nav-right">Log out</div></a>
      </nav>
    </div>
  );
}
