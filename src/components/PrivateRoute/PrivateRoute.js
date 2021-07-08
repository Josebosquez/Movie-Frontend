import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

const PrivateRoute = ({ component: Component, ...rest }) => { // We are renaming component to capital Component and we are using a spread operator for Rest - means to grab exact, path, user, and the component we are calling for so we dont have to type it.
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsAuth() ? ( // if we are logged in, send us to whereever we need to go based on the component we use in other page func.
          <Component {...routerProps} /> // we pass routerProps to regain history, location, match, and staticContext. since we lost it without using routerProps.
        ) : ( // else, send us to the login page.
          <Redirect to="/login" />
        )
      }
    />
  );
};
// It returns a route to the props component.
// now we dont have the error message yelling at us. The reason is because we pulled out component, and rename it. Then we pass it as a component.  

export default PrivateRoute;
// const PrivateRoute = (props) => {
//   console.log(props);

//   return <Route exact path={props.path} component={props.component} />;
// };

// const PrivateRoute = (props) => {
//   console.log(props);

//   return (
//     <Route
//       exact
//       path={props.path}
//       render={() => <Movie />}
//       render={() => (props.user ? props.component : <Redirect to="/login" />)} // if props.user is a truthy value, we will return props.component, if not we will redirect them to the login page.
      
//     />
//   );
// };
