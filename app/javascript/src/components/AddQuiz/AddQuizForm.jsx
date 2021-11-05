import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";

const AddQuizForm = ({ handleSubmit, setQuiz, loading }) => {
  return (
    <div className="pl-12 space-y-8">
      <Typography style="h1" className="mt-10">
        Add new quiz
      </Typography>
      <form className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Quiz Name"
          className="w-1/3"
          onChange={e => setQuiz(e.target.value)}
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

export default AddQuizForm;
