import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const EmptyState = () => {
  return (
    <div>
      <Typography style="h3" className="flex justify-center">
        No new notes
      </Typography>
    </div>
  );
};

export default EmptyState;
