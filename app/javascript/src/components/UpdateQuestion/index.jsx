import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useHistory, useParams } from "react-router";

import questionApi from "../../apis/question";
import QuestionForm from "../Question/QuestionForm";

const UpdateQuestion = () => {
  const { quizId, questionId } = useParams();
  const [inputList, setInputList] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
      await questionApi.update(questionId, {
        question: {
          title: title,
          option1: inputList[0].option,
          option2: inputList[1].option,
          option3: inputList[2]?.option || null,
          option4: inputList[3]?.option || null,
          answer: answer.value.value,
          quiz_id: quizId,
        },
      });
      history.push(`/${quizId}/show`);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelect = event => {
    setAnswer({ ...answer, value: event.target.value });
  };

  const showQuestionDetails = async () => {
    try {
      const response = await questionApi.show(questionId);
      setInputList(
        Object.values(response.data.question.option)
          .map(option => {
            return {
              option: option,
            };
          })
          .filter(({ option }) => option)
      );
      setAnswer(response.data.question.correct_answer);
      setTitle(response.data.question.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showQuestionDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <QuestionForm
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

export default UpdateQuestion;
