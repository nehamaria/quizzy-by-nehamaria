import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router";

import authApi from "apis/auth";
import quizApi from "apis/quiz";

import UserDetailsForm from "./UserDetailsForm";

import AttemptQuiz from "../AttemptQuiz";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const { slug } = useParams();
  const [showResult, setShowResult] = useState(false);
  const history = useHistory();

  const verifySlug = async () => {
    try {
      const response = await quizApi.verifyslug(slug);
      if (!response.data.verified) history.push("/login");
    } catch (error) {
      history.push("/login");
      logger.error(error);
    }
  };
  const handleSubmit = async values => {
    const payload = { user: { ...values }, slug };
    try {
      const response = await authApi.registerPublicUser(payload);
      if (response.data.user.submit) {
        setShowResult(true);
      }
      setUserDetails(response.data.user);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => verifySlug(), []);
  if (userDetails.email) {
    return (
      <AttemptQuiz
        attempt_id={userDetails.attempt_id}
        showResult={showResult}
        setShowResult={setShowResult}
      />
    );
  }

  return <UserDetailsForm handleSubmit={handleSubmit} />;
};

export default UserDetails;
