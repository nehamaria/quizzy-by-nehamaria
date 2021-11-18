import axios from "axios";

const exports = () => axios.get("/export");
const exports_status = id => axios.get(`/export_status?id=${id}`);
const reportApi = { exports, exports_status };
export default reportApi;
