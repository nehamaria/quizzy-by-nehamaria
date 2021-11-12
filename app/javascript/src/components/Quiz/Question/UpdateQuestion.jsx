import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import questionApi from "apis/question";

import QuestionForm from "./QuestionForm";

const UpdateQuestion = () => {
  const { quizId, questionId } = useParams();
  const [inputList, setInputList] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [options, setOptions] = useState([]);

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
      const payload = {
        question: {
          title: title,
          options_attributes: inputList.map(option => {
            return {
              id: option?.id,
              name: option.option,
              correct_answer:
                option.option === inputList[answer.value.value].option,
            };
          }),
        },
      };
      payload.question.options_attributes = [
        ...payload.question.options_attributes,
        ...options
          .filter(
            ({ id }) => inputList.findIndex(option => option.id === id) === -1
          )
          .map(({ name, correct_answer, id }) => {
            return {
              id,
              name,
              correct_answer,
              _destroy: true,
            };
          }),
      ];
      await questionApi.update(quizId, questionId, payload);
      setTimeout(
        () => (window.location.href = `/quizzes/${quizId}/show`),
        1000
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelect = event => {
    setAnswer({ ...answer, value: event.target.value });
  };

  const showQuestionDetails = async () => {
    try {
      const response = await questionApi.show(quizId, questionId);
      setQuizName(response.data.question.quiz);
      setTitle(response.data.question.title);
      setInputList(
        response.data.question.option
          .map(option => {
            return {
              option: option.name,
              id: option.id,
            };
          })
          .filter(({ option }) => option)
      );
      setAnswer({
        value: {
          value: response.data.question.option.findIndex(
            option => option.correct_answer
          ),

          label: `Option ${
            response.data.question.option.findIndex(
              ({ correct_answer }) => correct_answer
            ) + 1
          }`,
        },
      });
      setOptions(response.data.question.option);
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

export default UpdateQuestion;
