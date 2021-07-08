import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; // helper func
import "./Signup.css";

export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "", // handles the err from our first name block
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "", // variable for the confirm password input 
    isButtonDisabled: true, // turns the button off until we are done w the form, // variable for the submit button
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  componentDidMount() {
    let isAuth = checkIfUserIsAuth(); // checks if we are logged in.

    if (isAuth) { // if we are, go to movie page.
      this.props.history.push("/movie");
    }
    // reverse the logic to where we are rendered the movie page if we login.  If we are logged in, we cannot go back to the login page.
  }

  handleOnChange = (event) => { // if we input something in our input box, remember what we type in it.
    this.setState(
      {
        [event.target.name]: event.target.value, //bracket-notation is dynamic
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName" 
        ) {
          this.handleFirstNameAndLastNameInput(event); // handles input for first/last name.
        }

        if (event.target.name === "email") {
          this.handleEmailInput(); // handles input for email name.
        }

        if (event.target.name === "username") {
          this.handleUsernameInput(); // handles input for username name.
        }
        if (event.target.name === "password") {
          this.handlePasswordInput(); // handles input for password name.
        }

        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput(); // handles input for confirm password name.
        }
      }
    );
  };

  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) { // if passwords dont match,
      this.setState({
        confirmPasswordError: "Password does not match!", // send err
        isButtonDisabled: true, // if button is true, we cant hit submit button
      });
    } else {
      this.setState({
        confirmPasswordError: "", // removes the err if it does passwords match
      });
    }
  };

  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) { // if the confirmPasswordFocus is true,
      if (this.state.password !== this.state.confirmPassword) {  // and the password does not match, 
        this.setState({
          confirmPasswordError: "Password does not match", // this part will reflect an error 
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "", // if the confirmPasswordFocus is true, and the passwords match, remove the err.
        });
      }
    }

    if (this.state.password.length === 0) {  // if the input box is empty
      this.setState({
        passwordError: "Password cannot be empty", // return err
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) { // using validator, if the password is good
        this.setState({
          passwordError: "", // make the err disappear
        });
      } else {
        this.setState({ // if password is not good, make the err say
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleEmailInput = () => {
    if (this.state.email.length === 0) {  // if there are no characters, then render err msg
      this.setState({
        emailError: "Email cannot be empty",
        isButtonDisabled: true,
      });
    } else { // if using validator, it is in a good email format, then it will make the err msg go away.
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({ // if the isEmail doesnt have the valid email characters, render this err msg.
          emailError: "Please, enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) { // dynamic, if in either input, the length is not 0
      if (isAlpha(this.state[event.target.name])) { // check if its good, if it is, remove err
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else { // else, return an err depending on what input block we are on. set button disabled to true
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({ // if the length is 0, return an err saying it cant be empty
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.username.length === 0) { // if there are no characters, then render err msg
      this.setState({
        usernameError: "Username cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) { // if using validator, it is in a good  format, then it will make the err msg go away.
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({ // if it doesnt have the valid characters, render this err msg.
          usernameError: "Username can only have alphabet and number",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault(); // prevents refresh

    try {
      let userInputObj = { // takes in our state variables as one variable.
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      let success = await Axios.post("/api/user/sign-up", userInputObj); // make a post request for sign up. This will match schema basically. 
      console.log(success);
      toast.success(`${success.data.message}`); // toastify success formatting
    } catch (e) {
      toast.error(`${e.response.data.message}`); // toastify error formatting
    }
  };

  handleOnBlur = (event) => {
    // console.log(event.target.name);
    // console.log("handle onBlur Triggered");

    if (this.state[event.target.name].length === 0) { // creates a err if you click on an input box and dont type anything.
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.isButtonDisabled);

    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (  //checking if the length for all of them is 0
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          // sets the button to be able to submit
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) { // if it is false, 
      this.setState({
        [`${event.target.name}OnFocus`]: true, // it is set to true
      });
    }
  };

  render() {
    const { // pulling the variables to use from the state.
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    console.log(this.props);

    return (
      <div className="container">
        <div className="form-text">Sign up</div> {/* our title */}

        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}> {/* handles our on submit function */}
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label> {/* firstname input box */}
                <input
                  type="text" //  the type for our form to recognize if it requires other validations.
                  id="firstName" // for css
                  value={firstName} // our value is changed based on our handleOnChange func
                  placeholder="First Name"
                  name="firstName" // in our handleOnChange Func, if its first name, change the value to match our input text
                  onChange={this.handleOnChange} // allows use to use the handleonchange func
                  autoFocus // makes the cursor focus on the first name inputbox.
                  onBlur={this.handleOnBlur} // if we click here, and dont type, throws err in the firstNameError below.
                  onFocus={this.handleInputOnFocus} // if it is false, set to true
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}  {/* err catch block */}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
