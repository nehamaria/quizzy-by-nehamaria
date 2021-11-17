import axios from "axios";

const submitAnswers = payload =>
  axios.post("/public/attempted_answers", payload);
const getAttempt = id => axios.get(`/public/attempts/${id}`);
const getDetails = () => axios.get("/public/attempts");
const attemptApi = { submitAnswers, getAttempt, getDetails };
export default attemptApi;
