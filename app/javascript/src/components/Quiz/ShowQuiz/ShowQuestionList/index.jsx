import React, { useState } from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

import questionApi from "apis/question";
import DeleteModal from "components/DeleteModal";

import Options from "./Options";

const QuestionList = ({ quizId, questionList, showQuizDetails }) => {
  const [id, setId] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteQuestion = async () => {
    try {
      setShowDeleteModal(true);
      await questionApi.destroy(id);
      showQuizDetails();
    } catch (error) {
      logger.error(error);
    } finally {
      setShowDeleteModal(false);
    }
  };
  return (
    <div className="flex flex-col space-y-5 px-6 ">
      {questionList.map((question, index) => {
        return (
          <div className="w-full neeto-ui-bg-gray-100 p-4" key={index}>
            <div className="flex space-x-10 mt-5 ml-5 mb-3 ">
              <Typography style="h4" className="flex-shrink-0 ">
                Question {index + 1}
              </Typography>
              <Typography style="h5">{question.title}</Typography>
              <Link to={`/quiz/${quizId}/question/${question.question_id}`}>
                <Button
                  style="secondary"
                  className="neeto-ui-text-error"
                  icon={() => <Edit />}
                  iconPosition="left"
                  label={
                    <Typography className="flex gap-x-2 p-1">Edit</Typography>
                  }
                />
              </Link>
              <Button
                style="secondary"
                size="default"
                icon={() => <Delete />}
                iconPosition="left"
                label={
                  <Typography className="flex gap-x-2 p-1">Delete</Typography>
                }
                onClick={() => {
                  setId(question.question_id);
                  setShowDeleteModal(true);
                }}
              />
            </div>
            <Options
              optionList={question.option}
              correctAnswer={question.correct_answer}
            />
          </div>
        );
      })}
      {showDeleteModal && (
        <DeleteModal
          id={id}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          destroyQuiz={deleteQuestion}
          item="question"
        />
      )}
    </div>
  );
};

export default QuestionList;
