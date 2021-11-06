import React from "react";

import { Button, Input, Select } from "@bigbinary/neetoui/v2";

const AddQuestionForm = ({
  inputList,
  handleInputChange,
  handleRemoveClick,
  handleAddClick,
  handleSubmit,
  title,
  setTitle,
  handleSelect,
  answer,
}) => {
  return (
    <div>
      <div className=" pt-40 pl-10  ">
        <Input
          type="text"
          name="Title"
          value={title}
          label="Question"
          className="w-64"
          onChange={e => setTitle(e.target.value)}
        />

        {inputList.map((x, i) => {
          return (
            <div className=" flex w-64 space-y-5 pt-3 pb-3 space-x-3" key={i}>
              <Input
                name={`option`}
                value={x.option}
                label={`Option ${i + 1}`}
                onChange={event => handleInputChange(event, i)}
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
      <div className="w-64 pl-10 mt-5">
        <Select
          label="Correct Answer"
          value={answer.value}
          onChange={selectedOption => {
            let event = {
              target: { value: selectedOption },
            };
            handleSelect(event);
          }}
          options={inputList.map((option, index) => {
            return { value: option.option, label: `Option ${index + 1}` };
          })}
        />
      </div>
      <div className="pt-5 pl-10 ">
        <Button type="submit" label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddQuestionForm;
