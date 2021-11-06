import React, { useState } from "react";

import AddQuestionForm from "./AddQuestionForm";

const AddQuestion = () => {
  const [inputList, setInputList] = useState([{ option: "" }, { option: "" }]);

  const handleInputChange = (event, index) => {
    const { option, value } = event.target;
    const list = [...inputList];
    list[index][option] = value;
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

  const handleSubmit = () => {};
  return (
    <AddQuestionForm
      inputList={inputList}
      handleInputChange={handleInputChange}
      handleRemoveClick={handleRemoveClick}
      handleAddClick={handleAddClick}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddQuestion;
