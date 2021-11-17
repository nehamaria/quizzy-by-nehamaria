import React, { useState } from "react";

import { useHistory } from "react-router";

import quizApi from "apis/quiz";

import AddQuizForm from "./AddQuizForm";

const AddQuiz = () => {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizApi.create({ quiz: { title: quiz } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <AddQuizForm
      handleSubmit={handleSubmit}
      setQuiz={setQuiz}
      loading={loading}
    />
  );
};

export default AddQuiz;
