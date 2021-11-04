import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-end w-screen px-8 py-8">
        <Link to="/quiz/create">
          <Button
            icon={() => <Plus />}
            iconPosition="left"
            label={
              <Typography className="flex gap-x-2 p-1">Add new quiz</Typography>
            }
          />
        </Link>
      </div>
      <Typography style="h3" className="flex justify-center">
        No new notes
      </Typography>
    </div>
  );
};

export default Dashboard;
