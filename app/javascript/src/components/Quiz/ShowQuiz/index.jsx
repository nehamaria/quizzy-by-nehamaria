import React, { useEffect, useState } from "react";

import { Plus, CheckCircle } from "@bigbinary/neeto-icons";
import { PageLoader, Typography, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import quizApi from "apis/quiz";
import EmptyState from "components/Common/EmptyState";

import QuestionList from "./ShowQuestionList";

const ShowQuiz = () => {
  const [quizDetails, setQuizDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const showQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setQuizDetails(response.data.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      await quizApi.update(id, { quiz: { publish: "published" } });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    showQuizDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="flex justify-between pt-24 w-full mb-1">
        <Typography style="h1" className="pl-8 ">
          {quizDetails.title}
        </Typography>
        <div className="flex justify-end space-x-4 pr-4">
          <Link
            to={{
              pathname: `/quizzes/${id}/questions/create`,
              state: { id: id, quizName: quizDetails.title },
            }}
          >
            <Button
              label={
                <Typography className=" gap-x-2 p-1 ">Add questions</Typography>
              }
              icon={() => <Plus />}
              iconPosition="left"
              className="mb-3"
            />
          </Link>
          {quizDetails.questions.length > 0 &&
            quizDetails.publish === "not_publish" && (
              <Button
                className="mb-3"
                label={<Typography className="p-1">Publish</Typography>}
                onClick={handlePublish}
              />
            )}
        </div>
      </div>
      {quizDetails.questions.length ? (
        <>
          {quizDetails.publish === "published" && (
            <div>
              <Typography className="inline-flex ml-5 gap-x-1 mb-5" style="h4">
                <CheckCircle size={18} />
                Published,your public link is - {window.location.origin}/public/
                {quizDetails.slug}
              </Typography>
            </div>
          )}

          <QuestionList
            quizId={quizDetails.id}
            questionList={quizDetails.questions}
            showQuizDetails={showQuizDetails}
          />
        </>
      ) : (
        <EmptyState item="questions" />
      )}
    </div>
  );
};
export default ShowQuiz;
