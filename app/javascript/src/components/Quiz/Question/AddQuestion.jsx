import React, { useState } from "react";

import { useHistory, useLocation } from "react-router";

import questionApi from "apis/question";

import QuestionForm from "./QuestionForm";

const AddQuestion = () => {
  const [inputList, setInputList] = useState([{ option: "" }, { option: "" }]);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState({ value: "" });
  const history = useHistory();

  const { id, quizName } = useLocation().state;

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];

    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, [{ option: "" }, { option: "" }]]);
  };
  const handleSubmit = async () => {
    try {
      await questionApi.create(id, {
        question: {
          title: title,
          options_attributes: inputList.map(option => {
            return {
              name: option.option || "",
              correct_answer:
                option.option === inputList[answer.value.value].option,
            };
          }),
        },
      });
      history.push(`/quizzes/${id}/show`);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelect = event => {
    setAnswer({ ...answer, value: event.target.value });
  };
  return (
    <div>
      <QuestionForm
        quizName={quizName}
        title={title}
        setTitle={setTitle}
        inputList={inputList}
        handleInputChange={handleInputChange}
        handleRemoveClick={handleRemoveClick}
        handleAddClick={handleAddClick}
        handleSubmit={handleSubmit}
        handleSelect={handleSelect}
        answer={answer}
      />
    </div>
  );
};

export default AddQuestion;
