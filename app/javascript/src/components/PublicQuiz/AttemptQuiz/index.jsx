import React, { useEffect, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import { useParams } from "react-router";

import attemptApi from "apis/attempt";
import quizApi from "apis/quiz";

import ShowResult from "../ShowResult";

const AttemptQuiz = ({ attempt_id, showResult, setShowResult }) => {
  const { slug } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);

  const answer = quizDetails.map(question => {
    return {
      question_id: question.question_id,
      attempted_answer: "",
    };
  });

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.fetchQuiz(slug);
      setQuizDetails(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      const payload = {
        answer: {
          attempts: values,
          attempt_id: attempt_id,
        },
      };

      await attemptApi.submitAnswers(payload);
      setShowResult(true);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => fetchQuizDetails(), []);
  if (showResult) {
    return <ShowResult attempt_id={attempt_id} />;
  }

  return (
    <Formik initialValues={answer} onSubmit={handleSubmit} enableReinitialize>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div className=" flex flex-col space-y-5 m-8">
              {quizDetails && quizDetails.length > 0 ? (
                quizDetails.map((question, index) => {
                  return (
                    <div
                      className="w-full neeto-ui-bg-gray-100 p-4 "
                      key={index}
                    >
                      <div
                        key={index}
                        className="flex flex-col space-y-5 px-6 "
                      >
                        <div className="flex space-x-10 mt-5 ml-5 mb-3 ">
                          <Typography style="h4" className="flex-shrink-0 ">
                            Question {index + 1}
                          </Typography>
                          <Typography style="h5">
                            {question.question}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-x-10 p-5 mb-4 ">
                          <Radio
                            name={`${index}.attempted_answer`}
                            className="space-y-8 p-6 bg-white"
                            stacked
                            options={question.options.map(option => {
                              return {
                                label: option.name,
                                value: option.id,
                              };
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <Button
              type="submit"
              label="Submit"
              style="primary"
              className="self-start p-3 m-10"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AttemptQuiz;
