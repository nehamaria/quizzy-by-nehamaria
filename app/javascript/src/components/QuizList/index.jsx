import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Button, Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

import quizApi from "apis/quiz";

import QuizTable from "./QuizTable";

import EmptyState from "../Common/EmptyState";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuizDetails = async () => {
    setPageLoading(true);
    try {
      const response = await quizApi.quizList();
      setQuizzes(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const destroyQuiz = async id => {
    try {
      await quizApi.destroy(id);
      fetchQuizDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-6xl">
        <div className="flex justify-end  py-8">
          <Link to="/quiz/create">
            <Button
              icon={() => <Plus />}
              iconPosition="left"
              label={
                <Typography className="flex gap-x-2 p-1">
                  Add new quiz
                </Typography>
              }
            />
          </Link>
        </div>
        {quizzes.length ? (
          <QuizTable quizzes={quizzes} destroyQuiz={destroyQuiz} />
        ) : (
          <EmptyState item="quizzes" />
        )}
      </div>
    </div>
  );
};

export default QuizList;
