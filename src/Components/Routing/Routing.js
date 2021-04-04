import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard.js";
import { SuccessPage } from "../SuccessPage/SuccessPage.js";

const Routing = () => {
  let authUser = localStorage.getItem("authToken");
  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          auth={authUser}
        />     
        <PrivateRoute
          exact
          path="/booking/details"
          component={SuccessPage}
          auth={authUser}
        />       
      </Switch>
    </div>
  );
};

export default Routing;

const PrivateRoute = ({ component: Components, auth, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) =>
        auth ? (
          <Components {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
