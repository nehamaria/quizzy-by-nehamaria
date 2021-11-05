import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Typography, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import quizApi from "apis/quiz";

const ShowQuiz = () => {
  const [quizDetails, setQuizDetails] = useState([]);
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

  useEffect(() => {
    showQuizDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="flex justify-between pt-24 w-full ">
        <Typography style="h2" className="pl-8 ">
          {quizDetails.title}
        </Typography>

        <Button
          label={
            <Typography className=" gap-x-2 p-1 ">Add questions</Typography>
          }
          icon={() => <Plus />}
          iconPosition="left"
        />
      </div>
      <div>
        <Typography style="body1" className="text-center pt-40 ">
          There are no questions in the quiz
        </Typography>
      </div>
    </div>
  );
};
export default ShowQuiz;
