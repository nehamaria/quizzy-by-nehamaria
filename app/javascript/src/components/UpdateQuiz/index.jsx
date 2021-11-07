import React, { useState, useEffect } from "react";

import { useHistory, useLocation, useParams } from "react-router";

import quizApi from "apis/quiz";

import UpdateQuizForm from "./UpdateQuizForm";

const UpdateQuiz = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const currentState = useLocation().state;

  useEffect(() => {
    setTitle(currentState?.title || "");
  }, [currentState]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizApi.update(id, { quiz: { title: title } });
      history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UpdateQuizForm
      handleSubmit={handleSubmit}
      setTitle={setTitle}
      loading={loading}
    />
  );
};

export default UpdateQuiz;
