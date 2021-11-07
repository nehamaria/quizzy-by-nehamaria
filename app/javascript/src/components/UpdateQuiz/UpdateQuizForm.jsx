import React from "react";

import { Input, Button, Typography } from "@bigbinary/neetoui/v2";

const UpdateQuizForm = ({ handleSubmit, setTitle, loading }) => {
  return (
    <div className="p-12 space-y-8">
      <Typography style="h1" className="mt-7 ">
        Update quiz
      </Typography>
      <form className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Update Title"
          className="w-1/3"
          onChange={e => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          label="Submit"
          className="w-16"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default UpdateQuizForm;
