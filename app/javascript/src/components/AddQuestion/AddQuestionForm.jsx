import React from "react";

import { Button, Input } from "@bigbinary/neetoui/v2";

const AddQuestionForm = ({
  inputList,
  handleInputChange,
  handleRemoveClick,
  handleAddClick,
  handleSubmit,
}) => {
  return (
    <div>
      <div className=" pt-40 pl-10  ">
        <Input type="text" label="Question" className="w-64" />

        {inputList.map((x, i) => {
          return (
            <div className=" flex w-64 space-y-5 pt-3 pb-3 space-x-3" key={i}>
              <Input
                name={`Option ${i + 1}`}
                value={x.option}
                label={`Option ${i + 1}`}
                onChange={() => handleInputChange(event, i)}
              />
              {inputList.length !== 2 && (
                <Button
                  style="primary"
                  label="Remove"
                  onClick={() => handleRemoveClick(i)}
                />
              )}
            </div>
          );
        })}
        {inputList.length < 4 && (
          <Button
            style="primary"
            label="Add New Option"
            onClick={handleAddClick}
          />
        )}
      </div>
      <div className="pt-5 pl-10">
        <Button type="submit" label="Submit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddQuestionForm;
