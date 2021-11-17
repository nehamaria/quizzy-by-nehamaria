import axios from "axios";

const submitAnswers = payload =>
  axios.post("/public/attempted_answers", payload);
const getAttempt = id => axios.get(`/public/attempts/${id}`);
const attemptApi = { submitAnswers, getAttempt };
export default attemptApi;
