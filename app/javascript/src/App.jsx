import React, { useEffect, useState } from "react";

import { Typography, Button, Toastr } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { either, isEmpty, isNil } from "ramda";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";

import authApi from "./apis/auth";
import { resetAuthTokens } from "./apis/axios";
import { initializeLogger } from "./common/logger";
import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Login from "./components/LoginPage";
import { getFromLocalStorage, setToLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      Toastr.success("Successfully logged out");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error) {
      logger.error(error);
    }
  };

  const firstName = getFromLocalStorage("authFirstName");
  const lastName = getFromLocalStorage("authLastName");
  const user = firstName + " " + lastName;

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Header
        title={
          <Typography style="h1" className="px-8">
            Quizzy
          </Typography>
        }
        className="border-b-2"
        actionBlock={
          isLoggedIn && (
            <div className="flex items-center underline pr-5">
              <Button label="Report" style="text" />
              <Button label={user} style="text" />
              <Button label="Logout" style="text" onClick={handleLogout} />
            </div>
          )
        }
      />
      <Route exact path="/login" component={Login} />
      <PrivateRoute
        component={Dashboard}
        condition={isLoggedIn}
        path="/"
        redirectRoute="/login"
      />
    </Router>
  );
};

export default App;
