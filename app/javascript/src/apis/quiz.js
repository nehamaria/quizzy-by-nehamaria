import axios from "axios";

const list = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes/", payload);
const quizList = () => axios.get("/quizzes");
const destroy = id => axios.delete(`/quizzes/${id}`);
const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);
const show = id => axios.get(`/quizzes/${id}`);

const quizApi = { list, create, quizList, destroy, update, show };
export default quizApi;
