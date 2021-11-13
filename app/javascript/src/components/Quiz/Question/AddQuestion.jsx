import React, { useState } from "react";

import { useHistory, useLocation } from "react-router";

import questionApi from "apis/question";

import QuestionForm from "./QuestionForm";

const AddQuestion = () => {
  const [optionList, setOptionList] = useState([
    { option: "" },
    { option: "" },
  ]);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const history = useHistory();

  const { id, quizName } = useLocation().state;

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...optionList];

    list[index][name] = value;
    setOptionList(list);
  };

  const handleRemoveClick = index => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };

  const handleAddClick = () => {
    setOptionList([...optionList, [{ option: "" }, { option: "" }]]);
  };
  const handleSubmit = async () => {
    try {
      await questionApi.create(id, {
        question: {
          title: title,
          options_attributes: optionList.map(option => {
            return {
              name: option.option || "",
              correct_answer: option.option === optionList[answer.value].option,
            };
          }),
        },
      });
      history.push(`/quizzes/${id}/show`);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelectAnswer = event => {
    setAnswer(event.target.value);
  };
  return (
    <div>
      <QuestionForm
        quizName={quizName}
        title={title}
        setTitle={setTitle}
        optionList={optionList}
        handleInputChange={handleInputChange}
        handleRemoveClick={handleRemoveClick}
        handleAddClick={handleAddClick}
        handleSubmit={handleSubmit}
        handleSelectAnswer={handleSelectAnswer}
        answer={answer}
      />
    </div>
  );
};

export default AddQuestion;
