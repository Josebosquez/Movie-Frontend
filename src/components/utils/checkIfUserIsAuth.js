import jwtDecode from "jwt-decode";

const checkIfUserIsAuth = () => {
  //check if token exists, if it doesnt exists return false
  //if it does exists, check if token valid (meaning not expired)
  //if expired return false
  //else return true

  let getJwtToken = window.localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;
    let decodedToken = jwtDecode(getJwtToken);

    if (decodedToken.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export default checkIfUserIsAuth;


// This page is a helper function to be used in other pages. We use this to verify if we are signed in or signed out based on if our jwt token is valid. If its not, we are or are not allowed to visit certain pages.