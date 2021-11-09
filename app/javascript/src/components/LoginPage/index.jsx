import React from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import LoginForm from "./LoginForm";

const Login = () => {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login({
        login: { email: values.email, password: values.password },
      });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email,
        userId: response.data.id,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      });
      setAuthHeaders();
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
