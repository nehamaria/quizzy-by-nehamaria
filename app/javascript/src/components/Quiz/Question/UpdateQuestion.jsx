/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";

import { PageLoader, Toastr } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import questionApi from "apis/question";

import QuestionForm from "./QuestionForm";

const UpdateQuestion = () => {
  const { quizId, questionId } = useParams();
  const [optionList, setOptionList] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [options, setOptions] = useState([]);

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
      if (optionList[answer?.value]?.option === undefined) {
        return Toastr.error(Error("Select valid option"));
      }
      const payload = {
        question: {
          title: title,
          options_attributes: optionList.map(option => {
            return {
              id: option?.id,
              name: option.option,
              correct_answer: option.option === optionList[answer.value].option,
            };
          }),
        },
      };
      payload.question.options_attributes = [
        ...payload.question.options_attributes,
        ...options
          .filter(
            ({ id }) => optionList.findIndex(option => option.id === id) === -1
          )
          .map(({ name, id }) => {
            return {
              id,
              name,
              correct_answer: false,
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

  const handleSelectAnswer = event => {
    setAnswer(event.target.value);
  };

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionApi.show(quizId, questionId);
      setQuizName(response.data.question.quiz);
      setTitle(response.data.question.title);
      setOptionList(
        response.data.question.options
          .map(option => {
            return {
              option: option.name,
              id: option.id,
            };
          })
          .filter(({ option }) => option)
      );
      setAnswer({
        value: response.data.question.options.findIndex(
          option => option.correct_answer
        ),

        label: `Option ${
          response.data.question.options.findIndex(
            ({ correct_answer }) => correct_answer
          ) + 1
        }`,
      });
      setOptions(response.data.question.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
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

export default UpdateQuestion;
