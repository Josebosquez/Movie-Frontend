import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    //console.log(this.props);

    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome Back - {this.props.user.email} 
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? ( 
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;

// navlink lets the user know what page they are on. has a property called activeClassName and activeStyle.
// active style = {{borderBottom: '1px solid black'}}. throws a small underline on the nav bar.

// link doesnt tell the user what page they are on.

// we are able to use these pieces of code in the nav bar because they are being passed as a child.
//  onClick = { this.props.handleUserLogout } > { this.props.user.email }