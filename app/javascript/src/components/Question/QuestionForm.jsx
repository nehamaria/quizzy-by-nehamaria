import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Input, Select, Typography } from "@bigbinary/neetoui/v2";

const QuestionForm = ({
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
    <div className="flex w-full justify-center">
      <div className="flex w-1/2 flex-col justify-start space-y-5">
        <Input
          type="text"
          name="Title"
          size="large"
          value={title}
          label={<Typography style="h3">Question</Typography>}
          onChange={e => setTitle(e.target.value)}
        />

        {inputList.map((x, i) => {
          return (
            <div className="flex space-y-5 space-x-3" key={i}>
              <Input
                name={`option`}
                value={x.option}
                size="large"
                label={
                  <Typography style="body1" weight="semi-bold">{`Option ${
                    i + 1
                  }`}</Typography>
                }
                onChange={event => handleInputChange(event, i)}
              />
              {inputList.length !== 2 && i > 1 && (
                <Button
                  style="danger"
                  size="default"
                  label="Remove"
                  onClick={() => handleRemoveClick(i)}
                />
              )}
            </div>
          );
        })}
        {inputList.length < 4 && (
          <Button
            style="secondary"
            className="self-start"
            label={
              <Typography style="body1" weight="semi-bold">
                Add Option
              </Typography>
            }
            icon={() => <Plus size={20} className="mr-2" />}
            iconPosition="left"
            onClick={handleAddClick}
          />
        )}
        <Select
          label={
            <Typography style="body1" weight="semi-bold">
              Correct Answer
            </Typography>
          }
          placeholder="Select an Option"
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
        <Button
          style="primary"
          label={
            <Typography style="body1" weight="semi-bold">
              Submit
            </Typography>
          }
          onClick={handleSubmit}
          className="self-start p-3"
        />
      </div>
    </div>
  );
};

export default QuestionForm;
