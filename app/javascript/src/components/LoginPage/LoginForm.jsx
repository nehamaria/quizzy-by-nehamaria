import React from "react";

import { Input, Typography, Button } from "@bigbinary/neetoui/v2";

const LoginForm = ({ setEmail, setPassword, loading, handleSubmit }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6 "
    >
      <div className="w-full max-w-md ">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700 "
        >
          Login
        </h2>

        <form className="flex flex-col mt-8 gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="sam@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            label={<Typography className="px-4">Sign In</Typography>}
            className="self-center"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
