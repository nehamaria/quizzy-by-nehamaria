import React, { useEffect, useState } from "react";

import { Typography, Button, Toastr } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import authApi from "apis/auth";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { resetAuthTokens } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import UserDetails from "components/PublicQuiz/UserDetails";
import AddQuiz from "components/Quiz/AddQuiz";
import AddQuestion from "components/Quiz/Question/AddQuestion";
import UpdateQuestion from "components/Quiz/Question/UpdateQuestion";
import QuizList from "components/Quiz/QuizList";
import ShowQuiz from "components/Quiz/ShowQuiz";
import UpdateQuiz from "components/Quiz/UpdateQuiz";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

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
          <Link to="/">
            <Typography style="h1" className="px-8">
              Quizzy
            </Typography>
          </Link>
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
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/quiz/create" component={AddQuiz} />
        <Route exact path="/quizzes/:id/show" component={ShowQuiz} />
        <Route
          exact
          path="/quizzes/:id/questions/create"
          component={AddQuestion}
        />
        <Route
          exact
          path="/quiz/:quizId/question/:questionId/update"
          component={UpdateQuestion}
        />
        <Route exact path="/public/:slug" component={UserDetails} />
        <PrivateRoute
          component={UpdateQuiz}
          condition={isLoggedIn}
          path="/:id/update"
          redirectRoute="/login"
        />
        <PrivateRoute
          component={QuizList}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
