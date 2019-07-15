import React from "react";
import { Route, Redirect } from "react-router-dom";
import Frack from "./Frack"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Frack.HasToken()) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/Login" />
        }
      }}
    />
  );
};

export default ProtectedRoute;
