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
      <div className="flex w-1/2 flex-col justify-start space-y-5">
        <Typography style="h1">{quizName}</Typography>
        <Input
          type="text"
          name="Title"
          size="large"
          value={title}
          label={<Typography style="h3">Question</Typography>}
          onChange={e => setTitle(e.target.value)}
        />

        {optionList.map((options, index) => {
          return (
            <div className="flex space-y-5 space-x-3" key={index}>
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
          value={answer}
          onChange={selectedOption => {
            let event = {
              target: { value: selectedOption },
            };
            handleSelectAnswer(event);
          }}
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
          className="self-start p-3"
        />
      </div>
    </div>
  );
};

export default QuestionForm;