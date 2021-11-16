import axios from "axios";

const login = payload => axios.post("/sessions", payload);
const logout = () => axios.delete("/sessions");
const registerPublicUser = payload => axios.post("/public/users", payload);
const authApi = {
  login,
  logout,
  registerPublicUser,
};

export default authApi;
