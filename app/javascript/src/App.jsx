import React, { useEffect, useState } from "react";

import { Header } from "@bigbinary/neetoui/v2/layouts";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Header title="Quizzy" className="border-b-2" />
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;
