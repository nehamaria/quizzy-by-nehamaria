import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, condition, path, redirectRoute }) => {
  if (!condition) {
    return <Redirect to={redirectRoute} />;
  }

  return <Route exact path={path} component={component} />;
};

export default PrivateRoute;
