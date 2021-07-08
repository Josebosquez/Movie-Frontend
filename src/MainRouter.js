import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; // brings in react-router-dom.  Browserrouter is part of the module for react-router-dom. second param can be  named whatever we want. Allows us to rename modules later.

import Signup from "./components/Signup/Signup"; // bringing in Signup from components
import Login from "./components/Login/Login";  // bringing in login from components
import Home from "./components/Home/Home"; // bringing in home from components
import Nav from "./components/Nav/Nav"; // bringing in nav from components
import Movie from "./components/Movie/Movie"; // bringing in movie from components
import MovieDetail from "./components/Movie/MovieDetail"; // bringing in moviedetail from components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";// bringing in privateRouter from components 

const MainRouter = (props) => { // functional component not a class
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} /> {/*Nav is being connected with the function and the user variable so we can use it inside of nav. It allows us to verify if you are logged in.*/}
      <>
        {/* <Route exact path="/movie" component={Movie} /> */}
        <PrivateRoute exact path="/movie" component={Movie} /> {/* allows us to use privateRoute instead of normal route. */}
        <Route exact path="/sign-up" component={Signup} />
        {/* <Route exact path="/login" component={Login}>
          <Login handleUserLogin={props.handleUserLogin} />
        </Route> */}


{/*clean route */}
        <Route
          exact             /*must match */
          path="/login"      /*the route */
          render={(routerProps) => ( // spread operator, instead of us havig to spread our our history, location, match, and staticContext, this makes it easier.
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        {/* /api/user/user-detail/get-user-by-id/:id */}
        {/* <Route exact path="/movie-detail/:movieTitle" component={MovieDetail} /> */}
        <PrivateRoute
          exact
          path="/movie-detail/:movieTitle"
          component={MovieDetail}
        />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter;


// all the routers should get their own components, but if you type component={Signup}, you cannot render that page as it loses props
// we want nav to exist in every component so we place it above the other paths.
// route - paths, matches url. like a url. goes between pages
// path order matters. if home is first, it will look at the home path which is "/". If home is first, then it will match all the rest of the paths below it to render on one page. to fix the issue, input the word exact. Without the word exact, it will render both paths. 

// snippet = "routerProps" and then you spread it "...routerProps"  = history,match,location, staticContext like above.

// from private route -- once we check if user is auth, we will come here and delete the user from our PrivateRoute.