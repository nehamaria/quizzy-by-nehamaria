import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

const Options = ({ optionList }) => {
  const options = Object.values(optionList).filter(opt => opt);

  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        return (
          <div key={index} className="flex space-x-10 bg-white p-2 ">
            <Typography style="body2" className="ml-10 flex-shrink-0">
              Option {index + 1}
            </Typography>
            <Typography style="body2">{option.name}</Typography>
            {option.correct_answer && (
              <div className="flex flex-shrink-0">
                <CheckCircle color="#00ba88" />
                <Typography style="body2" className="neeto-ui-text-success">
                  Correct Answer
                </Typography>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Options;
