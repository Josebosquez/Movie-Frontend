import React, { Component } from "react";
import { ToastContainer } from "react-toastify"; // brings in toast
import jwtDecode from "jwt-decode"; // brings in jwt token 

import MainRouter from "./MainRouter";

import "./App.css";

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken"); // searches local storage for our jwt token

    if (getJwtToken) {
      const currentTime = Date.now() / 1000; // grabs computers current time.
      // if current time is greater than the expired time, then the token is no longer valid.

      let decodedJWTToken = jwtDecode(getJwtToken); // bring in jwt decode to decode our jwt token for login/logout purposes or when refreshing the page.

      if (decodedJWTToken.exp < currentTime) { // if the decodedJWTToken expiration time is less than the current time, log me out. else log me in so when i refresh, ill be able to stay logged in.
        //logout
        this.handleUserLogout();
      } else {
        //login
        this.handleUserLogin(decodedJWTToken);
      }

      // console.log("currentTime", currentTime);
      // June XXXX xxpm- 1624985322
      // ONE DAY FROM June XXXX xxpm - 1625071722
      // Current Time - 163500000
      // console.log("decodedJWTToken", decodedJWTToken);
    }
  }

  handleUserLogin = (user) => { // handles our user login function. sets the user to have our user.email
    this.setState({
      user: {
        email: user.email, 
      },
    });
  };

  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken"); // remove the jwt token
    this.setState({
      user: null, // resets our user back to null instead of our email.
    });
  };

  render() {
    return (
      <>
        <ToastContainer position="top-center" /> {/* brings in our toast err block message*/}

        <MainRouter
          user={this.state.user} // allows us to use this variable as a child
          handleUserLogin={this.handleUserLogin} // allows us to use this function as a child
          handleUserLogout={this.handleUserLogout} // allows us to use this function as a child
        />
      </>
    );
  }
}

export default App;
