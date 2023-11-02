import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    Authorization: JSON.parse(sessionStorage.getItem("token")),
  },
});
export default Axios;
