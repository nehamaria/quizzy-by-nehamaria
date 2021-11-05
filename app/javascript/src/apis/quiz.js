import axios from "axios";

const list = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes/", payload);
const quizList = () => axios.get("/quizzes");
const destroy = id => axios.delete(`/quizzes/${id}`);

const quizApi = { list, create, quizList, destroy };
export default quizApi;
