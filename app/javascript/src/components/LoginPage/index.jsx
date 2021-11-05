import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import LoginForm from "./LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      });
      setAuthHeaders();
      setLoading(false);
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Login;
