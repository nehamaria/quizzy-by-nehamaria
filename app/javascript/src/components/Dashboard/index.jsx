import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";

const Dashboard = () => {
  return (
    <div className="flex justify-end w-screen px-8 py-8">
      <Button
        icon={() => <Plus />}
        iconPosition="left"
        label={
          <Typography className="flex gap-x-2 p-1">Add new quiz</Typography>
        }
      />
    </div>
  );
};

export default Dashboard;
