import React from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";

import { setToLocalStorage } from "../../../../helpers/storage";
import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";

const Dashboard = () => {
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

  return <Button label="Log out" style="primary" onClick={handleLogout} />;
};

export default Dashboard;
