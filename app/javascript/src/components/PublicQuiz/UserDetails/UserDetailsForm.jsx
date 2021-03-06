import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import { useParams } from "react-router";
import * as yup from "yup";

const UserDetailsForm = ({ handleSubmit }) => {
  const title = useParams();
  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-1/2 flex-col justify-start space-y-8 mt-32 neeto-ui-bg-gray-100">
        <Typography style="h1" className="mt-5 m-4">
          Welcome to {title.slug}
        </Typography>

        <Formik
          initialValues={{ first_name: "", last_name: "", email: "" }}
          onSubmit={handleSubmit}
          validationSchema={yup.object({
            first_name: yup.string().required("This field is required"),
            last_name: yup.string().required("This field is required"),
            email: yup
              .string()
              .email("Email is invalid")
              .required("Email is required"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col mt-8 gap-y-6 m-4">
              <Input
                label="First Name"
                name="first_name"
                type="text"
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                name="last_name"
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

export default UserDetailsForm;
