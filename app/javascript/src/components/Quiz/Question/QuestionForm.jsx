import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Input, Select, Typography } from "@bigbinary/neetoui/v2";

const QuestionForm = ({
  optionList,
  handleInputChange,
  handleRemoveClick,
  handleAddClick,
  handleSubmit,
  title,
  setTitle,
  handleSelectAnswer,
  answer,
  quizName,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-1/2 flex-col justify-start space-y-5 neeto-ui-bg-gray-100">
        <Typography style="h1" className="m-4">
          {quizName}
        </Typography>
        <Input
          type="text"
          name="Title"
          size="large"
          value={title}
          label={<Typography style="h3">Question</Typography>}
          onChange={e => setTitle(e.target.value)}
          className="m-4"
        />

        {optionList.map((options, index) => {
          return (
            <div className="flex space-y-5 space-x-3 m-4" key={index}>
              <Input
                name={`option`}
                value={options.option}
                size="large"
                label={
                  <Typography style="body1" weight="semi-bold">{`Option ${
                    index + 1
                  }`}</Typography>
                }
                onChange={event => handleInputChange(event, index)}
              />
              {optionList.length !== 2 && index > 1 && (
                <Button
                  style="danger"
                  size="default"
                  label="Remove"
                  onClick={() => handleRemoveClick(index)}
                />
              )}
            </div>
          );
        })}
        {optionList.length < 4 && (
          <Button
            style="secondary"
            className="self-start m-4"
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
            <Typography style="body1" weight="semi-bold" className="m-4">
              Correct Answer
            </Typography>
          }
          placeholder="Select an Option"
          value={answer}
          onChange={selectedOption => {
            let event = {
              target: { value: selectedOption },
            };
            handleSelectAnswer(event);
          }}
          className="m-4"
          options={optionList.map((_, index) => {
            return { value: index, label: `Option ${index + 1}` };
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
          className="self-start p-3 m-4 mb-2"
        />
      </div>
    </div>
  );
};

export default QuestionForm;
