import React, { useState, useEffect } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";

import attemptApi from "../../apis/attempt";

const ShowResult = ({ attempt_id }) => {
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState({});

  const fetchAttempt = async () => {
    try {
      const response = await attemptApi.getAttempt(attempt_id);
      setAttempt(response.data.attempt);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => fetchAttempt(), []);

  if (loading) return <PageLoader />;

  return (
    <div className=" flex flex-col space-y-5 m-8">
      <Typography style="h2">{attempt.quiz_name}</Typography>
      {attempt.questions.map((question, index) => (
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
                      attempt.attempt_answer.find(
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

// {id: 23, questions: Array(3), attempt_answer: Array(3), quiz_name: 'Solar Quiz'}
// attempt_answer: Array(3)
// 0:
// attempted_answer: "1"
// correct_answer: 1
// question_id: 1
// [[Prototype]]: Object
// 1: {question_id: 2, attempted_answer: '4', correct_answer: 3}
// 2: {question_id: 3, attempted_answer: '5', correct_answer: 5}
// length: 3
// [[Prototype]]: Array(0)
// id: 23
// questions: Array(3)
// 0:
// options: (2) [{…}, {…}]
// question: {id: 1, title: 'We will be here for a while so I don’t know 🤷‍♀️ … good friend and not even the best friend I have ', quiz_id: 1, created_at: '2021-11-13T15:29:56.890Z', updated_at: '2021-11-13T15:29:56.890Z'}
// [[Prototype]]: Object
// 1: {question: {…}, options: Array(2)}
// 2: {question: {…}, options: Array(2)}
// length: 3
// [[Prototype]]: Array(0)
// quiz_name: "Solar Quiz"
// [[Prototype]]: Object
