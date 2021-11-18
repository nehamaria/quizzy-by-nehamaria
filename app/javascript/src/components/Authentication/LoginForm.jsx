import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

const LoginForm = ({ handleSubmit }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 sm:px-6 "
    >
      <div className="w-full max-w-md neeto-ui-bg-gray-100">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700 "
        >
          Login
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={yup.object({
            email: yup.string().email().required("Email is required"),
            password: yup.string().required("Please provide a valid password"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col mt-8 m-6 gap-y-6">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="sam@example.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="********"
              />
              <Button
                type="submit"
                label={<Typography className="px-4">Sign In</Typography>}
                className="self-center"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
