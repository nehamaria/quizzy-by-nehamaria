import React from "react";

import { Input, Button } from "@bigbinary/neetoui/v2";

const UpdateQuizForm = ({ handleSubmit, setTitle, title, loading }) => {
  return (
    <form className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
      <Input
        type="text"
        label="Update Title"
        className="w-1/3"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button type="submit" label="Submit" className="w-16" loading={loading} />
    </form>
  );
};

export default UpdateQuizForm;
