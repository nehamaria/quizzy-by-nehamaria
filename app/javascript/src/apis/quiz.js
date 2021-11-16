import axios from "axios";

const create = payload => axios.post("/quizzes/", payload);
const quizList = () => axios.get("/quizzes");
const destroy = id => axios.delete(`/quizzes/${id}`);
const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);
const show = id => axios.get(`/quizzes/${id}`);
const verifyslug = slug => axios.get(`/public/quizzes/${slug}`);
const fetchQuiz = slug => axios.get(`/public/quizzes/${slug}`);

const quizApi = {
  create,
  quizList,
  destroy,
  update,
  show,
  verifyslug,
  fetchQuiz,
};
export default quizApi;
