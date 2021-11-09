import axios from "axios";

const create = payload => axios.post("/questions/", payload);
const destroy = id => axios.delete(`/questions/${id}`);
const update = (id, payload) => axios.put(`/questions/${id}`, payload);
const show = id => axios.get(`/questions/${id}`);

const questionApi = { create, destroy, update, show };
export default questionApi;
