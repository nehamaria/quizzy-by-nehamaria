import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Button, Typography } from "@bigbinary/neetoui/v2";
import { Container } from "@bigbinary/neetoui/v2/layouts";
import { Link } from "react-router-dom";

import EmptyState from "./EmptyState";
import QuizTable from "./QuizTable";

import quizApi from "../../apis/quiz";

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuizDetails = async () => {
    setPageLoading(true);
    try {
      const response = await quizApi.quizList();
      setQuizList(response.data);
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
    <Container>
      <div className="flex justify-end w-screen px-8 py-8">
        <Link to="/quiz/create">
          <Button
            icon={() => <Plus />}
            iconPosition="left"
            label={
              <Typography className="flex gap-x-2 p-1">Add new quiz</Typography>
            }
          />
        </Link>
      </div>
      {quizList.length ? (
        <QuizTable quizList={quizList} destroyQuiz={destroyQuiz} />
      ) : (
        <EmptyState />
      )}
    </Container>
  );
};

export default QuizList;
