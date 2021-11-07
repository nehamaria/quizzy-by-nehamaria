import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router";

import AddQuestionForm from "./AddQuestionForm";

import questionApi from "../../apis/question";

const AddQuestion = () => {
  const [inputList, setInputList] = useState([{ option: "" }, { option: "" }]);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState({ value: "" });

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
      await questionApi.create({
        question: {
          title: title,
          option1: inputList[0].option,
          option2: inputList[1].option,
          option3: inputList[2]?.option || null,
          option4: inputList[3]?.option || null,
          answer: answer.value.value,
          quiz_id: id,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelect = event => {
    setAnswer({ ...answer, value: event.target.value });
  };
  return (
    <div>
      <Typography style="h1" className="mt-10 pl-40">
        {quizName}
      </Typography>
      <AddQuestionForm
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
