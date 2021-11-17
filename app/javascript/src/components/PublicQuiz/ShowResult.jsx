import React, { useState, useEffect } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";

import attemptApi from "apis/attempt";

const ShowResult = ({ attempt_id }) => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [number, setNumber] = useState(0);

  const fetchAttempt = async () => {
    try {
      const response = await attemptApi.getAttempt(attempt_id);
      setAnswers(response.data.attempt);
      response.data.attempt.questions.forEach(question => {
        const id = question.options.find(option => option.correct_answer).id;
        const answer_id = response.data.attempt.attempt_answer.find(
          answer => answer.question_id === question.question.id
        ).attempted_answer;
        if (String(id) === answer_id) setNumber(prev => prev + 1);
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => fetchAttempt(), []);

  if (loading) return <PageLoader />;

  return (
    <div className=" flex flex-col space-y-5 m-8">
      <Typography style="h2">{answers.quiz_name}</Typography>
      <Typography style="h4">
        Thank you for taking the quiz!Here are your results. You have submitted{" "}
        {number} correct and {answers.questions.length - number} incorrect
        answers
      </Typography>
      {answers.questions.map((question, index) => (
        <div className="w-full neeto-ui-bg-gray-100 p-4 " key={index}>
          <div key={index} className="flex flex-col space-y-5 px-6 ">
            <div className="flex space-x-10 mt-5 ml-5 mb-3 ">
              <Typography style="h4" className="flex-shrink-0 ">
                Question {index + 1}
              </Typography>
              <Typography style="h5">{question.question.title}</Typography>
            </div>
            <div className="flex flex-col w-full gap-x-10 p-5 mb-4 gap-y-4 ">
              {question.options.map((option, index) => (
                <div className="flex gap-x-4" key={index}>
                  <Radio.Item
                    stacked
                    className="flex gap-x-4 "
                    label={option.name}
                    checked={
                      String(option.id) ===
                      answers.attempt_answer.find(
                        answer => answer.question_id === option.question_id
                      )?.attempted_answer
                    }
                  />
                  {option.correct_answer && (
                    <div className="flex gap-x-2 items-center">
                      <CheckCircle color="green" size={20} />
                      <Typography style="body2" className="text-green-700">
                        Correct Answer
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowResult;

// attempts -belong to a question

//options - belong to a question
