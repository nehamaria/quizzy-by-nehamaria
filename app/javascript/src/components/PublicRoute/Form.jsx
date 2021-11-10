import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";
import { Formik, Form } from "formik";
import { useParams } from "react-router";
import * as yup from "yup";

const PublicRouteForm = () => {
  const title = useParams();
  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-1/2 flex-col justify-start space-y-8">
        <Typography style="h1" className="mt-5">
          Welcome to {title.slug}
        </Typography>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "" }}
          validationSchema={yup.object({
            firstName: yup.string().required("This field is required"),
            lastName: yup.string().required("This field is required"),
            email: yup.string().email().required("Email is required"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col mt-8 gap-y-6">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter last name"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Button
                type="submit"
                label={<Typography className="px-4">Next</Typography>}
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

export default PublicRouteForm;
