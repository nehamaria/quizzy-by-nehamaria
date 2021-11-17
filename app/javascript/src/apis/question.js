import axios from "axios";

const create = (quiz_id, payload) =>
  axios.post(`quizzes/${quiz_id}/questions/`, payload);
const destroy = (quiz_id, id) =>
  axios.delete(`quizzes/${quiz_id}/questions/${id}`);
const update = (quiz_id, question_id, payload) => {
  axios.put(`quizzes/${quiz_id}/questions/${question_id}`, payload);
};

const show = (quiz_id, id) => axios.get(`quizzes/${quiz_id}/questions/${id}`);

const questionApi = { create, destroy, update, show };
export default questionApi;
