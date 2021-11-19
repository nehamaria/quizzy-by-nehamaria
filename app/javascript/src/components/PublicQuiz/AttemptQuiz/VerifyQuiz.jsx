import React, { useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useHistory, useParams } from "react-router";

import quizApi from "apis/quiz";

const VerifyQuiz = () => {
  const { slug } = useParams();
  const history = useHistory();

  const verifySlug = async () => {
    try {
      const response = await quizApi.verifyslug(slug);
      if (response.data.verified) history.push(`/public/${slug}/attempt/new`);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => verifySlug(), []);
  return <PageLoader />;
};

export default VerifyQuiz;
